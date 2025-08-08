import { create } from 'zustand';

export const useStore = create((set, get) => ({
  // Scene states: 'loading', 'logo', 'walking', 'elevator', 'complete'
  sceneState: 'loading',
  
  // Scroll progress (0-1)
  scrollProgress: 0,
  
  // Phone interaction states
  showPhone: false,
  phoneChecked: false,
  
  // Actions
  setSceneState: (state) => set({ sceneState: state }),
  
  setScrollProgress: (progress) => {
    const currentState = get().sceneState;
    const newProgress = Math.max(0, Math.min(1, progress));
    
    set({ scrollProgress: newProgress });
    
    // Auto-transition based on scroll progress
    if (currentState === 'logo' && newProgress > 0.1) {
      set({ sceneState: 'walking' });
    } else if (currentState === 'walking' && newProgress > 0.8) {
      set({ sceneState: 'elevator' });
    }
  },
  
  setShowPhone: (show) => set({ showPhone: show }),
  
  setPhoneChecked: (checked) => set({ phoneChecked: checked }),
  
  reset: () => set({
    sceneState: 'loading',
    scrollProgress: 0,
    showPhone: false,
    phoneChecked: false
  })
}));

