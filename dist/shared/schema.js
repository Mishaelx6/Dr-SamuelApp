import { pgTable, text, serial, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    username: text("username").notNull().unique(),
    password: text("password").notNull(),
    role: text("role").notNull().default("admin"),
});
export const books = pgTable("books", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    author: text("author").notNull(),
    description: text("description").notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    coverImage: text("cover_image"),
    pdfFile: text("pdf_file"),
    featured: boolean("featured").default(false),
    createdAt: timestamp("created_at").defaultNow(),
});
export const videos = pgTable("videos", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    thumbnail: text("thumbnail"),
    platform: text("platform").notNull(),
    videoUrl: text("video_url").notNull(),
    duration: text("duration"),
    featured: boolean("featured").default(false),
    createdAt: timestamp("created_at").defaultNow(),
});
export const purchases = pgTable("purchases", {
    id: serial("id").primaryKey(),
    email: text("email").notNull(),
    bookId: integer("book_id").references(() => books.id),
    transactionRef: text("transaction_ref").notNull(),
    amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});
export const insertUserSchema = createInsertSchema(users).pick({
    username: true,
    password: true,
});
export const insertBookSchema = createInsertSchema(books).omit({
    id: true,
    createdAt: true,
});
export const insertVideoSchema = createInsertSchema(videos).omit({
    id: true,
    createdAt: true,
});
export const insertPurchaseSchema = createInsertSchema(purchases).omit({
    id: true,
    createdAt: true,
});
