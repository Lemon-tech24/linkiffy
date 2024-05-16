import React from "react";

const loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <span className="loading loading-dots w-16"></span>
    </div>
  );
};

export default loading;
