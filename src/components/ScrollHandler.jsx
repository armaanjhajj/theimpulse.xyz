import { useEffect } from 'react';
import { useStore } from './CinematicExperience';

export default function ScrollHandler() {
  const { setScrollProgress, sceneState, get } = useStore();
  
  useEffect(() => {
    let scrollTimeout;
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    const handleScroll = () => {
      lastScrollY = window.scrollY;
      
      if (!ticking) {
        scrollTimeout = requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          
          // Calculate scroll progress (0-1)
          const maxScroll = documentHeight - windowHeight;
          const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
          
          // Only update if we're in cinematic mode
          if (sceneState !== 'complete') {
            setScrollProgress(progress);
          }
          
          ticking = false;
        });
        
        ticking = true;
      }
    };
    
    // Also handle wheel events for immediate response
    const handleWheel = (e) => {
      if (sceneState !== 'complete') {
        const currentProgress = get().scrollProgress;
        const delta = e.deltaY > 0 ? 0.1 : -0.1;
        const newProgress = Math.max(0, Math.min(1, currentProgress + delta));
        setScrollProgress(newProgress);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      if (scrollTimeout) {
        cancelAnimationFrame(scrollTimeout);
      }
    };
  }, [setScrollProgress, sceneState]);
  
  return null;
}
