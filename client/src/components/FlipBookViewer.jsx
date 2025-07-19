import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ChevronLeft, ChevronRight, X, Info } from "lucide-react";
export default function FlipBookViewer({ book, onClose, onPayment, }) {
    const [currentPage, setCurrentPage] = useState(1);
    const previewPages = 3;
    const nextPage = () => {
        if (currentPage < previewPages) {
            setCurrentPage(currentPage + 1);
        }
        else {
            onPayment(); // trigger payment on page 4 attempt
        }
    };
    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    return (<Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Dialog Header with Title & Description for accessibility */}
        <DialogHeader className="flex flex-col items-start gap-1 p-6 border-b">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {book.title} - Preview
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            You’re viewing a preview. Full access is available after purchase.
          </DialogDescription>
        </DialogHeader>

        {/* Close Button */}
        <div className="absolute top-4 right-4">
          <Button variant="ghost" onClick={onClose}>
            <X className="w-6 h-6"/>
          </Button>
        </div>

        {/* Preview Warning Banner */}
        <Alert className="mx-6 border-yellow-500 bg-yellow-100">
          <Info className="h-4 w-4 text-yellow-600"/>
          <AlertDescription className="text-gray-900">
            <span className="font-semibold">Preview Mode - Limited Access</span>
            <br />
            You can view the first 3 pages. Purchase the book for full access.
          </AlertDescription>
        </Alert>

        {/* Flipbook Viewer */}
        <div className="p-6">
          <div className="bg-gray-100 rounded-lg p-8 text-center min-h-[500px] flex items-center justify-center">
            <div className="text-gray-500">
              <div className="mb-4">
                <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
              </div>
              <p className="text-xl font-semibold mb-2">Flipbook Viewer</p>
              <p className="mb-6">
                Page <span className="font-bold">{currentPage}</span> of{" "}
                <span className="font-bold">{previewPages}</span> (Preview)
              </p>
              <div className="flex justify-center space-x-4">
                <Button variant="outline" onClick={previousPage} disabled={currentPage === 1} className="flex items-center space-x-2">
                  <ChevronLeft className="w-4 h-4"/>
                  <span>Previous</span>
                </Button>
                <Button onClick={nextPage} className="flex items-center space-x-2">
                  <span>
                    {currentPage < previewPages ? "Next" : "Unlock Full Book"}
                  </span>
                  <ChevronRight className="w-4 h-4"/>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Purchase CTA */}
        <div className="border-t p-6 bg-gray-50">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">Want to read more?</p>
              <p className="text-gray-600">
                Purchase this book for full access and download.
              </p>
            </div>
            <div className="flex space-x-3 mt-4 sm:mt-0">
              <Button variant="outline" onClick={onClose}>
                Close Preview
              </Button>
              <Button onClick={onPayment} className="bg-accent text-white hover:bg-green-600 transition-colors">
                Buy Now - ${book.price}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>);
}
