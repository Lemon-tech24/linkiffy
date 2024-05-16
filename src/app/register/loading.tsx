import React from "react";

const loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-red-600 via-[#F266AB] to-green-400">
      <span className="loading loading-dots w-16"></span>
    </div>
  );
};

export default loading;
