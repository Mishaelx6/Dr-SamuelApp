import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Trash2, X } from "lucide-react";
import { getCartItems, removeFromCart } from "@/lib/cart";
import { useToast } from "@/hooks/use-toast";
export default function Cart({ isOpen, onClose, onCheckout }) {
    const { toast } = useToast();
    const cartItems = getCartItems();
    const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
    const handleRemoveItem = (bookId) => {
        removeFromCart(bookId);
        toast({
            title: "Item removed",
            description: "Book has been removed from cart",
        });
    };
    const handleCheckout = () => {
        if (cartItems.length === 0) {
            toast({
                title: "Cart is empty",
                description: "Add some books to proceed to checkout",
                variant: "destructive",
            });
            return;
        }
        onCheckout();
    };
    return (<Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-96">
        <SheetHeader className="flex flex-row items-center justify-between pb-6 border-b">
          <SheetTitle>Shopping Cart</SheetTitle>
          <Button variant="ghost" onClick={onClose}>
            <X className="w-5 h-5"/>
          </Button>
        </SheetHeader>
        
        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto py-6">
          {cartItems.length === 0 ? (<div className="text-center py-8">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13v5a2 2 0 002 2h9.5a2 2 0 002-2v-5m-11 0h11"/>
                </svg>
              </div>
              <p className="text-gray-500">Your cart is empty</p>
            </div>) : (<div className="space-y-4">
              {cartItems.map((item) => (<div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <img src={item.coverImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=100"} alt={item.title} className="w-16 h-20 object-cover rounded"/>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.author}</p>
                    <p className="text-primary font-bold">${item.price}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleRemoveItem(item.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 className="w-4 h-4"/>
                  </Button>
                </div>))}
            </div>)}
        </div>
        
        {/* Cart Footer */}
        {cartItems.length > 0 && (<div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-gray-900">Total:</span>
              <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
            </div>
            <Button onClick={handleCheckout} className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors">
              Proceed to Checkout
            </Button>
            <p className="text-center text-gray-500 text-sm mt-2">Secure payment with Paystack</p>
          </div>)}
      </SheetContent>
    </Sheet>);
}
