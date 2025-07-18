import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CreditCard, Lock } from "lucide-react";
import { getCartItems, clearCart } from "@/lib/cart";
import { initiatePaystackPayment } from "@/lib/paystack";
import { useToast } from "@/hooks/use-toast";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  
  const cartItems = getCartItems();
  const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);

  const handlePayment = async () => {
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add items to cart before proceeding",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      await initiatePaystackPayment({
        email,
        amount: total * 100, // Paystack expects amount in kobo/cents
        items: cartItems,
        onSuccess: (reference) => {
          toast({
            title: "Payment successful!",
            description: "Thank you for your purchase. You can now download your books.",
          });
          clearCart();
          onClose();
        },
        onCancel: () => {
          toast({
            title: "Payment cancelled",
            description: "Your items are still in the cart",
          });
        }
      });
    } catch (error) {
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full">
        <div className="p-6">
          <div className="text-center mb-6">
            <CreditCard className="text-primary text-4xl mb-4 mx-auto" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Complete Payment</h3>
            <p className="text-gray-600">Secure payment powered by Paystack</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Items:</span>
              <span className="font-semibold">{cartItems.length} book{cartItems.length !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Subtotal:</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total:</span>
                <span className="text-xl font-bold text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>
            
            <Button 
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
            >
              <Lock className="w-4 h-4" />
              <span>
                {isProcessing ? "Processing..." : "Pay Securely with Paystack"}
              </span>
            </Button>
            
            <Button 
              variant="outline"
              onClick={onClose}
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
