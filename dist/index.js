var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  books;
  videos;
  purchases;
  currentUserId;
  currentBookId;
  currentVideoId;
  currentPurchaseId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.books = /* @__PURE__ */ new Map();
    this.videos = /* @__PURE__ */ new Map();
    this.purchases = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentBookId = 1;
    this.currentVideoId = 1;
    this.currentPurchaseId = 1;
    this.createUser({ username: "admin", password: "admin123" });
    this.createBook({
      title: "Digital Marketing Mastery",
      author: "Sarah Johnson",
      description: "Comprehensive guide to modern digital marketing strategies, including social media, SEO, and conversion optimization techniques.",
      price: "29.99",
      coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
      pdfFile: null,
      featured: true
    });
    this.createBook({
      title: "Full-Stack Development",
      author: "Michael Chen",
      description: "Complete guide to modern web development using React, Node.js, and MongoDB. Build production-ready applications from scratch.",
      price: "39.99",
      coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
      pdfFile: null,
      featured: false
    });
    this.createBook({
      title: "UX Design Principles",
      author: "Emma Rodriguez",
      description: "Master the fundamentals of user experience design. Learn research methods, prototyping, and testing strategies for digital products.",
      price: "34.99",
      coverImage: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
      pdfFile: null,
      featured: true
    });
    this.createVideo({
      title: "Social Media Strategy 2024",
      description: "Learn the latest social media marketing strategies that actually work. Covers Instagram, TikTok, LinkedIn, and more platforms.",
      thumbnail: "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
      platform: "YouTube",
      videoUrl: "https://youtube.com/watch?v=example",
      duration: "45 min",
      featured: true
    });
    this.createVideo({
      title: "React Hooks Masterclass",
      description: "Deep dive into React Hooks including useState, useEffect, useContext, and custom hooks. Perfect for intermediate developers.",
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
      platform: "YouTube",
      videoUrl: "https://youtube.com/watch?v=example",
      duration: "2h 15min",
      featured: false
    });
    this.createVideo({
      title: "Design Thinking Workshop",
      description: "Complete workshop on design thinking methodology. Learn to solve complex problems through user-centered design approaches.",
      thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
      platform: "Vimeo",
      videoUrl: "https://vimeo.com/example",
      duration: "1h 30min",
      featured: true
    });
    this.createPurchase({
      email: "john.doe@example.com",
      transactionRef: "txn_1234567890",
      amount: "29.99",
      bookId: 1
    });
    this.createPurchase({
      email: "jane.smith@example.com",
      transactionRef: "txn_0987654321",
      amount: "39.99",
      bookId: 2
    });
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = { ...insertUser, id, role: "admin" };
    this.users.set(id, user);
    return user;
  }
  async getAllBooks() {
    return Array.from(this.books.values());
  }
  async getBook(id) {
    return this.books.get(id);
  }
  async createBook(insertBook) {
    const id = this.currentBookId++;
    const book = {
      ...insertBook,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      coverImage: insertBook.coverImage || null,
      pdfFile: insertBook.pdfFile || null,
      featured: insertBook.featured || false
    };
    this.books.set(id, book);
    return book;
  }
  async updateBook(id, updateData) {
    const book = this.books.get(id);
    if (!book) return void 0;
    const updatedBook = { ...book, ...updateData };
    this.books.set(id, updatedBook);
    return updatedBook;
  }
  async deleteBook(id) {
    return this.books.delete(id);
  }
  async getAllVideos() {
    return Array.from(this.videos.values());
  }
  async getVideo(id) {
    return this.videos.get(id);
  }
  async createVideo(insertVideo) {
    const id = this.currentVideoId++;
    const video = {
      ...insertVideo,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      thumbnail: insertVideo.thumbnail || null,
      duration: insertVideo.duration || null,
      featured: insertVideo.featured || false
    };
    this.videos.set(id, video);
    return video;
  }
  async updateVideo(id, updateData) {
    const video = this.videos.get(id);
    if (!video) return void 0;
    const updatedVideo = { ...video, ...updateData };
    this.videos.set(id, updatedVideo);
    return updatedVideo;
  }
  async deleteVideo(id) {
    return this.videos.delete(id);
  }
  async createPurchase(insertPurchase) {
    const id = this.currentPurchaseId++;
    const purchase = {
      ...insertPurchase,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      bookId: insertPurchase.bookId || null
    };
    this.purchases.set(id, purchase);
    return purchase;
  }
  async getAllPurchases() {
    return Array.from(this.purchases.values());
  }
  async getPurchasesByEmail(email) {
    return Array.from(this.purchases.values()).filter((p) => p.email === email);
  }
  async hasPurchased(email, bookId) {
    return Array.from(this.purchases.values()).some((p) => p.email === email && p.bookId === bookId);
  }
};
var storage = new MemStorage();

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  books: () => books,
  insertBookSchema: () => insertBookSchema,
  insertPurchaseSchema: () => insertPurchaseSchema,
  insertUserSchema: () => insertUserSchema,
  insertVideoSchema: () => insertVideoSchema,
  purchases: () => purchases,
  users: () => users,
  videos: () => videos
});
import { pgTable, text, serial, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("admin")
});
var books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  coverImage: text("cover_image"),
  pdfFile: text("pdf_file"),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow()
});
var videos = pgTable("videos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  thumbnail: text("thumbnail"),
  platform: text("platform").notNull(),
  videoUrl: text("video_url").notNull(),
  duration: text("duration"),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow()
});
var purchases = pgTable("purchases", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  bookId: integer("book_id").references(() => books.id),
  transactionRef: text("transaction_ref").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertBookSchema = createInsertSchema(books).omit({
  id: true,
  createdAt: true
});
var insertVideoSchema = createInsertSchema(videos).omit({
  id: true,
  createdAt: true
});
var insertPurchaseSchema = createInsertSchema(purchases).omit({
  id: true,
  createdAt: true
});

// server/routes.ts
import multer from "multer";
import jwt from "jsonwebtoken";

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
import * as dotenv from "dotenv";
dotenv.config();
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/controllers/purchaseControllers.ts
import { z } from "zod";
var purchaseSchema = z.object({
  email: z.string().email(),
  bookId: z.union([z.string(), z.number()]),
  transactionRef: z.string().min(1),
  amount: z.union([z.string(), z.number()])
});
var createPurchase = async (req, res) => {
  try {
    const result = purchaseSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: "Invalid data", details: result.error });
    }
    const { email, bookId, transactionRef, amount } = result.data;
    const inserted = await db.insert(purchases).values({
      email,
      bookId: typeof bookId === "string" ? parseInt(bookId, 10) : bookId,
      transactionRef,
      amount: typeof amount === "number" ? amount.toFixed(2) : amount
      // ✅ cast to string if needed
    }).returning();
    res.status(201).json({ success: true, purchase: inserted[0] });
  } catch (err) {
    console.error("Purchase error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// server/routes.ts
var JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
var upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 10 * 1024 * 1024
    // 10MB limit
  }
});
var authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access token required" });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};
async function registerRoutes(app2) {
  app2.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password)
        return res.status(400).json({ message: "Username and password required" });
      const user = await storage.getUserByUsername(username);
      if (!user || password !== user.password)
        return res.status(401).json({ message: "Invalid credentials" });
      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
        expiresIn: "24h"
      });
      res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  });
  app2.get("/api/books", async (_, res) => {
    try {
      const books2 = await storage.getAllBooks();
      res.json(books2);
    } catch {
      res.status(500).json({ message: "Failed to fetch books" });
    }
  });
  app2.get("/api/books/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const book = await storage.getBook(id);
      if (!book) return res.status(404).json({ message: "Book not found" });
      res.json(book);
    } catch {
      res.status(500).json({ message: "Failed to fetch book" });
    }
  });
  app2.post(
    "/api/books",
    authenticateToken,
    upload.fields([
      { name: "coverImage", maxCount: 1 },
      { name: "pdfFile", maxCount: 1 }
    ]),
    async (req, res) => {
      try {
        const validatedData = insertBookSchema.parse(req.body);
        const files = req.files;
        if (files.coverImage) validatedData.coverImage = `/uploads/${files.coverImage[0].filename}`;
        if (files.pdfFile) validatedData.pdfFile = `/uploads/${files.pdfFile[0].filename}`;
        const book = await storage.createBook(validatedData);
        res.status(201).json(book);
      } catch {
        res.status(400).json({ message: "Invalid book data" });
      }
    }
  );
  app2.put(
    "/api/books/:id",
    authenticateToken,
    upload.fields([
      { name: "coverImage", maxCount: 1 },
      { name: "pdfFile", maxCount: 1 }
    ]),
    async (req, res) => {
      try {
        const id = parseInt(req.params.id);
        const updateData = { ...req.body };
        const files = req.files;
        if (files.coverImage) updateData.coverImage = `/uploads/${files.coverImage[0].filename}`;
        if (files.pdfFile) updateData.pdfFile = `/uploads/${files.pdfFile[0].filename}`;
        const book = await storage.updateBook(id, updateData);
        if (!book) return res.status(404).json({ message: "Book not found" });
        res.json(book);
      } catch {
        res.status(400).json({ message: "Invalid book data" });
      }
    }
  );
  app2.delete("/api/books/:id", authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteBook(id);
      if (!deleted) return res.status(404).json({ message: "Book not found" });
      res.json({ message: "Book deleted successfully" });
    } catch {
      res.status(500).json({ message: "Failed to delete book" });
    }
  });
  app2.get("/api/videos", async (_, res) => {
    try {
      const videos2 = await storage.getAllVideos();
      res.json(videos2);
    } catch {
      res.status(500).json({ message: "Failed to fetch videos" });
    }
  });
  app2.post(
    "/api/videos",
    authenticateToken,
    upload.single("thumbnail"),
    async (req, res) => {
      try {
        const validatedData = insertVideoSchema.parse(req.body);
        if (req.file) validatedData.thumbnail = `/uploads/${req.file.filename}`;
        const video = await storage.createVideo(validatedData);
        res.status(201).json(video);
      } catch {
        res.status(400).json({ message: "Invalid video data" });
      }
    }
  );
  app2.put(
    "/api/videos/:id",
    authenticateToken,
    upload.single("thumbnail"),
    async (req, res) => {
      try {
        const id = parseInt(req.params.id);
        const updateData = { ...req.body };
        if (req.file) updateData.thumbnail = `/uploads/${req.file.filename}`;
        const video = await storage.updateVideo(id, updateData);
        if (!video) return res.status(404).json({ message: "Video not found" });
        res.json(video);
      } catch {
        res.status(400).json({ message: "Invalid video data" });
      }
    }
  );
  app2.delete("/api/videos/:id", authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteVideo(id);
      if (!deleted) return res.status(404).json({ message: "Video not found" });
      res.json({ message: "Video deleted successfully" });
    } catch {
      res.status(500).json({ message: "Failed to delete video" });
    }
  });
  app2.post("/api/purchases", createPurchase);
  app2.get("/api/purchases", authenticateToken, async (req, res) => {
    try {
      const purchases2 = await storage.getAllPurchases();
      res.json(purchases2);
    } catch {
      res.status(500).json({ message: "Failed to fetch purchases" });
    }
  });
  app2.get("/api/purchases/:email", async (req, res) => {
    try {
      const purchases2 = await storage.getPurchasesByEmail(req.params.email);
      res.json(purchases2);
    } catch {
      res.status(500).json({ message: "Failed to fetch purchases" });
    }
  });
  app2.get("/api/purchases/:email/:bookId/check", async (req, res) => {
    try {
      const { email, bookId } = req.params;
      const hasPurchased = await storage.hasPurchased(email, parseInt(bookId));
      res.json({ hasPurchased });
    } catch {
      res.status(500).json({ message: "Failed to check purchase" });
    }
  });
  app2.get("/api/books/:id/download", async (req, res) => {
    try {
      const bookId = parseInt(req.params.id);
      const email = req.query.email;
      if (!email) return res.status(400).json({ message: "Email required" });
      const hasPurchased = await storage.hasPurchased(email, bookId);
      if (!hasPurchased) return res.status(403).json({ message: "Purchase required to download" });
      const book = await storage.getBook(bookId);
      if (!book || !book.pdfFile) return res.status(404).json({ message: "Book file not found" });
      res.json({ downloadUrl: book.pdfFile, message: "Download authorized" });
    } catch {
      res.status(500).json({ message: "Download failed" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "url";
import { createServer as createViteServer, createLogger } from "vite";
import { nanoid } from "nanoid";
var viteLogger = createLogger();
var __dirname = path.dirname(fileURLToPath(import.meta.url));
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const viteConfigPath = path.resolve(__dirname, "../vite.config.ts");
  const viteConfigModule = await import(pathToFileURL(viteConfigPath).href);
  const viteConfig = viteConfigModule.default;
  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    // Skip loading vite.config.js again
    server: {
      middlewareMode: true,
      hmr: { server },
      allowedHosts: true
    },
    appType: "custom",
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    }
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
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
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path.resolve(__dirname, "..", "dist", "client");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `\u274C Build directory not found at ${distPath}. Did you forget to run "vite build"?`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}

// server/index.ts
import dotenv2 from "dotenv";
import { createServer as createServer2 } from "http";
dotenv2.config();
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path2 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path2.startsWith("/api")) {
      let logLine = `${req.method} ${path2} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = createServer2(app);
  await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen(port, "0.0.0.0", () => {
    log(`\u2705 Server is running at http://localhost:${port}`);
  });
})();
