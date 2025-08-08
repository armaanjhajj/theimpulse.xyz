import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function ProgressTracker({ progress, currentSection, exploredSections }) {
  const [isVisible, setIsVisible] = useState(false);
  const [showReward, setShowReward] = useState(false);

  useEffect(() => {
    // Show tracker after user starts scrolling
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Show reward animation when progress reaches milestones
    if (progress === 25 || progress === 50 || progress === 75 || progress === 100) {
      setShowReward(true);
      setTimeout(() => setShowReward(false), 2000);
    }
  }, [progress]);

  const sectionNames = {
    hero: 'discovery',
    features: 'exploration', 
    portal: 'transition',
    waitlist: 'connection',
    complete: 'completion'
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-4 right-4 z-50 bg-white border border-black text-black p-4 rounded-lg shadow-2xl"
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.8 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Progress Bar */}
          <div className="mb-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-mono uppercase tracking-wider">
                {sectionNames[currentSection]}
              </span>
              <span className="text-xs font-mono">
                {progress}%
              </span>
            </div>
            <div className="w-48 h-1 bg-gray-300 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-black"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Section Indicators */}
          <div className="flex space-x-2">
            {['hero', 'features', 'portal', 'waitlist'].map((section) => (
              <motion.div
                key={section}
                className={`w-2 h-2 rounded-full ${
                  exploredSections.has(section) 
                    ? 'bg-black' 
                    : currentSection === section 
                    ? 'bg-gray-600' 
                    : 'bg-gray-300'
                }`}
                animate={currentSection === section ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            ))}
          </div>

          {/* Reward Animation */}
          <AnimatePresence>
            {showReward && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-black text-white rounded-lg"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center">
                  <motion.div
                    className="text-2xl mb-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  >
                    ✓
                  </motion.div>
                  <div className="text-xs font-mono">
                    {progress === 100 ? 'experience complete!' : 'milestone reached!'}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Completion Message */}
          {progress === 100 && (
            <motion.div
              className="mt-2 text-xs font-mono text-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              ready for the portal
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
