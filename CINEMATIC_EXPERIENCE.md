# Cinematic Experience - Impulse Website

## Overview

This is an immersive 3D cinematic experience that serves as the entry point to the Impulse website. It creates a first-person narrative similar to SUPERHOT, where users scroll to progress through a story before transitioning to the main website.

## Experience Flow

### 1. Loading Screen
- White background with pulsing "impulse" text
- 3-second loading sequence
- Smooth fade transition to main scene

### 2. Logo Scene
- 3D floating "impulse" text and logo sphere
- Flashing "scroll impulse" indicator
- User must scroll to continue

### 3. Walking Scene
- Camera moves forward as user scrolls
- Subtle head bob and screen shake effects
- Elevator becomes visible in distance
- Ambient particles floating in space

### 4. Elevator Scene
- User enters elevator with another low-poly figure
- "check phone" button appears
- Phone shows impulse logo, then "TALK TO HIM" message
- Other figure turns head when phone is checked

### 5. Transition
- White fade with impulse logo
- Fade to black
- Transitions to main website

## Technical Implementation

### Dependencies
- **Three.js**: 3D rendering engine
- **React Three Fiber**: React renderer for Three.js
- **React Three Drei**: Useful helpers for Three.js
- **React Three Postprocessing**: Visual effects
- **Framer Motion**: UI animations
- **Zustand**: State management

### Key Components

#### CinematicExperience.jsx
Main component that orchestrates the entire experience.

#### cinematicStore.js
Zustand store managing:
- Scene state transitions
- Scroll progress
- Phone interaction states

#### ScrollHandler.jsx
Tracks scroll events and updates cinematic state.

#### AudioManager.jsx
Handles ambient sounds and audio cues.

### Scene States
- `loading`: Initial loading screen
- `logo`: Floating logo scene
- `walking`: Moving toward elevator
- `elevator`: Phone interaction scene
- `complete`: Transition to main site

## Customization

### Audio
Replace placeholder files in `/public/sounds/`:
- `ambient.mp3`: Background ambient sound
- `footsteps.mp3`: Walking sound effects
- `elevator.mp3`: Elevator scene audio

### Visual Effects
- Adjust post-processing effects in `Scene` component
- Modify particle count in `ParticleSystem`
- Change camera movement in `useFrame` hooks

### Timing
- Loading duration: Modify timeout in `CinematicExperience`
- Scene transitions: Adjust scroll thresholds in `cinematicStore`
- Phone interaction: Modify delays in `PhoneButton`

## Performance Notes

- Uses `requestAnimationFrame` for smooth scroll handling
- Particles are limited to 50 for performance
- Audio is loaded asynchronously
- Post-processing effects are optimized for 60fps

## Browser Compatibility

- Requires WebGL support
- Modern browsers with ES6+ support
- Audio may be blocked by autoplay policies

## Future Enhancements

- Add more interactive elements
- Implement voice commands
- Add haptic feedback
- Create multiple story branches
- Add accessibility features

