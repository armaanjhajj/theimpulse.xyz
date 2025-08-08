import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function BandSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(1); // Start with blue
  
  const bandImages = [
    "https://i.imgur.com/Xn0eddc.png", // Red band
    "https://i.imgur.com/v8Ig8UK.png", // Blue band
    "https://i.imgur.com/7zChAVr.png"  // Yellow band
  ];

  return (
    <section className="relative w-full bg-white dark:bg-black py-16 md:py-24 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-6">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center gap-12 lg:gap-16">
          {/* Text content - left justified */}
          <motion.div 
            className="flex-1 text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="font-black text-6xl lg:text-7xl lowercase tracking-tight leading-none text-black dark:text-white mb-6 transition-colors duration-500">
              the band
            </h2>
            
            <h3 className="font-black text-3xl lg:text-4xl lowercase tracking-tight leading-tight text-black dark:text-white mb-4 transition-colors duration-500">
              connect to the network — and each other.
            </h3>
            
            <p className="font-medium text-lg lg:text-xl lowercase tracking-tight leading-tight text-black/80 dark:text-white/80 max-w-lg transition-colors duration-500">
              Wear your Impulse Band™ to connect on your terms. Show your mood or availability with colors, skip the awkwardness, and tap bands to instantly add someone you've met to your network.
            </p>
          </motion.div>
          
          {/* Band image */}
          <motion.div 
            className="flex-1 flex flex-col items-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <img
                src={bandImages[currentImageIndex]}
                alt="Impulse Band"
                className="w-48 h-auto"
              />
            </motion.div>
            
            {/* Color dots */}
            <div className="flex gap-2 mt-8">
              {bandImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentImageIndex === index 
                      ? 'bg-black dark:bg-white' 
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col items-start text-left space-y-8">
          {/* Band image first on mobile */}
          <div className="w-full flex flex-col items-center">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <img
                src={bandImages[currentImageIndex]}
                alt="Impulse Band"
                className="w-32 h-auto"
              />
            </motion.div>
            
            {/* Color dots */}
            <div className="flex gap-2 mt-8">
              {bandImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentImageIndex === index 
                      ? 'bg-black dark:bg-white' 
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
          
          {/* Text content */}
          <div className="max-w-sm">
            <h2 className="font-black text-4xl lowercase tracking-tight leading-none text-black dark:text-white mb-4 transition-colors duration-500">
              the band
            </h2>
            
            <h3 className="font-black text-xl lowercase tracking-tight leading-tight text-black dark:text-white mb-3 transition-colors duration-500">
              connect to the network — and each other.
            </h3>
            
            <p className="font-medium text-base lowercase tracking-tight leading-tight text-black/80 dark:text-white/80 transition-colors duration-500">
              Wear your Impulse Band™ to connect on your terms. Show your mood or availability with colors, skip the awkwardness, and tap bands to instantly add someone you've met to your network.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
