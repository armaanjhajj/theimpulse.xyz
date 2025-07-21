import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

const headline = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } },
};

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen w-full bg-black text-white">
      <img
        src="https://i.imgur.com/VpoteIg.png"
        alt="Impulse App Logo"
        className="w-80 h-80 md:w-[28rem] md:h-[28rem] mb-8 object-contain"
        style={{ minWidth: 320, minHeight: 320 }}
      />
      <h1 className="font-heading font-extrabold text-[clamp(3rem,10vw,8rem)] lowercase text-center tracking-tight select-none">
        impulse
      </h1>
      <p className="mt-8 text-lg md:text-2xl text-center font-sans text-white/80 max-w-xl">
        Seize the moment. Make meaningful connections.
        Voice-first, AI-powered matchmaking.
      </p>
    </section>
  );
} 