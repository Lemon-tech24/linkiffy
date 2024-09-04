/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/navigation";
const Navigation = () => {
  const router = useRouter();
  return (
    <div className="w-full h-[6%] bg-gradient-to-r from-[#6981FF] via-[#B86DCB] to-[#FBA4A4] flex items-center justify-start px-6">
      <img
        src="./link.png"
        alt="icon"
        className="w-40 cursor-pointer"
        onClick={() => {
          console.log("Image clicked");
          router.push("/");
        }}
      />
    </div>
  );
};

export default Navigation;
