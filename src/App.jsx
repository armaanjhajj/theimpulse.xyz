import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDarkModeStore } from './stores/darkModeStore';
import GlassHeader from './components/GlassHeader';
import Hero from './components/Hero';
import PeekingVideo from './components/PeekingVideo';
import Features from './components/Features';
import PhoneWithLogo from './components/PhoneWithLogo';
import AppFeatures from './components/AppFeatures';
import BandSection from './components/BandSection';
import LaunchBar from './components/LaunchBar';
import PortalPreview from './components/PortalPreview';
import Waitlist from './components/Waitlist';
import Footer from './components/Footer';
import RetroPortal from './components/RetroPortal';
import ScrollProgress from './components/ScrollProgress';

function App() {
  const [showRetroPortal, setShowRetroPortal] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [exploredSections, setExploredSections] = useState(new Set());

  // Ensure page starts at top on refresh
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSectionExplored = (sectionName) => {
    setExploredSections(prev => new Set([...prev, sectionName]));
  };

  const handlePortalTransition = () => {
    setIsTransitioning(true);
    handleSectionExplored('portal');
    setTimeout(() => {
      setShowRetroPortal(true);
      setIsTransitioning(false);
    }, 2000);
  };

  const handleBackToModern = () => {
    setShowRetroPortal(false);
    setIsTransitioning(false);
  };

  if (showRetroPortal) {
    return <RetroPortal onBackToModern={handleBackToModern} />;
  }

  const { isDarkMode } = useDarkModeStore();

  return (
    <div className={`min-h-screen font-sans relative overflow-x-hidden transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-black text-white' 
        : 'bg-white text-black'
    }`}>
      {/* Glass Header */}
      <GlassHeader />
      
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Hero Section */}
      <motion.div
        onViewportEnter={() => handleSectionExplored('hero')}
        viewport={{ once: true }}
      >
        <Hero />
      </motion.div>

      {/* Peeking Video Section */}
      <motion.div
        onViewportEnter={() => handleSectionExplored('video')}
        viewport={{ once: true }}
      >
        <PeekingVideo />
      </motion.div>

      {/* Features Section */}
      <motion.div
        onViewportEnter={() => handleSectionExplored('features')}
        viewport={{ once: true }}
      >
        <Features />
      </motion.div>

      {/* Phone with Logo Section */}
      <motion.div
        id="app-section"
        onViewportEnter={() => handleSectionExplored('phone-logo')}
        viewport={{ once: true }}
      >
        <PhoneWithLogo />
      </motion.div>

      {/* App Features Section */}
      <motion.div
        onViewportEnter={() => handleSectionExplored('app-features')}
        viewport={{ once: true }}
      >
        <AppFeatures />
      </motion.div>

      {/* Band Section */}
      <motion.div
        id="wearable-section"
        onViewportEnter={() => handleSectionExplored('band')}
        viewport={{ once: true }}
      >
        <BandSection />
      </motion.div>

      {/* Launch Bar Section */}
      <motion.div
        onViewportEnter={() => handleSectionExplored('launch')}
        viewport={{ once: true }}
      >
        <LaunchBar />
      </motion.div>

      {/* Portal Section */}
      <motion.div
        onViewportEnter={() => handleSectionExplored('portal')}
        viewport={{ once: true }}
      >
        <PortalPreview onActivate={handlePortalTransition} />
      </motion.div>

      {/* Waitlist Section */}
      <motion.div
        onViewportEnter={() => handleSectionExplored('waitlist')}
        viewport={{ once: true }}
      >
        <Waitlist />
      </motion.div>

      {/* Footer Section */}
      <motion.div
        onViewportEnter={() => handleSectionExplored('footer')}
        viewport={{ once: true }}
      >
        <Footer />
      </motion.div>

      {/* Portal Transition */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 z-[100] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Expanding portal effect */}
            <motion.div
              className="absolute inset-0 bg-black"
              initial={{ scale: 0, borderRadius: "50%" }}
              animate={{ 
                scale: [0, 1.2, 2],
                borderRadius: ["50%", "50%", "0%"]
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            
            {/* CRT scan lines */}
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 2px,
                  rgba(255,255,255,0.1) 2px,
                  rgba(255,255,255,0.1) 4px
                )`
              }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
            
            {/* Static noise effect */}
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E")`,
                backgroundSize: '100px 100px'
              }}
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ duration: 1.5, delay: 0.8 }}
            />
            
            {/* Glitch effect */}
            <motion.div
              className="absolute inset-0 bg-white"
              animate={{ 
                opacity: [0, 0.1, 0, 0.05, 0],
                x: [0, -2, 0, 2, 0]
              }}
              transition={{ duration: 0.1, repeat: Infinity }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
