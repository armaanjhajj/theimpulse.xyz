import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="relative z-10 py-24 flex flex-col items-center justify-center">
      <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-center mb-10 text-white lowercase">
        ready to seize your moment?
      </h2>
      <motion.a
        href="#"
        whileHover={{ scale: 1.08, boxShadow: '0 0 32px 8px #fff' }}
        whileTap={{ scale: 0.97 }}
        className="px-12 py-6 rounded-full bg-white text-black font-heading font-extrabold text-2xl flex items-center gap-4 transition-all duration-300 cursor-pointer border-2 border-white hover:bg-black hover:text-white hover:border-white lowercase"
      >
        download for ios
        <ArrowRight className="w-7 h-7" />
      </motion.a>
    </section>
  );
} 