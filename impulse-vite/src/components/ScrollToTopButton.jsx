import { useEffect, useState } from 'react';
import { ArrowUpIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollToTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-dark-800 text-neon-blue shadow-neon hover:bg-neon-pink hover:text-white transition-colors duration-300"
          onClick={handleClick}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          aria-label="Scroll to top"
        >
          <ArrowUpIcon className="h-6 w-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
