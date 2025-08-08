# Unity WebGL + React Cinematic Experience

## Overview
Replace the current Three.js implementation with Unity WebGL for a proper cinematic experience that seamlessly transitions to your React site.

## Architecture

### Unity WebGL Scene
```
Assets/
├── Scenes/
│   ├── CinematicIntro.unity
│   └── MainMenu.unity
├── Scripts/
│   ├── CinematicController.cs
│   ├── CameraController.cs
│   ├── PhoneInteraction.cs
│   └── WebGLBridge.cs
├── Models/
│   ├── LowPolyFigure.fbx
│   ├── Elevator.fbx
│   └── Phone.fbx
├── Materials/
│   ├── WhiteRoom.mat
│   ├── BlackFigure.mat
│   └── ImpulseLogo.mat
└── Textures/
    └── impulse-logo.png
```

### React Integration
```javascript
// Unity WebGL Component
<UnityWebGL 
  src="/unity-build/Build/Build.data"
  loader="/unity-build/Build/Build.loader.js"
  onUnityLoaded={handleUnityLoaded}
  onSceneComplete={handleSceneComplete}
/>
```

## Implementation Steps

### 1. Unity Scene Setup

#### CinematicController.cs
```csharp
using UnityEngine;
using System.Collections;

public class CinematicController : MonoBehaviour
{
    [Header("Scene Objects")]
    public GameObject impulseLogo;
    public GameObject elevator;
    public GameObject otherFigure;
    public GameObject phone;
    
    [Header("UI Elements")]
    public GameObject scrollIndicator;
    public GameObject phoneButton;
    public GameObject phoneScreen;
    
    [Header("Camera")]
    public Camera playerCamera;
    public float walkSpeed = 2f;
    public float headBobAmount = 0.05f;
    
    private enum SceneState { Logo, Walking, Elevator, Complete }
    private SceneState currentState = SceneState.Logo;
    private float scrollProgress = 0f;
    
    void Start()
    {
        StartCoroutine(SceneSequence());
    }
    
    IEnumerator SceneSequence()
    {
        // Logo scene
        yield return new WaitForSeconds(3f);
        currentState = SceneState.Logo;
        
        // Wait for scroll input
        while (scrollProgress < 0.1f)
        {
            yield return null;
        }
        
        // Walking scene
        currentState = SceneState.Walking;
        StartCoroutine(WalkingSequence());
    }
    
    IEnumerator WalkingSequence()
    {
        Vector3 startPos = playerCamera.transform.position;
        Vector3 endPos = new Vector3(0, 0, -8f);
        
        while (scrollProgress < 0.8f)
        {
            float t = scrollProgress / 0.8f;
            playerCamera.transform.position = Vector3.Lerp(startPos, endPos, t);
            
            // Head bob
            float bob = Mathf.Sin(Time.time * 10f) * headBobAmount;
            playerCamera.transform.position += Vector3.up * bob;
            
            yield return null;
        }
        
        // Elevator scene
        currentState = SceneState.Elevator;
        phoneButton.SetActive(true);
    }
    
    public void OnPhoneButtonClick()
    {
        StartCoroutine(PhoneSequence());
    }
    
    IEnumerator PhoneSequence()
    {
        phone.SetActive(true);
        phoneScreen.SetActive(true);
        
        yield return new WaitForSeconds(1f);
        
        // Show "TALK TO HIM" text
        phoneScreen.GetComponent<Text>().text = "TALK TO HIM";
        
        yield return new WaitForSeconds(2f);
        
        // Figure turns head
        otherFigure.transform.Rotate(0, 30f, 0);
        
        yield return new WaitForSeconds(1f);
        
        // Complete scene
        currentState = SceneState.Complete;
        WebGLBridge.Instance.NotifySceneComplete();
    }
    
    public void UpdateScrollProgress(float progress)
    {
        scrollProgress = Mathf.Clamp01(progress);
    }
}
```

#### WebGLBridge.cs
```csharp
using UnityEngine;

public class WebGLBridge : MonoBehaviour
{
    public static WebGLBridge Instance { get; private set; }
    
    void Awake()
    {
        Instance = this;
    }
    
    public void NotifySceneComplete()
    {
        #if UNITY_WEBGL && !UNITY_EDITOR
        Application.ExternalCall("OnUnitySceneComplete");
        #endif
    }
    
    public void NotifyScrollInput(float delta)
    {
        if (CinematicController.Instance != null)
        {
            CinematicController.Instance.UpdateScrollProgress(delta);
        }
    }
}
```

