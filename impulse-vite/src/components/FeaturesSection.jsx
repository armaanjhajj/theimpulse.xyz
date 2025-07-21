import { motion } from 'framer-motion';
import { SparklesIcon, BoltIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

const features = [
  {
    icon: SparklesIcon,
    title: 'Stunning Animations',
    desc: 'Smooth, cinematic transitions and micro-interactions powered by Framer Motion.'
  },
  {
    icon: BoltIcon,
    title: 'Blazing Fast',
    desc: 'Built with Vite and optimized for performance, your experience is instant.'
  },
  {
    icon: GlobeAltIcon,
    title: 'Otherworldly Design',
    desc: 'Dark, neon, and modern. A visual journey with gradients and glowing effects.'
  },
];

const cardVariants = {
  offscreen: { opacity: 0, y: 60 },
  onscreen: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.3, duration: 0.8 } },
};

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 bg-dark-800">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-16 tracking-tight">
          Features
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="bg-dark-900 rounded-2xl p-8 shadow-neon flex flex-col items-center text-center border border-dark-800 hover:shadow-lg hover:shadow-neon transition-all duration-300 group"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.5 }}
              variants={cardVariants}
              whileHover={{ scale: 1.05, rotate: -2 }}
            >
              <feature.icon className="h-14 w-14 text-neon-blue mb-6 group-hover:text-neon-pink transition-colors duration-300" />
              <h3 className="text-2xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300 text-lg">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 