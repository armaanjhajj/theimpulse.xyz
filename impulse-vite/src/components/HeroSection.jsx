import { motion } from 'framer-motion';

const headlineVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const ctaVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { delay: 0.7, duration: 0.7 } },
};

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden bg-gradient-radial from-dark-900 via-dark-800 to-black">
      {/* Interactive background placeholder */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* TODO: Add particles or shader background */}
      </div>
      <motion.h1
        className="z-10 text-5xl md:text-7xl font-extrabold text-center text-neon-blue drop-shadow-neon mb-6 tracking-tight"
        initial="hidden"
        animate="visible"
        variants={headlineVariants}
      >
        Welcome to <span className="text-neon-pink">Impulse</span>
      </motion.h1>
      <motion.p
        className="z-10 text-xl md:text-2xl text-gray-200 text-center max-w-2xl mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        A stunning, modern, otherworldly React experience. Powered by Vite, styled with Tailwind, animated by Framer Motion.
      </motion.p>
      <motion.a
        href="#features"
        className="z-10 px-8 py-4 rounded-full bg-neon-pink text-white font-bold text-lg shadow-neon hover:scale-105 hover:bg-neon-blue transition-all duration-300"
        initial="hidden"
        animate="visible"
        variants={ctaVariants}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.97 }}
      >
        Get Started
      </motion.a>
    </section>
  );
}
