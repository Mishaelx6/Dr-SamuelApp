import express, { type Express } from "express";
import fs from "fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "url";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import { nanoid } from "nanoid";

const viteLogger = createLogger();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const viteConfigPath = path.resolve(__dirname, "../vite.config.ts");
  const viteConfigModule = await import(pathToFileURL(viteConfigPath).href);
  const viteConfig = viteConfigModule.default;

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false, // Skip loading vite.config.js again
    server: {
      middlewareMode: true,
      hmr: { server },
      allowedHosts: true,
    },
    appType: "custom",
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1); // fail fast
      },
    },
  });

  app.use(vite.middlewares);

  // Serve Vite index.html for any non-API route
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplatePath = path.resolve(__dirname, "..", "client", "index.html");

      let template = await fs.promises.readFile(clientTemplatePath, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );

      const html = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "..", "dist", "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `❌ Build directory not found at ${distPath}. Did you forget to run "vite build"?`
    );
  }

  app.use(express.static(distPath));

  // Catch-all for client-side routing (SPA)
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}

