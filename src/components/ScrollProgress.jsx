import { motion, useScroll, useTransform } from 'framer-motion';
import { useDarkModeStore } from '../stores/darkModeStore';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const { isDarkMode } = useDarkModeStore();
  
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
      style={{ scaleX, opacity }}
    >
      <div className={`h-full ${isDarkMode ? 'bg-white' : 'bg-black'} transition-colors duration-500`} />
    </motion.div>
  );
} 