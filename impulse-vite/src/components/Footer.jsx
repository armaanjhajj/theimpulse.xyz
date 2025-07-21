import { Github, Twitter, Mail } from 'lucide-react';

const socials = [
  { icon: Github, href: 'https://github.com/', label: 'GitHub' },
  { icon: Twitter, href: 'https://twitter.com/', label: 'Twitter' },
  { icon: Mail, href: 'mailto:hello@example.com', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="w-full py-8 bg-dark-900 flex flex-col items-center border-t border-dark-800">
      <div className="flex gap-6 mb-2">
        {socials.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-blue hover:text-neon-pink transition-colors duration-300 text-2xl p-2 rounded-full shadow-neon hover:shadow-lg"
            aria-label={label}
          >
            <Icon size={28} />
          </a>
        ))}
      </div>
      <span className="text-gray-500 text-sm">© {new Date().getFullYear()} Impulse. All rights reserved.</span>
    </footer>
  );
} 