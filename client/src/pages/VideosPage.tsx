import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import VideoCard from "@/components/VideoCard";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";
import PaymentModal from "@/components/PaymentModal";
import { Badge } from "@/components/ui/badge";
import type { Video } from "@shared/schema";

export default function VideosPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const { data: videos = [], isLoading } = useQuery<Video[]>({
    queryKey: ["/api/videos"]
  });

  const featuredVideos = videos.filter(video => video.featured);
  const regularVideos = videos.filter(video => !video.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation onCartClick={() => setIsCartOpen(true)} />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-green-600 text-white py-16">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Video Library</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Watch educational videos and tutorials. All videos open in external platforms for the best viewing experience.
            </p>
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg animate-pulse">
                  <div className="w-full h-48 bg-gray-200 rounded-t-xl"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-16 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : videos.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Videos Available</h3>
              <p className="text-gray-500">Check back soon for new video content!</p>
            </div>
          ) : (
            <div className="space-y-16">
              {/* Featured Videos */}
              {featuredVideos.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Featured Videos</h2>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      Editor's Choice
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {featuredVideos.map((video) => (
                      <VideoCard key={video.id} video={video} />
                    ))}
                  </div>
                </div>
              )}

              {/* All Videos */}
              {regularVideos.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">All Videos</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {regularVideos.map((video) => (
                      <VideoCard key={video.id} video={video} />
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
      
      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)} 
      />
    </div>
  );
}