import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeSwitcher() {
  const [dark, setDark] = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <button
      className="fixed top-6 right-6 z-50 p-3 rounded-full bg-dark-800 text-neon-blue shadow-neon hover:bg-neon-pink hover:text-white transition-colors duration-300"
      onClick={() => setDark((d) => !d)}
      aria-label="Toggle theme"
    >
      {dark ? <Sun size={22} /> : <Moon size={22} />}
    </button>
  );
}
