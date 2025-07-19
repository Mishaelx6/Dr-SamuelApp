import { Request, Response } from "express";
import { db } from "../db";
import { purchases } from "@shared/schema"; // Adjust path if needed
import { z } from "zod";

const purchaseSchema = z.object({
  email: z.string().email(),
  bookId: z.union([z.string(), z.number()]),
  transactionRef: z.string().min(1),
  amount: z.union([z.string(), z.number()]),
});

export const createPurchase = async (req: Request, res: Response) => {
  try {
    const result = purchaseSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: "Invalid data", details: result.error });
    }

    const { email, bookId, transactionRef, amount } = result.data;

   const inserted = await db
  .insert(purchases)
  .values({
    email,
    bookId: typeof bookId === "string" ? parseInt(bookId, 10) : bookId,
    transactionRef,
    amount: typeof amount === "number" ? amount.toFixed(2) : amount, // ✅ cast to string if needed
  })
  .returning();

    res.status(201).json({ success: true, purchase: inserted[0] });
  } catch (err: any) {
    console.error("Purchase error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
