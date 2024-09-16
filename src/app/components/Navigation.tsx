import Image from "next/image";
import React from "react";

const Navigation = () => {
  return (
    <div className="w-full h-[6%] bg-gradient-to-r from-[#6981FF] via-[#B86DCB] to-[#FBA4A4] flex items-center justify-start px-6 py-1 shadow-md">
      <button className="flex items-center justify-center gap-1 text-4xl font-[900] border-none outline-none text-white">
        <Image src="/link.png" alt="image" width={35} height={35} />
        Linkiffy
      </button>
    </div>
  );
};

export default Navigation;
