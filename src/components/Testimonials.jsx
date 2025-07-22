import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

const testimonials = [
  {
    name: 'alex',
    text: 'impulse made me realize how fun and real voice-first connections can be. no more endless swiping!'
  },
  {
    name: 'samira',
    text: 'the time-limited calls are genius. i met so many interesting people in just a week.'
  },
  {
    name: 'jordan',
    text: 'the design, the energy, the vibe—impulse is unlike any other social app.'
  },
  {
    name: 'priya',
    text: 'i love how boldness is rewarded. it feels fresh, spontaneous, and real.'
  },
];

export default function Testimonials() {
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      while (true) {
        for (let i = 0; i < testimonials.length; i++) {
          await controls.start({ x: `-${i * 100}%` }, { duration: 0.8, ease: 'easeInOut' });
          await new Promise((r) => setTimeout(r, 3500));
        }
      }
    };
    sequence();
  }, [controls]);

  return (
    <section className="relative z-10 py-24 px-4 md:px-0 max-w-4xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-center mb-16 text-white lowercase">
        what people are saying
      </h2>
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-lg">
        <motion.div
          className="flex"
          animate={controls}
          initial={{ x: 0 }}
          style={{ width: `${testimonials.length * 100}%` }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="w-full flex-shrink-0 px-8 py-12 flex flex-col items-center justify-center text-center"
              style={{ width: '100%' }}
            >
              <p className="text-xl md:text-2xl text-white font-sans mb-6 lowercase">“{t.text}”</p>
              <span className="font-heading text-lg font-bold text-white lowercase">{t.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 