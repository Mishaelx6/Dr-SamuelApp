import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import BookCard from "@/components/BookCard";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";
import FlipBookViewer from "@/components/FlipBookViewer";
import PaymentModal from "@/components/PaymentModal";
import { Badge } from "@/components/ui/badge";
import type { Book } from "@shared/schema";

export default function BooksPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [flipbookBook, setFlipbookBook] = useState<Book | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const { data: books = [], isLoading } = useQuery<Book[]>({
    queryKey: ["/api/books"]
  });

  const featuredBooks = books.filter(book => book.featured);
  const regularBooks = books.filter(book => !book.featured);

  const openFlipbook = (book: Book) => {
    setFlipbookBook(book);
  };

  const closeFlipbook = () => {
    setFlipbookBook(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation onCartClick={() => setIsCartOpen(true)} />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-green-600 text-white py-16">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Digital Book Library</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Explore our complete collection of premium digital books. Preview the first 3 pages for free, then purchase for full access.
            </p>
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg animate-pulse">
                  <div className="w-full h-64 bg-gray-200 rounded-t-xl"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-16 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : books.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Books Available</h3>
              <p className="text-gray-500">Check back soon for new releases!</p>
            </div>
          ) : (
            <div className="space-y-16">
              {/* Featured Books */}
              {featuredBooks.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Featured Books</h2>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      Editor's Choice
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {featuredBooks.map((book) => (
                      <BookCard 
                        key={book.id} 
                        book={book} 
                        onPreview={() => openFlipbook(book)}
                        onPayment={() => setIsPaymentModalOpen(true)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* All Books */}
              {regularBooks.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">All Books</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {regularBooks.map((book) => (
                      <BookCard 
                        key={book.id} 
                        book={book} 
                        onPreview={() => openFlipbook(book)}
                        onPayment={() => setIsPaymentModalOpen(true)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />

      {/* Modals */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onCheckout={() => {
        setIsCartOpen(false);
        setIsPaymentModalOpen(true);
      }} />
      
      {flipbookBook && (
        <FlipBookViewer 
          book={flipbookBook} 
          onClose={closeFlipbook}
          onPayment={() => {
            closeFlipbook();
            setIsPaymentModalOpen(true);
          }}
        />
      )}
      
      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)} 
      />
    </div>
  );
}