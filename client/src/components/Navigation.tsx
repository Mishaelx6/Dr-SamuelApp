import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X } from "lucide-react";
import { getCartItems } from "@/lib/cart";

interface NavigationProps {
  onCartClick: () => void;
}

export default function Navigation({ onCartClick }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const cartItems = getCartItems();
  const cartItemCount = cartItems.length;

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 h-21">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/">
            <img src="/logo.png" alt="Site Logo" className="h-16 md:h-16  w-auto" />

              
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link href="/">
                <button className={`transition-colors ${location === '/' ? 'text-primary font-semibold' : 'text-gray-700 hover:text-primary'}`}>
                  Home
                </button>
              </Link>
              <Link href="/books">
                <button className={`transition-colors ${location === '/books' ? 'text-primary font-semibold' : 'text-gray-700 hover:text-primary'}`}>
                  Books
                </button>
              </Link>
              <Link href="/videos">
                <button className={`transition-colors ${location === '/videos' ? 'text-primary font-semibold' : 'text-gray-700 hover:text-primary'}`}>
                  Videos
                </button>
              </Link>
              <button 
                onClick={() => scrollToSection('author')}
                className="text-gray-700 hover:text-primary transition-colors"
              >
               
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={onCartClick}
              className="relative p-2 text-gray-700 hover:text-primary transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            <Link href="/admin">
              <Button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Admin
              </Button>
            </Link>
            <button 
              className="md:hidden p-2 text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-2">
              <Link href="/">
                <button 
                  className={`text-left px-4 py-2 transition-colors w-full ${location === '/' ? 'text-primary font-semibold' : 'text-gray-700 hover:text-primary'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </button>
              </Link>
              <Link href="/books">
                <button 
                  className={`text-left px-4 py-2 transition-colors w-full ${location === '/books' ? 'text-primary font-semibold' : 'text-gray-700 hover:text-primary'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Books
                </button>
              </Link>
              <Link href="/videos">
                <button 
                  className={`text-left px-4 py-2 transition-colors w-full ${location === '/videos' ? 'text-primary font-semibold' : 'text-gray-700 hover:text-primary'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Videos
                </button>
              </Link>
              <button 
                onClick={() => scrollToSection('author')}
                className="text-left px-4 py-2 text-gray-700 hover:text-primary transition-colors"
              >
               
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
