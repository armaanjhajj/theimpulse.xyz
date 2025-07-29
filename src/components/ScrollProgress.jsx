import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [width, setWidth] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setWidth(scrolled);

      // Haptic feedback for iPhone
      if ('navigator' in window && 'vibrate' in navigator) {
        const scrollDelta = Math.abs(scrollTop - lastScrollY);
        if (scrollDelta > 50) { // Only trigger on significant scroll
          // Light impact haptic feedback
          if ('vibrate' in navigator) {
            navigator.vibrate(10);
          }
        }
      }
      setLastScrollY(scrollTop);
    };

    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY]);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 bg-white">
      <div
        className="h-full bg-black transition-all duration-100"
        style={{ width: `${width}%` }}
      />
    </div>
  );
} 