import { Button } from "@/components/ui/button";
export default function Hero() {
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (<section id="home" className="relative bg-gradient-to-br from-primary to-blue-600 text-white py-20">
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">Success Driven Life</h2>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
           Unlock your full potential and turn ambition into achievement—where passion meets purpose every day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => scrollToSection('books')} className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Browse Books
            </Button>
            <Button onClick={() => scrollToSection('videos')} variant="outline" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors">
              Watch Videos
            </Button>
          </div>
        </div>
      </div>
    </section>);
}
