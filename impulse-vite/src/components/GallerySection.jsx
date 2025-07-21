import { useState } from 'react';
import { motion } from 'framer-motion';

const images = [
  'https://source.unsplash.com/random/800x600?sig=1',
  'https://source.unsplash.com/random/800x600?sig=2',
  'https://source.unsplash.com/random/800x600?sig=3',
  'https://source.unsplash.com/random/800x600?sig=4',
  'https://source.unsplash.com/random/800x600?sig=5',
  'https://source.unsplash.com/random/800x600?sig=6',
];

export default function GallerySection() {
  const [modalImg, setModalImg] = useState(null);

  return (
    <section className="py-24 bg-gradient-to-b from-dark-800 to-dark-900" id="gallery">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-16 tracking-tight">
          Gallery
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {images.map((src, i) => (
            <motion.div
              key={src}
              className="rounded-xl overflow-hidden shadow-neon cursor-pointer group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              onClick={() => setModalImg(src)}
            >
              <img
                src={src}
                alt={`Gallery ${i + 1}`}
                className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
        {/* Modal placeholder */}
        {modalImg && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" onClick={() => setModalImg(null)}>
            <img src={modalImg} alt="Modal" className="max-w-3xl max-h-[80vh] rounded-2xl shadow-neon" />
          </div>
        )}
      </div>
    </section>
  );
} 