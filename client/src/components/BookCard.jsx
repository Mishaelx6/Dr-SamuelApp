import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, ShoppingCart } from "lucide-react";
import { addToCart } from "@/lib/cart";
import { useToast } from "@/hooks/use-toast";
export default function BookCard({ book, onPreview, onPayment }) {
    const { toast } = useToast();
    const handleAddToCart = () => {
        addToCart(book);
        toast({
            title: "Added to cart",
            description: `${book.title} has been added to your cart.`,
        });
    };
    return (<Card className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <img src={book.coverImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500"} alt={`${book.title} cover`} className="w-full h-64 object-cover"/>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{book.title}</h3>
        <p className="text-gray-600 mb-2">by {book.author}</p>
        <p className="text-gray-700 mb-4 line-clamp-3">{book.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">N{book.price}</span>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onPreview} className="flex items-center space-x-2">
              <Eye className="w-4 h-4"/>
              <span>Preview</span>
            </Button>
            <Button onClick={handleAddToCart} className="flex items-center space-x-2">
              <ShoppingCart className="w-4 h-4"/>
              <span>Add to Cart</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>);
}
