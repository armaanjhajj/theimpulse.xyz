import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function PeekingVideo() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  
  const { scrollY } = useScroll();
  
  // Transform the video position based on scroll
  const videoY = useTransform(scrollY, [0, 300], [0, -100]);
  const videoOpacity = useTransform(scrollY, [0, 200], [0.8, 1]);
  const videoScale = useTransform(scrollY, [0, 300], [1, 1.05]);

  // Cycling text words
  const words = ['meet', 'talk', 'tap', 'connect'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log('Video autoplay prevented:', e));
    }
  }, []);

  // Cycle through words
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 1000); // Change word every second

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section className="relative w-full bg-white overflow-hidden">
      {/* Container that creates the peeking effect */}
      <div 
        ref={containerRef}
        className="relative w-full"
        style={{ 
          height: 'calc(100vh + 80px)', // Extra height to allow peeking
          marginTop: '-80px' // Pull up to create subtle peek effect
        }}
      >
        {/* Video with scroll-based animations */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            y: videoY,
            opacity: videoOpacity,
            scale: videoScale,
          }}
        >
          {/* Mobile: Show left side, Desktop: Center */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover object-left md:object-center"
            muted
            loop
            playsInline
            preload="auto"
            style={{
              objectPosition: '25% center'
            }}
          >
            <source src="https://i.imgur.com/QcQlVeF.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Subtle overlay for better text readability */}
          <div className="absolute inset-0 bg-black/10" />
        </motion.div>

        {/* Split text effect at bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div className="relative flex justify-end px-6">
            {/* Single word with split effect */}
            <div className="relative">
              {/* Bottom half (black text on white background) */}
              <div className="bg-white h-1/2 overflow-hidden">
                <motion.div
                  key={currentWordIndex}
                  className="font-black text-[clamp(4rem,15vw,12rem)] lowercase tracking-tight leading-none text-black"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    transform: 'translateY(50%)', // Move text up so bottom half is visible
                    lineHeight: '1'
                  }}
                >
                  {words[currentWordIndex]}
                </motion.div>
              </div>
              
              {/* Top half (white text on video background) */}
              <div className="h-1/2 overflow-hidden">
                <motion.div
                  key={currentWordIndex}
                  className="font-black text-[clamp(4rem,15vw,12rem)] lowercase tracking-tight leading-none text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    transform: 'translateY(-50%)', // Move text down so top half is visible
                    lineHeight: '1'
                  }}
                >
                  {words[currentWordIndex]}
                </motion.div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
