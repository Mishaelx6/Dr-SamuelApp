import { users, books, videos, purchases, type User, type InsertUser, type Book, type InsertBook, type Video, type InsertVideo, type Purchase, type InsertPurchase } from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Book operations
  getAllBooks(): Promise<Book[]>;
  getBook(id: number): Promise<Book | undefined>;
  createBook(book: InsertBook): Promise<Book>;
  updateBook(id: number, book: Partial<InsertBook>): Promise<Book | undefined>;
  deleteBook(id: number): Promise<boolean>;
  
  // Video operations
  getAllVideos(): Promise<Video[]>;
  getVideo(id: number): Promise<Video | undefined>;
  createVideo(video: InsertVideo): Promise<Video>;
  updateVideo(id: number, video: Partial<InsertVideo>): Promise<Video | undefined>;
  deleteVideo(id: number): Promise<boolean>;
  
  // Purchase operations
  createPurchase(purchase: InsertPurchase): Promise<Purchase>;
  getPurchasesByEmail(email: string): Promise<Purchase[]>;
  hasPurchased(email: string, bookId: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private books: Map<number, Book>;
  private videos: Map<number, Video>;
  private purchases: Map<number, Purchase>;
  private currentUserId: number;
  private currentBookId: number;
  private currentVideoId: number;
  private currentPurchaseId: number;

  constructor() {
    this.users = new Map();
    this.books = new Map();
    this.videos = new Map();
    this.purchases = new Map();
    this.currentUserId = 1;
    this.currentBookId = 1;
    this.currentVideoId = 1;
    this.currentPurchaseId = 1;
    
    // Add default admin user
    this.createUser({ username: "admin", password: "admin123" });
    
    // Add sample books
    this.createBook({
      title: "Digital Marketing Mastery",
      author: "Sarah Johnson",
      description: "Comprehensive guide to modern digital marketing strategies, including social media, SEO, and conversion optimization techniques.",
      price: "29.99",
      coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
      pdfFile: null
    });
    
    this.createBook({
      title: "Full-Stack Development",
      author: "Michael Chen",
      description: "Complete guide to modern web development using React, Node.js, and MongoDB. Build production-ready applications from scratch.",
      price: "39.99",
      coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
      pdfFile: null
    });
    
    this.createBook({
      title: "UX Design Principles",
      author: "Emma Rodriguez",
      description: "Master the fundamentals of user experience design. Learn research methods, prototyping, and testing strategies for digital products.",
      price: "34.99",
      coverImage: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
      pdfFile: null
    });
    
    // Add sample videos
    this.createVideo({
      title: "Social Media Strategy 2024",
      description: "Learn the latest social media marketing strategies that actually work. Covers Instagram, TikTok, LinkedIn, and more platforms.",
      thumbnail: "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
      platform: "YouTube",
      videoUrl: "https://youtube.com/watch?v=example",
      duration: "45 min"
    });
    
    this.createVideo({
      title: "React Hooks Masterclass",
      description: "Deep dive into React Hooks including useState, useEffect, useContext, and custom hooks. Perfect for intermediate developers.",
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
      platform: "YouTube",
      videoUrl: "https://youtube.com/watch?v=example",
      duration: "2h 15min"
    });
    
    this.createVideo({
      title: "Design Thinking Workshop",
      description: "Complete workshop on design thinking methodology. Learn to solve complex problems through user-centered design approaches.",
      thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
      platform: "Vimeo",
      videoUrl: "https://vimeo.com/example",
      duration: "1h 30min"
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id, role: "admin" };
    this.users.set(id, user);
    return user;
  }

  async getAllBooks(): Promise<Book[]> {
    return Array.from(this.books.values());
  }

  async getBook(id: number): Promise<Book | undefined> {
    return this.books.get(id);
  }

  async createBook(insertBook: InsertBook): Promise<Book> {
    const id = this.currentBookId++;
    const book: Book = { ...insertBook, id, createdAt: new Date() };
    this.books.set(id, book);
    return book;
  }

  async updateBook(id: number, updateData: Partial<InsertBook>): Promise<Book | undefined> {
    const book = this.books.get(id);
    if (!book) return undefined;
    
    const updatedBook = { ...book, ...updateData };
    this.books.set(id, updatedBook);
    return updatedBook;
  }

  async deleteBook(id: number): Promise<boolean> {
    return this.books.delete(id);
  }

  async getAllVideos(): Promise<Video[]> {
    return Array.from(this.videos.values());
  }

  async getVideo(id: number): Promise<Video | undefined> {
    return this.videos.get(id);
  }

  async createVideo(insertVideo: InsertVideo): Promise<Video> {
    const id = this.currentVideoId++;
    const video: Video = { ...insertVideo, id, createdAt: new Date() };
    this.videos.set(id, video);
    return video;
  }

  async updateVideo(id: number, updateData: Partial<InsertVideo>): Promise<Video | undefined> {
    const video = this.videos.get(id);
    if (!video) return undefined;
    
    const updatedVideo = { ...video, ...updateData };
    this.videos.set(id, updatedVideo);
    return updatedVideo;
  }

  async deleteVideo(id: number): Promise<boolean> {
    return this.videos.delete(id);
  }

  async createPurchase(insertPurchase: InsertPurchase): Promise<Purchase> {
    const id = this.currentPurchaseId++;
    const purchase: Purchase = { ...insertPurchase, id, createdAt: new Date() };
    this.purchases.set(id, purchase);
    return purchase;
  }

  async getPurchasesByEmail(email: string): Promise<Purchase[]> {
    return Array.from(this.purchases.values()).filter(p => p.email === email);
  }

  async hasPurchased(email: string, bookId: number): Promise<boolean> {
    return Array.from(this.purchases.values()).some(p => p.email === email && p.bookId === bookId);
  }
}

export const storage = new MemStorage();
