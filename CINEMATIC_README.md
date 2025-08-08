# Cinematic 3D Experience - Impulse Website

## 🎬 Overview

This is an immersive 3D cinematic experience that serves as the entry point to the Impulse website. It combines:

- **Spline Scene**: Your "the_strange_world" environment
- **STL Model**: 3D "impulse" text from `/public/output.stl`
- **First-person camera**: Mouse-look and scroll-to-walk mechanics
- **Interactive narrative**: Phone interaction and scene transitions
- **Seamless transition**: To your existing React site

## 🚀 Features

### **Visual Experience**
- ✅ **Spline Environment**: Loads your "the_strange_world" scene
- ✅ **3D Impulse Text**: Floating STL model with animations
- ✅ **Black & White Aesthetic**: No color allowed - pure minimalism
- ✅ **Post-processing**: Bloom, noise, and motion blur effects
- ✅ **Screen Shake**: Realistic head bob while walking

### **Interactive Mechanics**
- ✅ **Scroll-to-Walk**: Mouse wheel moves camera forward
- ✅ **Mouse Look**: Subtle camera rotation with mouse movement
- ✅ **Scene Transitions**: Automatic progression based on scroll
- ✅ **Phone Interaction**: "Check Phone" button with narrative
- ✅ **Elevator Encounter**: Low-poly figure that turns head

### **Narrative Flow**
1. **Loading**: Pulsing "impulse" text for 3 seconds
2. **Logo Scene**: Floating STL model with scroll indicator
3. **Walking**: Camera moves forward as user scrolls
4. **Elevator**: User enters elevator with another figure
5. **Phone Interaction**: Click "check phone" button
6. **Narrative Beat**: Phone shows "TALK TO HIM" message
7. **Figure Response**: Other figure turns head
8. **Transition**: Fade to white, then to main site

## 🛠 Technical Implementation

### **Dependencies**
```json
{
  "@react-three/fiber": "^8.15.0",
  "@react-three/drei": "^9.88.0",
  "@react-three/postprocessing": "^2.15.0",
  "@splinetool/runtime": "^0.9.0",
  "framer-motion": "^12.23.6",
  "zustand": "^4.4.0"
}
```

### **Key Components**

#### **CinematicExperience.jsx**
Main orchestrator component that manages:
- Scene state transitions
- Scroll event handling
- UI overlays and interactions
- Transition to main site

#### **Scene Components**
- **ImpulseSTL**: Loads and animates the STL model
- **SplineScene**: Loads your Spline environment
- **CameraController**: Handles first-person camera movement
- **Elevator**: 3D elevator environment
- **OtherFigure**: Low-poly character

#### **UI Components**
- **ScrollIndicator**: Flashing "scroll impulse" text
- **PhoneButton**: "Check Phone" interaction
- **PhoneOverlay**: Full-screen phone experience
- **TransitionOverlay**: Fade to main site

### **State Management**
```javascript
const useStore = create((set, get) => ({
  sceneState: 'loading' | 'logo' | 'walking' | 'elevator' | 'complete',
  scrollProgress: 0-1,
  showPhone: boolean,
  phoneChecked: boolean
}));
```

## 📁 File Structure

```
src/components/
├── CinematicExperience.jsx    # Main cinematic component
├── ScrollHandler.jsx          # Scroll event handling
└── AudioManager.jsx           # Audio management

public/
├── output.stl                 # 3D impulse text model
├── the_strange_world (1)/     # Spline scene files
│   └── public/
│       ├── scene.splinecode   # Main Spline scene
│       ├── process.wasm       # Spline runtime
│       └── draco_decoder.wasm # Compression
└── sounds/                    # Audio files
    ├── ambient.mp3
    ├── footsteps.mp3
    └── elevator.mp3
```

## 🎮 User Experience

### **Loading Sequence**
1. White background with pulsing "impulse" text
2. Progress indicator shows loading percentage
3. 3-second loading animation
4. Smooth fade to 3D scene

### **Logo Scene**
1. Floating STL model with gentle animation
2. "scroll impulse" indicator flashes
3. User must scroll to continue
4. Spline environment visible in background

### **Walking Sequence**
1. Camera moves forward as user scrolls
2. Realistic head bob and screen shake
3. Elevator becomes visible in distance
4. Smooth camera transitions

### **Elevator Scene**
1. User enters elevator environment
2. "Check Phone" button appears
3. Click to trigger phone interaction
4. Other figure turns head in response

### **Phone Interaction**
1. Full-screen white overlay
2. "impulse" logo centered
3. "TALK TO HIM" text flashes
4. 3-second narrative beat
5. Fade to transition

