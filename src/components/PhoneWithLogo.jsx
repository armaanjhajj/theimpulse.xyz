import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

export default function PhoneWithLogo() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  
  // Transform the phone position based on scroll
  const phoneY = useTransform(scrollY, [0, 300], [0, -50]);
  const phoneOpacity = useTransform(scrollY, [0, 200], [0.8, 1]);
  const phoneScale = useTransform(scrollY, [0, 300], [1, 1.02]);

  // Mobile expandable text state
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="relative w-full bg-white dark:bg-black overflow-hidden transition-colors duration-500">
      {/* Container that creates the peeking effect */}
      <div 
        ref={containerRef}
        className="relative w-full"
        style={{ 
          height: 'calc(100vh + 50px)', // Reduced extra height
          marginTop: '-100px' // Pull up to create peek effect
        }}
      >
                {/* Phone with scroll-based animations */}
        <motion.div
          className="absolute inset-0 w-full h-full flex items-center justify-center"
          style={{
            y: phoneY,
            opacity: phoneOpacity,
            scale: phoneScale,
          }}
        >
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {/* Text */}
            <motion.div 
              className="text-right"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="font-black text-6xl lg:text-7xl lowercase tracking-tight leading-none text-black dark:text-white mb-4 transition-colors duration-500">
                the app
              </h2>
              
              {/* Heading and subheading */}
              <div className="text-right">
                <h3 className="font-black text-3xl lg:text-4xl lowercase tracking-tight leading-tight text-black dark:text-white mb-2 transition-colors duration-500">
                  the impulse app connects you with people — in real life, instantly.
                </h3>
                <p className="font-black text-xl lg:text-2xl lowercase tracking-tight leading-tight text-black/60 dark:text-white/60 max-w-2xl ml-auto transition-colors duration-500">
                  we're bringing meeting people back into the real world. we'll alert you when you're around cool irl and you'll get a short window to act on that impulse and lock in a connection. every contact in your network is someone you've actually interacted with face-to-face — no meaningless follows, just genuine connections made in the moment.
                </p>
              </div>
            </motion.div>
            
            {/* iPhone image with logo already included */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.8, x: -50 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <img
                src="https://i.imgur.com/Dz10kt0.png"
                alt="iPhone"
                className="w-40 lg:w-48 xl:w-64"
              />
            </motion.div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden flex flex-col items-end text-right px-6 py-8">
            {/* iPhone image first on mobile - smaller */}
            <div className="relative mb-6">
              <img
                src="https://i.imgur.com/Dz10kt0.png"
                alt="iPhone"
                className="w-32 h-auto"
              />
            </div>
            
            {/* Text content - right justified */}
            <div className="max-w-xs">
              <h2 className="font-black text-4xl lowercase tracking-tight leading-none text-black dark:text-white mb-4 transition-colors duration-500">
                the app
              </h2>
              
              <h3 className="font-black text-xl lowercase tracking-tight leading-tight text-black dark:text-white mb-3 transition-colors duration-500">
                the impulse app connects you with people — in real life, instantly.
              </h3>
              
              {/* Expandable subheading */}
              <div className="relative">
                <motion.div
                  className={`font-black text-sm lowercase tracking-tight leading-tight text-black/60 dark:text-white/60 overflow-hidden transition-all duration-300 ${
                    isExpanded ? 'max-h-96' : 'max-h-12'
                  }`}
                >
                  we're bringing meeting people back into the real world. we'll alert you when you're around cool irl and you'll get a short window to act on that impulse and lock in a connection. every contact in your network is someone you've actually interacted with face-to-face — no meaningless follows, just genuine connections made in the moment.
                </motion.div>
                
                {/* Gradient overlay when collapsed */}
                {!isExpanded && (
                  <div className="absolute bottom-0 right-0 w-full h-8 bg-gradient-to-t from-white dark:from-black to-transparent pointer-events-none" />
                )}
                
                {/* Expand/collapse button */}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-1 mt-2 text-black/60 hover:text-black transition-colors"
                >
                  <span className="text-xs font-medium">
                    {isExpanded ? 'show less' : 'read more'}
                  </span>
                  <motion.svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </motion.svg>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
