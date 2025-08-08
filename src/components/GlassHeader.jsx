import { motion, useScroll, useTransform } from 'framer-motion';
import { useDarkModeStore } from '../stores/darkModeStore';

export default function GlassHeader() {
  const { scrollY } = useScroll();
  const { isDarkMode, toggleDarkMode } = useDarkModeStore();
  
  const headerOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const headerY = useTransform(scrollY, [0, 100], [-100, 0]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      style={{ opacity: headerOpacity, y: headerY }}
    >
      <div className="backdrop-blur-md bg-white/70 dark:bg-black/70 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              className="text-2xl font-black cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-black dark:text-white">impulse</span>
            </motion.div>

            {/* Navigation */}
            <div className="flex items-center space-x-8">
              <motion.button
                onClick={() => scrollToSection('app-section')}
                className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                app
              </motion.button>
              
              <motion.button
                onClick={() => scrollToSection('wearable-section')}
                className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                wearable
              </motion.button>

              {/* Dark Mode Toggle */}
              <motion.button
                onClick={toggleDarkMode}
                className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
