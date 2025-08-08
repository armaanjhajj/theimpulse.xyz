import { motion } from 'framer-motion';

export default function PortalPreview({ onActivate }) {
  return (
    <section className="relative py-20 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        {/* Clickable Learn More Text with Black Bar */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="inline-block bg-black px-8 py-4">
            <button
              onClick={onActivate}
              className="text-4xl md:text-6xl font-black lowercase tracking-tight text-white hover:text-gray-300 transition-colors cursor-pointer"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              learn more
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 