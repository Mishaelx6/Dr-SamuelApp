import type { Book } from "@shared/schema";

const CART_KEY = 'digitalLibraryCart';

export interface CartItem extends Book {}

export function getCartItems(): CartItem[] {
  try {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Error reading cart from localStorage:', error);
    return [];
  }
}

export function addToCart(book: Book): void {
  try {
    const currentCart = getCartItems();
    
    // Check if book is already in cart
    const existingIndex = currentCart.findIndex(item => item.id === book.id);
    
    if (existingIndex === -1) {
      // Add new book to cart
      const newCart = [...currentCart, book];
      localStorage.setItem(CART_KEY, JSON.stringify(newCart));
    }
    // If book already exists, don't add duplicate
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
}

export function removeFromCart(bookId: number): void {
  try {
    const currentCart = getCartItems();
    const updatedCart = currentCart.filter(item => item.id !== bookId);
    localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
  } catch (error) {
    console.error('Error removing from cart:', error);
  }
}

export function clearCart(): void {
  try {
    localStorage.removeItem(CART_KEY);
  } catch (error) {
    console.error('Error clearing cart:', error);
  }
}

export function getCartTotal(): number {
  const items = getCartItems();
  return items.reduce((total, item) => total + parseFloat(item.price), 0);
}

export function isInCart(bookId: number): boolean {
  const items = getCartItems();
  return items.some(item => item.id === bookId);
}
