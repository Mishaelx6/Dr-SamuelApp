import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import BookCard from "@/components/BookCard";
import VideoCard from "@/components/VideoCard";
import AuthorSection from "@/components/AuthorSection";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";
import FlipBookViewer from "@/components/FlipBookViewer";
import PaymentModal from "@/components/PaymentModal";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { Book, Video } from "@shared/schema";

export default function HomePage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [flipbookBook, setFlipbookBook] = useState<Book | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const { data: books = [], isLoading: booksLoading } = useQuery<Book[]>({
    queryKey: ["/api/books"]
  });

  const { data: videos = [], isLoading: videosLoading } = useQuery<Video[]>({
    queryKey: ["/api/videos"]
  });

  const openFlipbook = (book: Book) => {
    setFlipbookBook(book);
  };

  const closeFlipbook = () => {
    setFlipbookBook(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation onCartClick={() => setIsCartOpen(true)} />
      
      <Hero />
      
      {/* Author Section - immediately after hero */}
      <AuthorSection />
      
      {/* Books Section */}
      <section id="books" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Books</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium digital books. Preview the first 3 pages for free, then purchase for full access.
            </p>
          </div>
          
          {booksLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {books.filter(book => book.featured).map((book) => (
                <BookCard 
                  key={book.id} 
                  book={book} 
                  onPreview={() => openFlipbook(book)}
                  onPayment={() => setIsPaymentModalOpen(true)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Videos Section */}
      <section id="videos" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Videos</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Watch our curated selection of educational videos and tutorials. All videos open in external platforms for the best viewing experience.
            </p>
          </div>
          
          {videosLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg animate-pulse">
                  <div className="w-full h-48 bg-gray-200 rounded-t-xl"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-16 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.filter(video => video.featured).map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
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
