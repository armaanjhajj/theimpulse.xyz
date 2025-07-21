import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import GallerySection from './components/GallerySection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import ThemeSwitcher from './components/ThemeSwitcher';

function App() {
  return (
    <div className="bg-dark-900 min-h-screen font-sans">
      <ThemeSwitcher />
      <HeroSection />
      <FeaturesSection />
      <GallerySection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

export default App;