### **Site Transition**
1. White fade with impulse logo
2. Fade to black
3. Reveal existing React site
4. Seamless user experience

## 🎨 Visual Effects

### **Post-processing Pipeline**
```javascript
<EffectComposer>
  <Bloom luminanceThreshold={0.8} intensity={0.5} />
  <Noise premultiply />
  <MotionBlur samples={4} />
</EffectComposer>
```

### **Camera Effects**
- **Head Bob**: `Math.sin(time * 0.01) * 0.05`
- **Screen Shake**: Subtle rotation and position changes
- **Mouse Look**: Responsive to mouse movement
- **Smooth Transitions**: Lerp-based camera movement

### **Animation System**
- **Floating Text**: Gentle up/down and rotation
- **UI Elements**: Framer Motion animations
- **Scene Transitions**: Smooth state changes
- **Particle Effects**: Optional background particles

## 🔧 Customization

### **Scene Timing**
```javascript
// Adjust timing in CinematicExperience.jsx
setTimeout(() => {
  setIsLoading(false);
  setTimeout(() => {
    setSceneState('logo');
  }, 1000);
}, 3000); // Loading duration
```

### **Scroll Sensitivity**
```javascript
// In scroll handler
const delta = e.deltaY > 0 ? 0.1 : -0.1; // Adjust sensitivity
```

### **Camera Movement**
```javascript
// In CameraController
camera.position.z = 5 - scrollProgress * 15; // Adjust range
camera.position.y = Math.sin(time * 0.01) * 0.05; // Adjust bob
```

### **Visual Effects**
```javascript
// Post-processing settings
<Bloom luminanceThreshold={0.8} intensity={0.5} />
<Noise premultiply />
<MotionBlur samples={4} />
```

## 🚀 Performance Optimization

### **Asset Optimization**
- **STL Model**: 392KB - consider compression
- **Spline Scene**: 16MB - optimize textures
- **Audio Files**: Use OGG format for smaller size
- **Loading**: Implement progressive loading

### **Rendering Settings**
- **Quality**: Low for WebGL compatibility
- **Shadows**: Disabled for performance
- **LOD**: Not implemented (consider for complex scenes)
- **Particles**: Limited to 50 for performance

### **Mobile Optimization**
- **Touch Controls**: Implement touch scroll
- **Responsive**: Scale UI elements
- **Performance**: Reduce effects on mobile
- **Loading**: Show loading screen

## 🐛 Debugging

### **Debug Panel**
The experience includes a debug panel showing:
- Current scene state
- Scroll progress
- Manual scene transition button

### **Console Logging**
- Spline scene loading status
- STL model loading progress
- Scene state transitions
- Error handling

### **Common Issues**
1. **STL not loading**: Check file path and CORS
2. **Spline scene issues**: Verify Spline runtime
3. **Performance problems**: Reduce post-processing
4. **Scroll not working**: Check event listeners

## 🎯 Future Enhancements

### **Planned Features**
- [ ] **Audio Integration**: Ambient sounds and footsteps
- [ ] **Particle Systems**: Background particle effects
- [ ] **Mobile Support**: Touch controls and responsive design
- [ ] **Accessibility**: Screen reader support and keyboard navigation
- [ ] **Performance**: Asset optimization and lazy loading

### **Advanced Features**
- [ ] **VR Support**: WebXR integration
- [ ] **Multi-language**: Internationalization
- [ ] **Analytics**: User interaction tracking
- [ ] **A/B Testing**: Different narrative paths
- [ ] **Social Sharing**: Screenshot and sharing features

## 📱 Browser Compatibility

### **Supported Browsers**
- ✅ **Chrome**: Full support
- ✅ **Firefox**: Full support
- ✅ **Safari**: Full support
- ✅ **Edge**: Full support

### **Requirements**
- **WebGL Support**: Required for 3D rendering
- **ES6+ Support**: For modern JavaScript features
- **Audio Support**: For ambient sounds (optional)
- **Touch Support**: For mobile devices

## 🎨 Design Philosophy

### **Minimalism**
- **Black & White Only**: No color allowed
- **Clean Typography**: Monospace fonts
- **Simple Geometry**: Low-poly aesthetic
- **Subtle Effects**: Bloom and noise only

### **Immersion**
- **First-person**: Direct user experience
- **Realistic Movement**: Head bob and screen shake
- **Narrative Flow**: Story-driven progression
- **Seamless Transitions**: No jarring cuts

### **Performance**
- **60fps Target**: Smooth animations
- **Fast Loading**: Optimized assets
- **Responsive**: Works on all devices
- **Accessible**: Screen reader support

This cinematic experience creates a memorable, immersive entry point to your Impulse website that perfectly captures the brand's aesthetic and narrative vision!

