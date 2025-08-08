# Unity Project Setup for Cinematic Experience

## 1. Create Unity Project

### Unity Version
- **Recommended**: Unity 2022.3 LTS
- **Platform**: WebGL

### Project Settings
```
File > Build Settings > WebGL
Player Settings:
- Company Name: Impulse
- Product Name: Cinematic Experience
- WebGL Memory Size: 512MB
- Compression Format: Disabled
- Development Build: Enabled
```

## 2. Scene Structure

### Main Scene: CinematicIntro
```
Hierarchy:
├── Main Camera
├── Directional Light
├── CinematicController
├── WebGLBridge
├── Environment
│   ├── WhiteRoom
│   ├── Walls
│   └── Floor
├── UI
│   ├── Canvas
│   ├── ScrollIndicator
│   └── PhoneButton
├── Characters
│   ├── PlayerCamera
│   └── OtherFigure
├── Props
│   ├── ImpulseLogo
│   ├── Elevator
│   └── Phone
└── Audio
    ├── AmbientSource
    ├── FootstepsSource
    └── ElevatorSource
```

## 3. Scripts to Create

### CinematicController.cs
```csharp
using UnityEngine;
using System.Collections;
using UnityEngine.UI;

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
    public Text phoneScreenText;
    
    [Header("Camera")]
    public Camera playerCamera;
    public float walkSpeed = 2f;
    public float headBobAmount = 0.05f;
    
    [Header("Audio")]
    public AudioSource ambientAudio;
    public AudioSource footstepsAudio;
    public AudioSource elevatorAudio;
    
    private enum SceneState { Logo, Walking, Elevator, Complete }
    private SceneState currentState = SceneState.Logo;
    private float scrollProgress = 0f;
    private Vector3 cameraStartPos;
    
    void Start()
    {
        cameraStartPos = playerCamera.transform.position;
        phoneButton.SetActive(false);
        phone.SetActive(false);
        StartCoroutine(SceneSequence());
    }
    
    IEnumerator SceneSequence()
    {
        // Logo scene - wait 3 seconds
        yield return new WaitForSeconds(3f);
        currentState = SceneState.Logo;
        
        // Wait for scroll input
        while (scrollProgress < 0.1f)
        {
            yield return null;
        }
        
        // Start walking sequence
        currentState = SceneState.Walking;
        StartCoroutine(WalkingSequence());
    }
    
    IEnumerator WalkingSequence()
    {
        Vector3 startPos = playerCamera.transform.position;
        Vector3 endPos = new Vector3(0, 0, -8f);
        
        // Start footsteps audio
        if (footstepsAudio) footstepsAudio.Play();
        
        while (scrollProgress < 0.8f)
        {
            float t = scrollProgress / 0.8f;
            playerCamera.transform.position = Vector3.Lerp(startPos, endPos, t);
            
            // Head bob
            float bob = Mathf.Sin(Time.time * 10f) * headBobAmount;
            playerCamera.transform.position += Vector3.up * bob;
            
            yield return null;
        }
        
        // Stop footsteps, start elevator audio
        if (footstepsAudio) footstepsAudio.Stop();
        if (elevatorAudio) elevatorAudio.Play();
        
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
        phoneScreenText.gameObject.SetActive(true);
        
        yield return new WaitForSeconds(1f);
        
        // Show "TALK TO HIM" text
        phoneScreenText.text = "TALK TO HIM";
        
        yield return new WaitForSeconds(2f);
        
        // Figure turns head
        if (otherFigure)
        {
            otherFigure.transform.Rotate(0, 30f, 0);
        }
        
        yield return new WaitForSeconds(1f);
        
        // Complete scene
        currentState = SceneState.Complete;
        WebGLBridge.Instance.NotifySceneComplete();
    }
    
    public void UpdateScrollProgress(float delta)
    {
        scrollProgress = Mathf.Clamp01(scrollProgress + delta);
    }
}
```

### WebGLBridge.cs
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
        var controller = FindObjectOfType<CinematicController>();
        if (controller != null)
        {
            controller.UpdateScrollProgress(delta);
        }
    }
}
```

## 4. 3D Assets to Create

### Low-Poly Figure
```
- Simple black humanoid shape
- No face details
- Basic geometry (cubes, spheres)
- Position: (1.5, -1, -14)
```

### Elevator
```
- White walls (4x6x0.1)
- Light gray material
- Position: (0, 0, -8)
- Add elevator buttons
```

### Phone
```
- Simple 3D phone model
- Screen with emissive material
- Position: (0, -0.5, -1)
```

### Impulse Logo
```
- 3D text or textured plane
- Black material
- Position: (0, 0.5, 0)
- Add shadow/depth effect
```

## 5. Materials Setup

### WhiteRoom Material
```
- Shader: Standard
- Albedo: White (255, 255, 255)
- Metallic: 0
- Smoothness: 0.1
```

### BlackFigure Material
```
- Shader: Standard
- Albedo: Black (0, 0, 0)
- Metallic: 0
- Smoothness: 0.1
```

### PhoneScreen Material
```
- Shader: Standard
- Albedo: White
- Emission: Enabled
- Emission Color: White
- Emission Intensity: 1
```

## 6. Audio Setup

### Ambient Audio
```
- AudioClip: White noise or ambient hum
- Loop: Enabled
- Volume: 0.2
- Play On Awake: True
```

### Footsteps Audio
```
- AudioClip: Footstep sounds
- Loop: Enabled
- Volume: 0.4
- Play On Awake: False
```

### Elevator Audio
```
- AudioClip: Elevator hum
- Loop: Enabled
- Volume: 0.3
- Play On Awake: False
```

## 7. Build Process

### Build Settings
1. **Platform**: WebGL
2. **Target Platform**: WebGL
3. **Architecture**: Any
4. **Compression Format**: Disabled
5. **Development Build**: Enabled

### Build Commands
```bash
# Unity CLI build
Unity -batchmode -quit -projectPath ./unity-project -buildTarget WebGL -executeMethod BuildScript.BuildWebGL

# Copy to React public folder
mkdir -p public/unity-build
cp -r unity-project/Build public/unity-build/
```

## 8. Integration with React

### Update App.jsx
```jsx
import UnityWebGL from './components/UnityWebGL';

function App() {
  const [showCinematic, setShowCinematic] = useState(true);
  
  const handleSceneComplete = () => {
    setShowCinematic(false);
  };
  
  if (showCinematic) {
    return <UnityWebGL onSceneComplete={handleSceneComplete} />;
  }
  
  return (
    <div className="bg-white min-h-screen">
      <Hero />
      <Features />
      <PortalPreview />
      <Waitlist />
    </div>
  );
}
```

## 9. Testing

### Local Testing
1. Build Unity project to WebGL
2. Copy build files to `public/unity-build/`
3. Start React dev server
4. Test cinematic experience

### Performance Testing
- Check frame rate (target: 60fps)
- Monitor memory usage
- Test on different devices
- Optimize assets if needed

## 10. Optimization Tips

### Unity Settings
- **Quality**: Low
- **Texture Compression**: DXT1
- **LOD**: Disabled
- **Shadows**: Disabled
- **Post-processing**: Minimal

### Asset Optimization
- **Texture Size**: 512x512 max
- **Model Polygons**: Keep under 1000 per object
- **Audio**: Compress to OGG format
- **Build Size**: Target under 10MB

This setup will give you a professional-grade cinematic experience that seamlessly integrates with your React site!

