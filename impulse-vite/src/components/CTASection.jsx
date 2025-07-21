import { motion } from 'framer-motion';

export default function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-t from-dark-800 to-dark-900 flex flex-col items-center">
      <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-10 tracking-tight">
        Ready to Join Us?
      </h2>
      <motion.a
        href="#"
        className="px-12 py-6 rounded-full bg-neon-blue text-white font-extrabold text-2xl shadow-neon hover:bg-neon-pink transition-all duration-300 relative overflow-hidden"
        whileHover={{ scale: 1.08, boxShadow: '0 0 24px #ff00ea, 0 0 48px #00f0ff' }}
        whileTap={{ scale: 0.97 }}
      >
        Join Impulse
      </motion.a>
    </section>
  );
}
