/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useRouter } from "next/navigation";
const Navigation = () => {
  const router = useRouter();
  return (
    <div className="w-full h-[6%] bg-gradient-to-r from-[#6981FF] via-[#B86DCB] to-[#FBA4A4] flex items-center justify-start px-6">
      <button className="flex items-center justify-center gap-1 text-4xl font-[900] border-none outline-none text-white">
        <img src="./link.png" alt="image" className="w-[35px]" />
        Linkiffy
      </button>
    </div>
  );
};

export default Navigation;
