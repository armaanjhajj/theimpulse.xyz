import { motion } from 'framer-motion';

export default function LaunchBar() {
  return (
    <section className="relative w-full bg-black dark:bg-white py-16 md:py-24 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <h2 className="font-black text-4xl md:text-6xl lg:text-7xl lowercase tracking-tight leading-none text-white dark:text-black transition-colors duration-500">
            launching fall 2025
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
