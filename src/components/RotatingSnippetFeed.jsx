import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const SNIPPETS = [
  'launching fall 2025',
  'over 500 beta testers and counting',
  'coming soon to your university',
  'taking over rutgers this fall',
  'flipping the script on college connection',
  'changing how people meet — for real',
  'making conversation mean something again',
  'real voices. real-time. real connection.',
  'say less. call more.'
];

export default function RotatingSnippetFeed() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % SNIPPETS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full flex items-center justify-center min-h-[40vh] py-16 md:py-24 bg-black">
      <div className="w-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="w-full flex items-center justify-center"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -32 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          >
            <span
              className="block text-center text-2xl md:text-4xl font-sans font-bold text-white tracking-tight select-none px-2 md:px-0 lowercase"
              style={{
                textShadow: '0 0 8px #fff2, 0 0 2px #fff4',
                animation: 'flicker 2.5s infinite linear',
              }}
            >
              {SNIPPETS[index]}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
      <style>{`
        @keyframes flicker {
          0%, 100% { opacity: 1; filter: brightness(1); }
          48% { opacity: 0.98; filter: brightness(1.05); }
          50% { opacity: 0.92; filter: brightness(1.1); }
          52% { opacity: 0.98; filter: brightness(1.05); }
          60% { opacity: 1; filter: brightness(1); }
        }
      `}</style>
    </section>
  );
} 