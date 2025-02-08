/* eslint-disable @typescript-eslint/no-explicit-any */
import PreviewItem from "@/app/components/PreviewItem";
import { DesignTypes } from "@/app/lib/interfaces";
import Image from "next/image";
import React from "react";
import {
  FaGithub,
  FaInstagram,
  FaSquareFacebook,
  FaTiktok,
  FaTwitter,
} from "react-icons/fa6";

const getIconForUrl = (url: string, platform?: string) => {
  if (url.includes("facebook") || platform === "facebook") {
    return <FaSquareFacebook className="text-white" />;
  } else if (url.includes("twitter") || platform === "twitter") {
    return <FaTwitter className="text-white" />;
  } else if (url.includes("instagram") || platform === "instagram") {
    return <FaInstagram className="text-white" />;
  } else if (url.includes("github") || platform === "github") {
    return <FaGithub className="text-white" />;
  } else if (url.includes("tiktok") || platform === "tiktok") {
    return <FaTiktok className="text-white" />;
  } else return <Image src="/link.png" alt="image" width={18} height={18} />;
};

function Preview({
  designData,
  urlData,
}: {
  designData: DesignTypes;
  urlData: any;
}) {
  return (
    <div
      className="relative w-full h-[90%] border-2 shadow-xl rounded-xl border-solid border-black flex items-center flex-col p-4"
      style={{
        background:
          designData.colorType === "solid"
            ? designData.monoColor
            : `linear-gradient(${designData.colorDirection}, ${designData.colorOne}, ${designData.colorTwo})`,
      }}
    >
      {designData.image && (
        <Image src={designData.image} alt="image" width={110} height={110} />
      )}
      <div
        style={{
          color: designData.titleColor,
        }}
        className="font-semibold text-3xl"
      >
        {designData.title}
      </div>

      <div
        style={{
          width: "70%",
          height: "auto",
          wordWrap: "break-word",
          overflowWrap: "break-word",
        }}
      >
        {designData.bio}
      </div>

      {urlData && urlData.length > 0
        ? urlData.map((urlItem: any, index: number) => (
            <div key={index} className="w-[70%]">
              <PreviewItem
                data={urlItem}
                icon={getIconForUrl(urlItem.url)}
                isPreview={true}
              />
            </div>
          ))
        : null}

      {/* FOOTER */}
      <div className="flex items-center gap-2 absolute bottom-0 w-full justify-center p-4">
        <div className="size-8 rounded-full bg-gradient-to-r from-[#F90B0B] via-[#209C94] to-[#69B72B] flex items-center justify-center gap-2">
          <Image src="/link.png" alt="Image" width={20} height={20} />
        </div>
        <div className=" font-bold text-2xl bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-transparent">
          Linkiffy
        </div>
      </div>
    </div>
  );
}

export default Preview;
