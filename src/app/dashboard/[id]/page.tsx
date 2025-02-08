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
import { DataType, DesignTypes, UrlTypes } from "@/app/lib/interfaces";
import UrlTab from "./UrlTab";
import { getDesignData, getShareLink, getUrlList } from "@/app/lib/action";

const Page = ({ params: { id } }: { params: { id: string } }) => {
  const { isAuthenticated } = useKindeBrowserClient();

  const [urlData, setUrlData] = useState<any>();

  const [designData, setDesignData] = useState<DataType | any>();

  const [keyword, setKeyword] = useState<boolean>(false);
  const [isLoadingUrl, setLoadingUrl] = useState<boolean>(false);

  const [selectedTab, setSelectedTab] = useState<string>("design");

  const [shareLink, setShareLink] = useState<string>("");

  const tabs = ["design", "urls"];

  const [isLoadingDesign, setLoadingDesign] = useState<boolean>(false);

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

  useEffect(() => {
    async function fetchLinks() {
      setLoadingDesign(true);
      const response = await getDesignData(id);
      if (response && response.ok) return setDesignData(response.data || []);
    }

    fetchLinks().finally(() => setLoadingDesign(false));
  }, []);

  if (!isAuthenticated) return null;

  return (
    <>
      {isLoadingDesign ? (
        <div className="flex justify-center items-center h-full">
          <span className="border-4 border-gray-400 rounded-full border-t-blue-800 h-[70px] w-[70px] animate-spin"></span>
        </div>
      ) : (
        designData && (
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
                <DesignTab data={designData} setData={setDesignData} id={id} />
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
        )
      )}
    </>
  );
};

export default Page;
