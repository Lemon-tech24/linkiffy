import React from "react";

const loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      <span className="loading loading-dots w-16"></span>
    </div>
  );
};

export default loading;
