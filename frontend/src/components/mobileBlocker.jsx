import { useEffect, useState } from "react";

const MobileBlocker = () => {
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      // Block if screen width is less than 1024px or if it's a touch device
      setIsBlocked(width < 1024 || isTouch);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  if (!isBlocked) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#161616] text-[#b1b8c2] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-white">🔒 Desktop Only</h1>
        <p className="text-base">
          This dashboard is designed for desktop use only.
          <br />
          Please switch to a laptop or desktop device.
        </p>
      </div>
    </div>
  );
};

export default MobileBlocker;
