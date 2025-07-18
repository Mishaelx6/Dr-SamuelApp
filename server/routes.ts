import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookSchema, insertVideoSchema, insertPurchaseSchema } from "@shared/schema";
import multer from "multer";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Configure multer for file uploads
const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

// JWT middleware
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Authentication routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
      }

      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // For demo purposes, using simple password comparison
      // In production, use bcrypt.compare
      if (password !== user.password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });
      
      res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Book routes
  app.get("/api/books", async (req, res) => {
    try {
      const books = await storage.getAllBooks();
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch books" });
    }
  });

  app.get("/api/books/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const book = await storage.getBook(id);
      
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      
      res.json(book);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch book" });
    }
  });

  app.post("/api/books", authenticateToken, upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'pdfFile', maxCount: 1 }
  ]), async (req, res) => {
    try {
      const validatedData = insertBookSchema.parse(req.body);
      
      // Handle file uploads
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      if (files.coverImage) {
        validatedData.coverImage = `/uploads/${files.coverImage[0].filename}`;
      }
      if (files.pdfFile) {
        validatedData.pdfFile = `/uploads/${files.pdfFile[0].filename}`;
      }
      
      const book = await storage.createBook(validatedData);
      res.status(201).json(book);
    } catch (error) {
      res.status(400).json({ message: "Invalid book data" });
    }
  });

  app.put("/api/books/:id", authenticateToken, upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'pdfFile', maxCount: 1 }
  ]), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = { ...req.body };
      
      // Handle file uploads
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      if (files.coverImage) {
        updateData.coverImage = `/uploads/${files.coverImage[0].filename}`;
      }
      if (files.pdfFile) {
        updateData.pdfFile = `/uploads/${files.pdfFile[0].filename}`;
      }
      
      const book = await storage.updateBook(id, updateData);
      
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      
      res.json(book);
    } catch (error) {
      res.status(400).json({ message: "Invalid book data" });
    }
  });

  app.delete("/api/books/:id", authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteBook(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Book not found" });
      }
      
      res.json({ message: "Book deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete book" });
    }
  });

  // Video routes
  app.get("/api/videos", async (req, res) => {
    try {
      const videos = await storage.getAllVideos();
      res.json(videos);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch videos" });
    }
  });

  app.post("/api/videos", authenticateToken, upload.single('thumbnail'), async (req, res) => {
    try {
      const validatedData = insertVideoSchema.parse(req.body);
      
      // Handle thumbnail upload
      if (req.file) {
        validatedData.thumbnail = `/uploads/${req.file.filename}`;
      }
      
      const video = await storage.createVideo(validatedData);
      res.status(201).json(video);
    } catch (error) {
      res.status(400).json({ message: "Invalid video data" });
    }
  });

  app.put("/api/videos/:id", authenticateToken, upload.single('thumbnail'), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = { ...req.body };
      
      // Handle thumbnail upload
      if (req.file) {
        updateData.thumbnail = `/uploads/${req.file.filename}`;
      }
      
      const video = await storage.updateVideo(id, updateData);
      
      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }
      
      res.json(video);
    } catch (error) {
      res.status(400).json({ message: "Invalid video data" });
    }
  });

  app.delete("/api/videos/:id", authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteVideo(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Video not found" });
      }
      
      res.json({ message: "Video deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete video" });
    }
  });

  // Purchase routes
  app.post("/api/purchases", async (req, res) => {
    try {
      const validatedData = insertPurchaseSchema.parse(req.body);
      const purchase = await storage.createPurchase(validatedData);
      res.status(201).json(purchase);
    } catch (error) {
      res.status(400).json({ message: "Invalid purchase data" });
    }
  });

  app.get("/api/purchases/:email", async (req, res) => {
    try {
      const email = req.params.email;
      const purchases = await storage.getPurchasesByEmail(email);
      res.json(purchases);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch purchases" });
    }
  });

  app.get("/api/purchases/:email/:bookId/check", async (req, res) => {
    try {
      const email = req.params.email;
      const bookId = parseInt(req.params.bookId);
      const hasPurchased = await storage.hasPurchased(email, bookId);
      res.json({ hasPurchased });
    } catch (error) {
      res.status(500).json({ message: "Failed to check purchase" });
    }
  });

  // Protected download route
  app.get("/api/books/:id/download", async (req, res) => {
    try {
      const bookId = parseInt(req.params.id);
      const email = req.query.email as string;
      
      if (!email) {
        return res.status(400).json({ message: "Email required" });
      }
      
      const hasPurchased = await storage.hasPurchased(email, bookId);
      if (!hasPurchased) {
        return res.status(403).json({ message: "Purchase required to download" });
      }
      
      const book = await storage.getBook(bookId);
      if (!book || !book.pdfFile) {
        return res.status(404).json({ message: "Book file not found" });
      }
      
      // In a real implementation, serve the actual file
      res.json({ downloadUrl: book.pdfFile, message: "Download authorized" });
    } catch (error) {
      res.status(500).json({ message: "Download failed" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
