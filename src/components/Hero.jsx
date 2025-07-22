import { useEffect, useRef } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';

const LOGO_URL = 'https://i.imgur.com/4lyEvlW.png';

export default function Hero() {
  const heroRef = useRef(null);
  const { scrollY } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  // Logo: scale up and fade out as you scroll
  const logoScale = useTransform(scrollY, [0, 300], [1, 1.3]);
  const logoY = useTransform(scrollY, [0, 300], [0, -40]);
  const logoOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  // Word: fade/slide out as you scroll
  const wordOpacity = useTransform(scrollY, [0, 120], [1, 0]);
  const wordY = useTransform(scrollY, [0, 120], [-60, -20]); // lower than before
  const wordScale = useTransform(scrollY, [0, 300], [1, 1.1]);

  // Black overlay for initial flash
  const controls = useAnimation();
  useEffect(() => {
    (async () => {
      await controls.start({ opacity: 1 });
      await controls.start({ opacity: 0, transition: { delay: 0.5, duration: 0.7 } });
    })();
  }, [controls]);

  return (
    <section ref={heroRef} className="relative flex flex-col items-center justify-center min-h-screen w-full bg-black text-white overflow-hidden select-none">
      {/* Black overlay for initial flash */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={controls}
        className="fixed inset-0 z-40 bg-black pointer-events-none"
      />
      {/* Word 'impulse' animates in above logo, then scrolls/fades out */}
      <motion.h1
        className="font-heading font-extrabold text-[clamp(3rem,10vw,8rem)] lowercase text-center tracking-tight z-10"
        style={{
          opacity: wordOpacity,
          y: wordY,
          scale: wordScale,
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: -60 }}
        transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
      >
        impulse
      </motion.h1>
      {/* Logo flash-in, then scroll/zoom/fade */}
      <motion.img
        src={LOGO_URL}
        alt="impulse app logo"
        className="z-20 object-contain"
        style={{
          width: 'min(70vw, 28rem)',
          height: 'min(70vw, 28rem)',
          scale: logoScale,
          translateY: logoY,
          opacity: logoOpacity,
          minWidth: 240,
          minHeight: 240,
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.7, ease: 'easeOut' }}
      />
    </section>
  );
} 