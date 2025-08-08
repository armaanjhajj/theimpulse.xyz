import { motion } from 'framer-motion';

export default function LaunchBar() {
  return (
    <section className="relative w-full bg-black py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-black text-4xl md:text-6xl lg:text-7xl lowercase tracking-tight leading-none text-white">
            launching fall 2025
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
