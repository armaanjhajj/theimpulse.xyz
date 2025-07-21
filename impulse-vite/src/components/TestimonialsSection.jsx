import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

const testimonials = [
  {
    name: 'Alex J.',
    text: 'Impulse blew my mind. The animations and design are next-level!'
  },
  {
    name: 'Morgan S.',
    text: 'The smoothness and speed are unreal. This is the future of web UI.'
  },
  {
    name: 'Jamie L.',
    text: 'I can’t stop scrolling. Every section feels alive and interactive.'
  },
];

export default function TestimonialsSection() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ x: ['0%', '-100%'] });
  }, [controls]);

  return (
    <section className="py-24 bg-dark-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-16 tracking-tight">
          Testimonials
        </h2>
        <div className="overflow-hidden relative">
          <motion.div
            className="flex gap-8"
            animate={controls}
            transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}
            style={{ width: 'max-content' }}
          >
            {testimonials.concat(testimonials).map((t, i) => (
              <div
                key={i}
                className="min-w-[320px] bg-dark-800 rounded-2xl p-8 shadow-neon border border-dark-800 text-white flex flex-col items-center mx-2"
              >
                <p className="text-lg mb-4">“{t.text}”</p>
                <span className="font-bold text-neon-blue">{t.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
} 