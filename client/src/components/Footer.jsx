import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Linkedin, Instagram, Send } from "lucide-react";
export default function Footer() {
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        // Newsletter signup functionality would go here
    };
    return (<footer className="bg-secondary text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
             <img src="/logo.png" alt="Site Logo" className="h-12 md:h-16  w-auto"/>

            <p className="text-gray-300 mb-4">
              Empowering learners with premium digital content and educational resources.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="w-5 h-5"/>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="w-5 h-5"/>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5"/>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="w-5 h-5"/>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollToSection('books')} className="text-gray-300 hover:text-white transition-colors">
                  Books
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('videos')} className="text-gray-300 hover:text-white transition-colors">
                  Videos
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('author')} className="text-gray-300 hover:text-white transition-colors">
                  About Author
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-300 mb-4">
              Stay updated with new releases and educational content.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex">
              <Input type="email" placeholder="Your email" className="flex-1 bg-gray-700 text-white border-gray-600 focus:border-primary"/>
              <Button type="submit" className="ml-2 bg-primary hover:bg-blue-600">
                <Send className="w-4 h-4"/>
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            &copy; 2024 Digital Library. All rights reserved. Built with React, Node.js, and MongoDB.
          </p>
        </div>
      </div>
    </footer>);
}
