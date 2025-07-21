import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80',
];

export default function Gallery() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="relative z-10 py-24 px-4 md:px-0 max-w-6xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-center mb-16 text-white">
        Gallery & Showcase
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {images.map((src, i) => (
          <motion.div
            key={src}
            whileHover={{ scale: 1.04, boxShadow: '0 0 32px 4px #fff' }}
            className="rounded-2xl overflow-hidden shadow-lg cursor-pointer border border-white/10 bg-black"
            onClick={() => setSelected(src)}
          >
            <img
              src={src}
              alt="Impulse app showcase"
              className="w-full h-48 object-cover object-center transition-all duration-300"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.img
              src={selected}
              alt="Impulse app large preview"
              className="max-w-3xl max-h-[80vh] rounded-2xl border-4 border-white"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 200 }}
              loading="lazy"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
} 