import { useEffect, useRef } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';

const LOGO_URL = 'https://i.imgur.com/lUPVT6Z.png';

export default function Hero() {
  const heroRef = useRef(null);
  
  const { scrollY } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  // Parallax effects
  const logoScale = useTransform(scrollY, [0, 300], [1, 1.3]);
  const logoY = useTransform(scrollY, [0, 300], [0, -40]);
  const logoOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const textY = useTransform(scrollY, [0, 200], [0, -100]);
  const textOpacity = useTransform(scrollY, [0, 150], [1, 0]);

  // Initial animation controls
  const controls = useAnimation();
  
  useEffect(() => {
    // Dramatic entrance sequence
    (async () => {
      await controls.start({ opacity: 1 });
      await controls.start({ opacity: 0, transition: { delay: 0.5, duration: 0.7 } });
    })();
  }, [controls]);

  return (
    <section ref={heroRef} className="relative flex flex-col items-center justify-center h-[calc(100vh-80px)] w-full bg-white text-black overflow-hidden select-none">
      {/* Initial flash overlay */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={controls}
        className="fixed inset-0 z-40 bg-white pointer-events-none"
      />

      {/* Background gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />

      {/* Floating particles for atmosphere */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gray-300 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        {/* Logo with dramatic entrance */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
        >
          <motion.img
            src={LOGO_URL}
            alt="impulse logo"
            className="w-32 h-32 md:w-40 md:h-40 mx-auto invert"
            style={{
              scale: logoScale,
              y: logoY,
              opacity: logoOpacity,
            }}
          />
        </motion.div>

        {/* Main headline with dramatic typography */}
        <motion.h1
          className="font-black text-[clamp(4rem,15vw,12rem)] lowercase text-center tracking-tight leading-none mb-8"
          style={{
            y: textY,
            opacity: textOpacity,
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
        >
          impulse
        </motion.h1>

        {/* Subtitle with subtle animation */}
        <motion.p
          className="text-2xl md:text-4xl font-black lowercase text-center tracking-tight leading-none mb-12 max-w-2xl mx-auto text-gray-600"
          style={{
            y: textY,
            opacity: textOpacity,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
        >
          lets get uncomfortable
        </motion.p>


      </div>


    </section>
  );
} 