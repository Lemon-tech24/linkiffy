"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { AddViewsLink, getLinkDetails, getUrlList } from "../lib/action";
import { DataType } from "../lib/interfaces";
import Image from "next/image";
import PreviewItem from "../components/PreviewItem";
import {
  FaGithub,
  FaInstagram,
  FaSquareFacebook,
  FaTiktok,
  FaTwitter,
} from "react-icons/fa6";

function Page({ params: { link } }: { params: { link: string } }) {
  const [loading, setLoading] = useState<boolean>(false);

  const [data, setData] = useState<DataType>();
  const [urlData, setUrlData] = useState<any>();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await getLinkDetails(link);

      if (response && response.data) return setData(response.data as any);
    }

    fetchData().finally(() => setLoading(false));
  }, [link]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await getUrlList(data?.id as string);

      if (response && response.list) return setUrlData(response.list as any);
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      await AddViewsLink(link);
    }

    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>{link} - My Website</title>
        <meta name="description" content={`Information about ${link}`} />
        <meta name="keywords" content={`${link}`} />
      </Head>

      {loading ? (
        <span className="border-4 border-gray-400 rounded-full border-t-blue-800 h-[70px] w-[70px] animate-spin mx-auto"></span>
      ) : (
        <div
          className={`w-full h-screen p-6 flex flex-col gap-4`}
          style={{
            background:
              data?.design.colorType === "solid"
                ? data.design.monoColor
                : `linear-gradient(${data?.design.colorDirection}, ${data?.design.colorOne}, ${data?.design.colorTwo})`,
          }}
        >
          {data?.design.image && (
            <Image
              src={data.design.image}
              width={110}
              height={110}
              alt="image"
            />
          )}
          <h1
            className="text-3xl font-semibold mx-auto"
            style={{ color: data?.design.titleColor }}
          >
            {data?.design.title}
          </h1>

          <div
            className="mx-auto"
            style={{
              width: "%0%",
              height: "auto",
              wordWrap: "break-word",
              overflowWrap: "break-word",
            }}
          >
            {data?.design.bio}
          </div>

          <div className="w-[50%] mx-auto flex flex-col items-center">
            {urlData && urlData.length > 0
              ? urlData.map((urlItem: any, index: number) => (
                  <div key={index} className="w-[70%]">
                    <PreviewItem
                      data={urlItem}
                      icon={getIconForUrl(urlItem.url)}
                      isPreview={false}
                    />
                  </div>
                ))
              : null}
          </div>

          <div className="flex items-center gap-2 absolute bottom-0 left-0 w-full justify-center p-4">
            <a
              href="https://linkiffy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#F90B0B] via-[#209C94] to-[#69B72B] flex items-center justify-center">
                <Image src="/link.png" alt="Image" width={20} height={20} />
              </div>

              <div className="font-bold text-2xl bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-transparent">
                Linkiffy
              </div>
            </a>
          </div>
        </div>
      )}
    </>
  );
}

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

export default Page;
