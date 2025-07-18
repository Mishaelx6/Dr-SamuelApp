import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { SiTiktok } from "react-icons/si";

export default function AuthorSection() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks = [
    { icon: Facebook, href: "#", color: "bg-blue-600 hover:bg-blue-700", platform: "Facebook" },
    { icon: Instagram, href: "#", color: "bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90", platform: "Instagram" },
    { icon: SiTiktok, href: "#", color: "bg-black hover:bg-gray-800", platform: "TikTok" },
    { icon: Linkedin, href: "#", color: "bg-blue-700 hover:bg-blue-800", platform: "LinkedIn" },
    { icon: Twitter, href: "#", color: "bg-black hover:bg-gray-800", platform: "Twitter" },
  ];

  return (
    <section id="author" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700" 
              alt="Professional author portrait" 
              className="rounded-2xl shadow-xl w-full h-auto" 
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">About the Author</h2>
            <div className="prose prose-lg text-gray-700 mb-8">
              <p className="mb-4">
                Dr. Alexandra Bennett is a renowned digital strategist and educator with over 15 years of experience in technology and business development. She has helped thousands of professionals advance their careers through practical, actionable learning content.
              </p>
              <p className="mb-4">
                Alexandra holds a PhD in Computer Science from MIT and has worked with Fortune 500 companies including Google, Microsoft, and Amazon. Her expertise spans digital marketing, software development, and user experience design.
              </p>
              <p>
                Through her books and video courses, she makes complex topics accessible to learners at all levels, combining academic rigor with real-world application.
              </p>
            </div>
            
            {/* Social Media Links */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Connect with Alexandra</h3>
              <div className="flex space-x-4">
                {socialLinks.map(({ icon: Icon, href, color, platform }) => (
                  <a 
                    key={platform}
                    href={href} 
                    className={`text-white p-3 rounded-lg transition-colors ${color}`}
                    aria-label={`Follow on ${platform}`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => scrollToSection('books')}
                className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Browse Books
              </Button>
              <Button 
                onClick={() => scrollToSection('videos')}
                variant="outline"
                className="border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
              >
                Watch Videos
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
