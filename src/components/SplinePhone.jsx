import { useEffect, useState } from 'react';

export default function SplinePhone() {
  const [Spline, setSpline] = useState(null);

  useEffect(() => {
    const loadSpline = async () => {
      try {
        const SplineModule = await import('@splinetool/react-spline');
        setSpline(() => SplineModule.default);
      } catch (error) {
        console.error('Failed to load Spline:', error);
      }
    };

    loadSpline();
  }, []);

  if (!Spline) {
    return (
      <div className="w-full h-96 md:h-[500px] relative flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-800 mb-4">📱</div>
          <div className="text-xl text-gray-600">3D iPhone with App Logo</div>
          <div className="text-sm text-gray-500 mt-2">Loading Spline...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-96 md:h-[500px] relative">
      <Spline
        scene="/i_phone_14_pro_copy/public/scene.splinecode"
        wasmPath="/i_phone_14_pro_copy/public/"
      />
    </div>
  );
}