### 2. React Integration

#### UnityWebGL Component
```jsx
import { useEffect, useRef } from 'react';

export default function UnityWebGL({ onSceneComplete }) {
  const unityRef = useRef(null);
  const canvasRef = useRef(null);
  
  useEffect(() => {
    // Load Unity WebGL
    const script = document.createElement('script');
    script.src = '/unity-build/Build/Build.loader.js';
    script.onload = () => {
      window.createUnityInstance(canvasRef.current, {
        dataUrl: '/unity-build/Build/Build.data',
        frameworkUrl: '/unity-build/Build/Build.framework.js',
        codeUrl: '/unity-build/Build/Build.wasm',
      }).then((unityInstance) => {
        unityRef.current = unityInstance;
        
        // Set up communication
        window.OnUnitySceneComplete = () => {
          onSceneComplete();
        };
      });
    };
    document.head.appendChild(script);
    
    return () => {
      if (unityRef.current) {
        unityRef.current.Quit();
      }
    };
  }, [onSceneComplete]);
  
  // Handle scroll events
  useEffect(() => {
    const handleWheel = (e) => {
      if (unityRef.current) {
        const delta = e.deltaY > 0 ? 0.1 : -0.1;
        unityRef.current.SendMessage('WebGLBridge', 'NotifyScrollInput', delta);
      }
    };
    
    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);
  
  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ background: 'white' }}
    />
  );
}
```

#### Updated App.jsx
```jsx
import { useState } from 'react';
import UnityWebGL from './components/UnityWebGL';
import Hero from './components/Hero';
// ... other imports

function App() {
  const [showCinematic, setShowCinematic] = useState(true);
  
  const handleSceneComplete = () => {
    setShowCinematic(false);
  };
  
  if (showCinematic) {
    return <UnityWebGL onSceneComplete={handleSceneComplete} />;
  }
  
  return (
    <div className="bg-white min-h-screen font-sans text-black">
      <Hero />
      <Features />
      <PortalPreview />
      <Waitlist />
    </div>
  );
}
```

### 3. Unity Build Process

#### Build Settings
1. **Platform**: WebGL
2. **Compression Format**: Disabled (for faster loading)
3. **Development Build**: Enabled (for debugging)
4. **Run In Background**: Enabled

#### Build Commands
```bash
# Unity CLI build
Unity -batchmode -quit -projectPath ./unity-project -buildTarget WebGL -executeMethod BuildScript.BuildWebGL

# Copy to React public folder
cp -r unity-build/Build public/unity-build/
```

### 4. Asset Requirements

#### 3D Models
- **Low-poly figure** (black, no face details)
- **Elevator** (simple white walls)
- **Phone** (3D model with screen)
- **Impulse logo** (3D text or textured plane)

#### Materials
- **White room material** (clean, minimal)
- **Black figure material** (matte)
- **Phone screen material** (emissive for text)

#### Audio
- **Ambient sound** (white noise)
- **Footsteps** (loop)
- **Elevator hum** (loop)

### 5. Performance Optimization

#### Unity Settings
- **Quality**: Low (for WebGL)
- **Texture Compression**: DXT1
- **LOD**: Disabled
- **Shadows**: Disabled
- **Post-processing**: Minimal

#### React Integration
- **Lazy loading** of Unity build
- **Preload** critical assets
- **Fallback** for slow connections

### 6. Accessibility

#### Unity WebGL
- **Keyboard navigation** support
- **Screen reader** compatibility
- **High contrast** mode
- **Reduced motion** option

#### React Fallback
```jsx
const [unitySupported, setUnitySupported] = useState(true);

useEffect(() => {
  // Check WebGL support
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  setUnitySupported(!!gl);
}, []);

if (!unitySupported) {
  return <AccessibilityFallback />;
}
```

## Benefits of Unity Approach

1. **Better Performance**: Optimized for real-time 3D
2. **Easier Animation**: Timeline-based sequencing
3. **Professional Tools**: Unity's animation and camera systems
4. **Better Debugging**: Unity's built-in debugging tools
5. **Asset Management**: Better 3D asset handling
6. **Cross-platform**: Easy deployment to multiple platforms

## Next Steps

1. **Set up Unity project** with the scene structure
2. **Create 3D assets** (figures, elevator, phone)
3. **Implement camera controller** with head bob
4. **Build WebGL version** and integrate with React
5. **Test performance** and optimize
6. **Add accessibility** features

This approach will give you a much more polished and performant cinematic experience!

