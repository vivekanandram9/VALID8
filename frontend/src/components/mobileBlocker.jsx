import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MobileBlocker = () => {
  const [isBlocked, setIsBlocked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkDevice = () => {
      const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 1;
      const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      setIsBlocked(isTouch && isMobile);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  if (!isBlocked) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#161616] text-[#b1b8c2] flex items-center justify-center px-6 py-12 w-full h-full">
      <div className="text-center max-w-md space-y-4">
        <div className="text-5xl md:text-6xl">📵</div>
        <h1 className="text-3xl font-bold text-white">Desktop Only</h1>
        <p className="text-base md:text-lg text-textSecondary">
          This dashboard is only available on desktop or laptop devices.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-2 bg-lred text-white rounded-lg hover:bg-lred/80 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default MobileBlocker;
