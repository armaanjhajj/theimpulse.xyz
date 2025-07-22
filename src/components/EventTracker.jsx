import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const events = [
  {
    date: 'august 27',
    location: 'livingston',
    items: [
      { time: '5:30 pm', label: 'rutgers day' },
      { time: '7:00 pm', label: 'the carnival' },
    ],
  },
  {
    date: 'august 28',
    location: 'livingston',
    items: [
      { time: 'all day', label: 'tailgates' },
      { time: '6:00 pm', label: 'under the lights' },
    ],
  },
  {
    date: 'august 31',
    location: 'busch',
    items: [
      { time: 'all day', label: 'watch the streets' },
    ],
  },
  {
    date: 'september 1',
    location: 'busch',
    items: [
      { time: '3:00 pm', label: 'block party' },
      { time: '8:00 pm', label: 'night market' },
    ],
  },
  {
    date: 'september 2',
    location: 'college ave',
    items: [
      { time: 'all day', label: 'watch the streets' },
    ],
  },
];

export default function EventTracker() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });

  return (
    <section ref={ref} className="w-full flex flex-col items-center justify-center py-24 md:py-32 bg-black">
      <motion.h2
        className="text-3xl md:text-5xl font-sans font-bold text-white text-center mb-12 tracking-tight lowercase"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        moments incoming
      </motion.h2>
      <div className="w-full max-w-2xl flex flex-col gap-10">
        {events.map((event, i) => {
          // Blur out everything for events after August 31 (i > 2)
          const blur = i > 2 ? 'blur-[4px] text-white/30' : '';
          return (
            <motion.div
              key={event.date}
              className={`flex flex-col items-center w-full ${blur}`}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.7, ease: 'easeOut' }}
            >
              <div className="flex w-full items-center mb-2">
                <div className="text-lg md:text-xl font-sans font-bold text-white/80 tracking-wide lowercase">
                  {event.date}
                </div>
                <div className="flex-1" />
                <div className="text-sm md:text-base font-sans text-white/60 min-w-[90px] text-right lowercase">
                  {event.location}
                </div>
              </div>
              <div className="flex flex-col gap-1 w-full">
                {event.items.map((item, j) => (
                  <motion.div
                    key={item.time + item.label}
                    className="flex items-center gap-4 w-full"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.35 + i * 0.15 + j * 0.08, duration: 0.6, ease: 'easeOut' }}
                  >
                    <span className="text-sm md:text-base font-sans text-white/60 min-w-[70px] text-right lowercase">
                      {item.time}
                    </span>
                    <span className="text-lg md:text-xl font-sans text-white tracking-tight lowercase">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>
              {/* Timeline line */}
              {i < events.length - 1 && (
                <motion.div
                  className="w-px h-10 bg-white/10 my-4"
                  initial={{ opacity: 0, scaleY: 0.7 }}
                  animate={inView ? { opacity: 1, scaleY: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.5, ease: 'easeOut' }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
} 