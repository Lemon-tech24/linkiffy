/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import React, { useEffect, useState } from "react";
import DesignTab from "./DesignTab";
import Preview from "./Preview";
import { DesignTypes, UrlTypes } from "@/app/lib/interfaces";
import UrlTab from "./UrlTab";
import { getShareLink, getUrlList } from "@/app/lib/action";

const Page = ({ params: { id } }: { params: { id: string } }) => {
  const { isAuthenticated } = useKindeBrowserClient();
  const initialData: DesignTypes = {
    image: "",
    title: "Untitled",
    titleColor: "#000000",
    bio: "Empty",
    colorType: "solid",
    gradientColor1: "#000000",
    gradientColor2: "#ffffff",
    colorDirection: "to right",
    monoColor: "#ffffff",
  };

  const [urlData, setUrlData] = useState<any>();

  const [designData, setDesignData] = useState<DesignTypes>(initialData);

  const [keyword, setKeyword] = useState<boolean>(false);
  const [isLoadingUrl, setLoadingUrl] = useState<boolean>(false);

  const [selectedTab, setSelectedTab] = useState<string>("design");

  const [shareLink, setShareLink] = useState<string>("");

  const tabs = ["design", "urls"];

  useEffect(() => {
    async function fetchLinks() {
      setLoadingUrl(true);
      const data = await getUrlList(id);
      if (data && data.ok) setUrlData(data.list || []);
    }

    fetchLinks().finally(() => setLoadingUrl(false));
  }, [keyword]);

  useEffect(() => {
    async function fetchLinks() {
      const response = await getShareLink(id);
      if (response && response.ok && typeof response.link === "string")
        setShareLink(response.link);
    }

    fetchLinks();
  }, []);

  if (!isAuthenticated) return null;

  return (
    <>
      <div className="w-full h-[94%] flex items-center justify-center px-36 gap-10">
        <div className="w-[35%] h-full flex flex-col items-center justify-between py-4">
          <div className="w-full flex items-center bg-white rounded-lg border shadow-md">
            {tabs.map((tab) => (
              <button
                className={`first-letter:uppercase first:rounded-l-lg last:rounded-r-lg w-full text-2xl p-2 ${
                  selectedTab === tab &&
                  "bg-gradient-to-r from-blue-500 to-violet-600 text-white"
                } duration-500`}
                type="button"
                key={tab}
                onClick={() => setSelectedTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {selectedTab === "design" && (
            <DesignTab
              data={designData}
              setData={setDesignData}
              id={id}
              initialData={initialData}
            />
          )}

          {selectedTab === "urls" && (
            <UrlTab
              id={id}
              urlData={urlData}
              setUrlData={setUrlData}
              keyword={keyword}
              setKeyword={setKeyword}
              loading={isLoadingUrl}
            />
          )}
        </div>

        <div className="w-1/2 h-full flex flex-col items-center justify-between py-4">
          <div className="w-full flex items-center border bg-white">
            <a
              href={`${window.location.origin}/${shareLink}`}
              className="underline"
            >
              {`${window.location.origin}`}/{shareLink}
            </a>
          </div>
          <Preview designData={designData} urlData={urlData} />
        </div>
      </div>
    </>
  );
};

export default Page;
