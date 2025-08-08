import { useEffect, useRef, useState } from 'react';

export default function UnityWebGL({ onSceneComplete, onUnityLoaded }) {
  const unityRef = useRef(null);
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const loadUnity = async () => {
      try {
        // Check if Unity WebGL is supported
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        if (!gl) {
          throw new Error('WebGL not supported');
        }

        // Load Unity WebGL loader
        const script = document.createElement('script');
        script.src = '/unity-build/Build/Build.loader.js';
        
        script.onload = async () => {
          if (!mounted) return;

          try {
            // Create Unity instance
            const unityInstance = await window.createUnityInstance(canvasRef.current, {
              dataUrl: '/unity-build/Build/Build.data',
              frameworkUrl: '/unity-build/Build/Build.framework.js',
              codeUrl: '/unity-build/Build/Build.wasm',
            });

            if (!mounted) {
              unityInstance.Quit();
              return;
            }

            unityRef.current = unityInstance;
            setIsLoading(false);

            // Set up communication bridge
            window.OnUnitySceneComplete = () => {
              if (mounted && onSceneComplete) {
                onSceneComplete();
              }
            };

            // Notify React that Unity is loaded
            if (onUnityLoaded) {
              onUnityLoaded(unityInstance);
            }

          } catch (err) {
            if (mounted) {
              setError(`Failed to load Unity: ${err.message}`);
              setIsLoading(false);
            }
          }
        };

        script.onerror = () => {
          if (mounted) {
            setError('Failed to load Unity WebGL loader');
            setIsLoading(false);
          }
        };

        document.head.appendChild(script);

      } catch (err) {
        if (mounted) {
          setError(err.message);
          setIsLoading(false);
        }
      }
    };

    loadUnity();

    return () => {
      mounted = false;
      if (unityRef.current) {
        unityRef.current.Quit();
      }
    };
  }, [onSceneComplete, onUnityLoaded]);

  // Handle scroll events for Unity
  useEffect(() => {
    const handleWheel = (e) => {
      if (unityRef.current) {
        const delta = e.deltaY > 0 ? 0.1 : -0.1;
        try {
          unityRef.current.SendMessage('WebGLBridge', 'NotifyScrollInput', delta);
        } catch (err) {
          console.warn('Unity not ready for scroll input:', err);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  if (error) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-black mb-4">Unity WebGL Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white">
      {/* Loading screen */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center">
            <div className="text-4xl font-bold text-black mb-4 animate-pulse">
              impulse
            </div>
            <div className="text-gray-600">Loading cinematic experience...</div>
          </div>
        </div>
      )}
      
      {/* Unity canvas */}
      <canvas 
        ref={canvasRef}
        className="w-full h-full"
        style={{ 
          background: 'white',
          display: isLoading ? 'none' : 'block'
        }}
      />
    </div>
  );
}

