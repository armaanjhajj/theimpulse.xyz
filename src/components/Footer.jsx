import { Twitter, Globe, Instagram } from 'lucide-react';

const socials = [
  { href: 'https://x.com/theimpulse_xyz', icon: <Twitter className="w-6 h-6" /> },
  { href: 'https://www.instagram.com/theimpulse.xyz/?next=%2F', icon: <Instagram className="w-6 h-6" /> },
  { href: 'https://theimpulse.xyz', icon: <Globe className="w-6 h-6" /> },
];

export default function Footer() {
  return (
    <footer className="w-full py-8 flex flex-col items-center gap-4 px-6 bg-black border-t border-white/10 mt-12">
      <div className="flex gap-6 justify-center">
        {socials.map((s, i) => (
          <a
            key={i}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-white transition-colors duration-200"
          >
            {s.icon}
          </a>
        ))}
      </div>
      <span className="font-sans text-white/60 text-sm text-center lowercase">&copy; {new Date().getFullYear()} impulse. all rights reserved.</span>
    </footer>
  );
} 