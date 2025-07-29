import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const paragraph = [
  'we make moments.',
  'you tell us what you’re looking for and we find people worth meeting.',
  'no endless swiping, no second guessing, just a chance—right now.',
  'get on campus. get uncomfortable.'
].join(' ');

const words = paragraph.split(' ');
const HIGHLIGHT_WINDOW = 20; // number of words highlighted at a time

export default function Features() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  // The highlight window moves through the paragraph as you scroll
  return (
    <section ref={ref} className="relative z-10 w-full min-h-[60vh] flex flex-col justify-center items-center px-6 sm:px-8 md:px-12 pt-16 md:pt-24">
      <div className="max-w-3xl w-full mx-auto">
        <motion.p className="text-3xl md:text-5xl font-heading font-extrabold lowercase leading-tight mb-4 flex flex-wrap gap-x-2 gap-y-1">
          {words.map((word, i) => {
            const total = words.length;
            // The center of the highlight window moves from 0 to total as scrollYProgress goes from 0 to 1
            const center = useTransform(scrollYProgress, [0, 1], [0, total]);
            // Compute distance from this word to the center of the highlight window
            const distance = useTransform(center, (c) => Math.abs(i - c));
            // Highlight if within window, dim otherwise
            const opacity = useTransform(distance, [0, HIGHLIGHT_WINDOW / 2, HIGHLIGHT_WINDOW], [1, 0.7, 0.4]);
            const color = useTransform(distance, [0, HIGHLIGHT_WINDOW / 2, HIGHLIGHT_WINDOW], ["#000", "#666", "#999"]);
            return (
              <motion.span
                key={i}
                style={{ opacity, color, transition: 'color 0.2s, opacity 0.2s' }}
                className="inline-block"
              >
                {word + (word.endsWith('.') ? '' : ' ')}
              </motion.span>
            );
          })}
        </motion.p>
      </div>
    </section>
  );
} 