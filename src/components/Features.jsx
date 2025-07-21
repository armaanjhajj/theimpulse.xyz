import { motion } from 'framer-motion';
import { Sparkles, PhoneCall, Timer, UserCheck } from 'lucide-react';

const features = [
  {
    icon: <Sparkles className="w-10 h-10 text-white" />,
    title: 'Tailored Matchmaking',
    desc: 'Let AI connect you to the most interesting people in real time.'
  },
  {
    icon: <PhoneCall className="w-10 h-10 text-white" />,
    title: 'Voice-First',
    desc: 'Skip the small talk. Dive into real conversations instantly.'
  },
  {
    icon: <Timer className="w-10 h-10 text-white" />,
    title: 'Time-Limited Matches',
    desc: 'Every match is fleeting. Seize the moment before it expires.'
  },
  {
    icon: <UserCheck className="w-10 h-10 text-white" />,
    title: 'Rewarding Boldness',
    desc: 'Take action, get rewarded. No endless swiping or hesitation.'
  },
];

const cardVariants = {
  rest: { scale: 1, boxShadow: '0 0 0 0 #fff0' },
  hover: { scale: 1.07, boxShadow: '0 0 32px 4px #fff', transition: { type: 'spring', stiffness: 300 } },
};

export default function Features() {
  return (
    <section id="features" className="relative z-10 py-24 px-4 md:px-0 max-w-6xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-center mb-16 text-white">
        Why Impulse?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            className="bg-black rounded-3xl p-8 flex flex-col items-center text-center shadow-lg border border-white/10 cursor-pointer"
            initial="rest"
            whileHover="hover"
            animate="rest"
            variants={cardVariants}
          >
            <div className="mb-6">{f.icon}</div>
            <h3 className="font-heading text-2xl font-bold mb-2 text-white">{f.title}</h3>
            <p className="text-white/80 font-sans text-lg">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 