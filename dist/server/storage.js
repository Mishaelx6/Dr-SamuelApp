export class MemStorage {
    users;
    books;
    videos;
    purchases;
    currentUserId;
    currentBookId;
    currentVideoId;
    currentPurchaseId;
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
        // Add sample videos
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
        // Add sample purchases for demo
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
        return Array.from(this.users.values()).find((user) => user.username === username);
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
            createdAt: new Date(),
            coverImage: insertBook.coverImage || null,
            pdfFile: insertBook.pdfFile || null,
            featured: insertBook.featured || false
        };
        this.books.set(id, book);
        return book;
    }
    async updateBook(id, updateData) {
        const book = this.books.get(id);
        if (!book)
            return undefined;
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
            createdAt: new Date(),
            thumbnail: insertVideo.thumbnail || null,
            duration: insertVideo.duration || null,
            featured: insertVideo.featured || false
        };
        this.videos.set(id, video);
        return video;
    }
    async updateVideo(id, updateData) {
        const video = this.videos.get(id);
        if (!video)
            return undefined;
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
            createdAt: new Date(),
            bookId: insertPurchase.bookId || null
        };
        this.purchases.set(id, purchase);
        return purchase;
    }
    async getAllPurchases() {
        return Array.from(this.purchases.values());
    }
    async getPurchasesByEmail(email) {
        return Array.from(this.purchases.values()).filter(p => p.email === email);
    }
    async hasPurchased(email, bookId) {
        return Array.from(this.purchases.values()).some(p => p.email === email && p.bookId === bookId);
    }
}
export const storage = new MemStorage();
