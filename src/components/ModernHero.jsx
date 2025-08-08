import { useEffect, useRef } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';

const LOGO_URL = 'https://i.imgur.com/lUPVT6Z.png';

export default function ModernHero({ onPortalTransition, isTransitioning }) {
  const heroRef = useRef(null);
  const { scrollY } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  // Logo: scale up and fade out as you scroll
  const logoScale = useTransform(scrollY, [0, 300], [1, 1.3]);
  const logoY = useTransform(scrollY, [0, 300], [0, -40]);
  const logoOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  // Black overlay for initial flash
  const controls = useAnimation();
  useEffect(() => {
    (async () => {
      await controls.start({ opacity: 1 });
      await controls.start({ opacity: 0, transition: { delay: 0.5, duration: 0.7 } });
    })();
  }, [controls]);

  const handleAppWaitlist = () => {
    onPortalTransition();
  };

  const handleWearableWaitlist = () => {
    onPortalTransition();
  };

  return (
    <section ref={heroRef} className="relative flex flex-col items-center justify-center min-h-screen w-full bg-white text-black overflow-hidden select-none">
      {/* Black overlay for initial flash */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={controls}
        className="fixed inset-0 z-40 bg-white pointer-events-none"
      />

      {/* Main hero content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Logo */}
        <motion.img
          src={LOGO_URL}
          alt="impulse logo"
          className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-8 invert"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
        />

        {/* Main headline */}
        <motion.h1
          className="font-black text-[clamp(4rem,12vw,10rem)] lowercase text-center tracking-tight leading-none mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.2, ease: 'easeOut' }}
        >
          act on impulse.
        </motion.h1>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8, ease: 'easeOut' }}
        >
          <button
            onClick={handleAppWaitlist}
            className="bg-black text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-gray-800 transition-colors duration-200 lowercase"
          >
            join app waitlist
          </button>
          <button
            onClick={handleWearableWaitlist}
            className="border-2 border-black text-black px-8 py-4 rounded-full font-medium text-lg hover:bg-black hover:text-white transition-all duration-200 lowercase"
          >
            join wearable waitlist
          </button>
        </motion.div>
      </div>

      {/* Portal transition overlay */}
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
        >
          <div className="text-white text-center">
            <motion.div 
              className="text-6xl mb-4"
              animate={{ 
                scale: [1, 1.1, 1],
                filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(0deg)"]
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              ⚡
            </motion.div>
            <motion.div 
              className="text-xl lowercase"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              entering portal...
            </motion.div>
          </div>
        </motion.div>
      )}
    </section>
  );
} 