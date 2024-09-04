import SplineNext from "@splinetool/react-spline";
import { useState } from "react";

const ThreeD = () => {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className="w-full h-full animate-fadeIn">
      {isLoading && (
        <div className="w-full h-full flex items-center justify-center flex-col">
          <div className="text-2xl text-black">Loading..</div>
          <span className="border-4 border-gray-400 rounded-full border-t-blue-800 h-[100px] w-[100px] animate-spin"></span>
        </div>
      )}
      <SplineNext
        scene="https://prod.spline.design/eYy2YehJX9mmAL1W/scene.splinecode"
        onLoad={() => {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }}
        style={{ display: isLoading ? "none" : "block" }}
      />
    </div>
  );
};

export default ThreeD;
