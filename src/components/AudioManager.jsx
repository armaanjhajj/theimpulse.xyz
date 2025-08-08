import { useEffect, useRef } from 'react';
import { useStore } from '../stores/cinematicStore';

export default function AudioManager() {
  const { sceneState, scrollProgress } = useStore();
  const audioRefs = useRef({});
  
  useEffect(() => {
    // Create audio contexts for different sounds
    const createAudio = (src, volume = 0.3) => {
      const audio = new Audio();
      audio.src = src;
      audio.volume = volume;
      audio.loop = true;
      return audio;
    };
    
    // Ambient sounds
    audioRefs.current.ambient = createAudio('/sounds/ambient.mp3', 0.2);
    audioRefs.current.footsteps = createAudio('/sounds/footsteps.mp3', 0.4);
    audioRefs.current.elevator = createAudio('/sounds/elevator.mp3', 0.3);
    
    return () => {
      Object.values(audioRefs.current).forEach(audio => {
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
    };
  }, []);
  
  useEffect(() => {
    const { ambient, footsteps, elevator } = audioRefs.current;
    
    switch (sceneState) {
      case 'logo':
        if (ambient) {
          ambient.play().catch(() => {}); // Ignore autoplay errors
        }
        break;
        
      case 'walking':
        if (ambient) ambient.play().catch(() => {});
        if (footsteps) footsteps.play().catch(() => {});
        break;
        
      case 'elevator':
        if (ambient) ambient.pause();
        if (footsteps) footsteps.pause();
        if (elevator) elevator.play().catch(() => {});
        break;
        
      case 'complete':
        Object.values(audioRefs.current).forEach(audio => {
          if (audio) audio.pause();
        });
        break;
    }
  }, [sceneState]);
  
  // Adjust footstep volume based on scroll speed
  useEffect(() => {
    const footsteps = audioRefs.current.footsteps;
    if (footsteps && sceneState === 'walking') {
      footsteps.playbackRate = 1 + scrollProgress * 0.5;
    }
  }, [scrollProgress, sceneState]);
  
  return null;
}

