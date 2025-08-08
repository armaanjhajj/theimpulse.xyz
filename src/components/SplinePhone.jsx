import { useEffect, useState } from 'react';

export default function SplinePhone() {
  const [Spline, setSpline] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSpline = async () => {
      try {
        setIsLoading(true);
        const SplineModule = await import('@splinetool/react-spline');
        setSpline(() => SplineModule.default);
      } catch (error) {
        console.error('Failed to load Spline:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadSpline();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-96 md:h-[500px] relative flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
        <div className="text-center">
          <div className="relative mb-8">
            {/* Loading Phone Mockup */}
            <div className="w-48 h-80 mx-auto bg-gradient-to-b from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded-3xl shadow-2xl animate-pulse">
              <div className="w-44 h-76 mx-auto bg-black rounded-2xl mt-2 relative overflow-hidden">
                <div className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <div className="text-white text-xs font-bold">impulse</div>
                </div>
                <div className="p-4 text-white text-xs">
                  <div className="mb-2 bg-gray-700 h-2 rounded animate-pulse"></div>
                  <div className="mb-2 bg-gray-700 h-2 rounded animate-pulse"></div>
                  <div className="mb-2 bg-gray-700 h-2 rounded animate-pulse"></div>
                  <div className="mb-2 bg-gray-700 h-2 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-xl text-gray-600 dark:text-gray-400 mb-2">Loading 3D Scene...</div>
          <div className="text-sm text-gray-500 dark:text-gray-500 mb-4">
            Initializing Spline 3D engine
          </div>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-96 md:h-[500px] relative flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
        <div className="text-center">
          <div className="relative mb-8">
            {/* 3D Phone Mockup */}
            <div className="w-48 h-80 mx-auto bg-gradient-to-b from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded-3xl shadow-2xl transform rotate-12 transition-transform duration-500 hover:rotate-0">
              <div className="w-44 h-76 mx-auto bg-black rounded-2xl mt-2 relative overflow-hidden">
                <div className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <div className="text-white text-xs font-bold">impulse</div>
                </div>
                <div className="p-4 text-white text-xs">
                  <div className="mb-2">📱 Real-time matching</div>
                  <div className="mb-2">🎯 Compatibility scoring</div>
                  <div className="mb-2">⚡ Instant connections</div>
                  <div className="mb-2">🌍 Face-to-face moments</div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-xl text-gray-600 dark:text-gray-400 mb-2">3D iPhone Demo</div>
          <div className="text-sm text-gray-500 dark:text-gray-500 mb-4">
            Interactive 3D model of the impulse app
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
          >
            Retry 3D Scene
          </button>
        </div>
      </div>
    );
  }

  if (!Spline) {
    return (
      <div className="w-full h-96 md:h-[500px] relative flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">📱</div>
          <div className="text-xl text-gray-600 dark:text-gray-400">3D iPhone with App Logo</div>
          <div className="text-sm text-gray-500 dark:text-gray-500 mt-2">Spline not loaded</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-96 md:h-[500px] relative">
      <Spline
        scene="/i_phone_14_pro_copy/public/scene.splinecode"
        wasmPath="/i_phone_14_pro_copy/public/"
        onError={(error) => {
          console.error('Spline error:', error);
          setError('Failed to load 3D scene');
        }}
      />
    </div>
  );
}
