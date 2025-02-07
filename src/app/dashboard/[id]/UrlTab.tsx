/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React, { SetStateAction, useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import {
  FaSquareFacebook,
  FaTwitter,
  FaInstagram,
  FaGithub,
  FaTiktok,
} from "react-icons/fa6";
import CreateURL from "@/app/components/overlay/CreateURL";
import { getUrlList } from "@/app/lib/action";
import UrlItem from "@/app/components/UrlItem";

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

const UrlTab = ({
  id,
  urlData,
  setUrlData,
  keyword,
  setKeyword,
  loading,
}: {
  id: string;
  urlData: any;
  setUrlData: any;
  keyword: boolean;
  setKeyword: React.Dispatch<SetStateAction<boolean>>;
  loading: boolean;
}) => {
  console.log;
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <>
      {isOpen && (
        <CreateURL id={id} setOpen={setOpen} setKeyword={setKeyword} />
      )}
      <div className="w-full h-[90%] rounded-lg border-2 bg-white shadow-md flex items-center gap-10 flex-col overflow-y-auto p-2">
        <button
          type="button"
          className="w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-violet-800 text-white text-xl rounded-lg"
          onClick={() => setOpen(true)}
        >
          <IoMdAdd />
          New Url
        </button>

        {loading ? (
          <span className="border-4 border-gray-400 rounded-full border-t-blue-800 size-[50px] animate-spin mx-auto"></span>
        ) : urlData && urlData.length > 0 ? (
          urlData.map((urlItem: any, index: number) => (
            <div key={index} className="w-full">
              <UrlItem
                data={urlItem}
                icon={getIconForUrl(urlItem.url)}
                setKeyword={setKeyword}
              />
            </div>
          ))
        ) : (
          <div>No URLs found.</div>
        )}
      </div>
    </>
  );
};

export default UrlTab;
