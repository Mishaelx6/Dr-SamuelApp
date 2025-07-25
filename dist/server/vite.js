import express from "express";
import fs from "fs";
import path from "node:path";
import { createServer as createViteServer, createLogger } from "vite";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";
const viteLogger = createLogger();
export function log(message, source = "express") {
    const formattedTime = new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });
    console.log(`${formattedTime} [${source}] ${message}`);
}
export async function setupVite(app, server) {
    const serverOptions = {
        middlewareMode: true,
        hmr: { server },
        allowedHosts: true,
    };
    const vite = await createViteServer({
        ...viteConfig,
        configFile: false,
        customLogger: {
            ...viteLogger,
            error: (msg, options) => {
                viteLogger.error(msg, options);
                process.exit(1);
            },
        },
        server: serverOptions,
        appType: "custom",
    });
    app.use(vite.middlewares);
    app.use("*", async (req, res, next) => {
        const url = req.originalUrl;
        try {
            const clientTemplate = path.resolve(import.meta.dirname, "..", "client", "index.html");
            let template = await fs.promises.readFile(clientTemplate, "utf-8");
            template = template.replace(`src="/src/main.tsx"`, `src="/src/main.tsx?v=${nanoid()}"`);
            const page = await vite.transformIndexHtml(url, template);
            res.status(200).set({ "Content-Type": "text/html" }).end(page);
        }
        catch (e) {
            vite.ssrFixStacktrace(e);
            next(e);
        }
    });
}
export function serveStatic(app) {
    // ✅ FIXED: Serve the production build from client/dist
    const distPath = path.resolve(import.meta.dirname, "..", "dist", "client");
    if (!fs.existsSync(distPath)) {
        throw new Error(`Could not find the build directory: ${distPath}. Make sure to run "vite build" first.`);
    }
    app.use(express.static(distPath));
    // Fall back to index.html for SPA routing
    app.use("*", (_req, res) => {
        res.sendFile(path.resolve(distPath, "index.html"));
    });
}
