import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const GIF_URL = 'https://i.imgur.com/jrr78NT.gif';

export default function BackgroundTransition() {
  const ref = useRef(null);
  // Listen to scroll position for the transition
  const { scrollY } = useScroll();
  // Fade in the GIF as you scroll from 0 to 300px
  const gifOpacity = useTransform(scrollY, [0, 300], [0, 1]);
  const blackOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Height of the transition block (e.g. 60vh)
  const blockHeight = '60vh';

  return (
    <div className="relative w-full flex justify-center items-center z-0" style={{ height: blockHeight }}>
      {/* Black overlay fades out */}
      <motion.div
        className="absolute inset-0 bg-black"
        style={{ opacity: blackOpacity, zIndex: 1 }}
      />
      {/* GIF background fades in, with extra black overlay for dimming */}
      <motion.div className="absolute inset-0 w-full h-full" style={{ opacity: gifOpacity, zIndex: 0 }}>
        <img
          src={GIF_URL}
          alt="impulse animated background"
          className="w-full h-full object-cover"
          draggable={false}
          style={{ filter: 'brightness(1.00)' }}
        />
        {/* Extra black overlay for more fade */}
        <div className="absolute inset-0 bg-black/70 pointer-events-none" />
      </motion.div>
      {/* Top gradient for seamless transition */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
      {/* Bottom solid black for hard edge */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-black z-10 pointer-events-none" />
    </div>
  );
} 