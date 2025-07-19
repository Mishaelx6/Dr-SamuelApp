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
              src="./pick2.jpg" 
              alt="Professional author portrait" 
              className="rounded-2xl shadow-xl w-full h-auto" 
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Dr. Samuel Olusegun Owokoniran
</h2>
            <div className="prose prose-lg text-gray-700 mb-8">
              <p className="mb-4">
                Dr. Samuel Olusegun Owokoniran is a highly accomplished Strategic and Financial Consultant
with over 25 years of progressive experience in business strategy, financial modelling, public
sector advisory, and organizational transformation. He brings deep expertise in consulting for
legislative bodies, government institutions, and corporate organizations, with a proven record of
delivering impactful solutions aligned with global best practices
              </p>
              <p className="mb-4">
                Dr. Owokoniran began his career in the Nigerian banking sector, where he played key roles in
client relationship management, revenue generation, and strategic operations. His deep
understanding of financial products and modelling platforms has enabled him to design and
implement innovative, data-driven strategies that consistently meet and exceed institutional goals.
              </p>
              <p>
                In addition to his corporate engagements, he is an Associate Professor of Leadership and
Entrepreneurship at the London School of Entrepreneur and African Studies, UK, where he
integrates academic excellence with real-world business insight. His areas of specialization include
Finance, international relations, business process automation, strategy execution, and leadership
development.
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
