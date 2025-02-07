/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";
import DOMPurify from "dompurify";
import { UrlTypes } from "@/app/lib/interfaces";
import { updateUrl } from "@/app/lib/action";
import type { Url } from "@prisma/client";

function UrlUpdate({
  data,
  setOpen,
  setKeyword,
}: {
  data: Url;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  setKeyword: React.Dispatch<SetStateAction<boolean>>;
}) {
  const [isVisible, setVisible] = useState<boolean>(true);
  const [isDisabled, setDisabled] = useState<boolean>(false);

  const [newData, setNewData] = useState<UrlTypes>(data);

  const handleClose = () => {
    setVisible(false);

    setTimeout(() => {
      setOpen((prev) => !prev);
    }, 300);
  };
  const isDataChanged = JSON.stringify(data) !== JSON.stringify(newData);

  const detectPlatformFromUrl = (url: string) => {
    if (url.includes("facebook")) return "facebook";
    if (url.includes("twitter")) return "twitter";
    if (url.includes("instagram")) return "instagram";
    if (url.includes("github")) return "github";
    if (url.includes("tiktok")) return "tiktok";
    return "";
  };

  useEffect(() => {
    if (newData.url) {
      const platform = detectPlatformFromUrl(newData.url);
      setNewData((prevData) => ({
        ...prevData,
        name: platform,
      }));
    }
  }, [newData.url]);

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);

    toast
      .promise(
        new Promise(async (resolve, reject) => {
          const validateUrl = (url: string) => {
            try {
              new URL(url);

              return { ok: true };
            } catch {
              return { ok: false, msg: "Invalid URL format" };
            }
          };

          const result = validateUrl(newData.url);
          if (!result.ok) {
            reject(result);
            return;
          }

          const cleanData = {
            ...newData,
            name: DOMPurify.sanitize(newData.name),
            description: DOMPurify.sanitize(newData.description),
            url: DOMPurify.sanitize(newData.url),
          };

          const res = await updateUrl(cleanData, data.id);

          if (!res.ok) reject(res);
          else resolve(res);
        }),
        {
          loading: "Updating...",
          success: (data: any) => {
            setOpen(false);
            return data.msg;
          },
          error: (data: any) => {
            return data.msg;
          },
        }
      )
      .finally(() => {
        setDisabled(false);
        setKeyword((prev) => !prev);
      });
  };

  return (
    <div
      className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-300 ${
        isVisible ? "animate-fadeIn" : "animate-fadeOut"
      }`}
    >
      <div
        className={`bg-white w-full max-w-xl p-6 rounded-xl flex flex-col gap-2 shadow-xl transform transition-transform duration-300`}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h1 className="text-lg font-semibold">Update URL</h1>
          <button
            onClick={handleClose}
            className="p-1 rounded-full hover:bg-gray-200 transition"
            disabled={isDisabled}
          >
            <MdClose size={20} />
          </button>
        </div>

        {/* Form */}
        <form className="pt-2" onSubmit={handleSubmit}>
          {/* Display Icon */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="toggle"
              checked={newData.displayIcon}
              onChange={(e) =>
                setNewData({ ...newData, displayIcon: e.target.checked })
              }
            />
            <span>Display Icon</span>
          </div>

          {/* Select Platform */}
          <div>
            <label className="block text-sm font-medium">Select Platform</label>
            <select
              className="w-full p-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={newData.name}
              onChange={(e) => setNewData({ ...newData, name: e.target.value })}
            >
              <option value="facebook" defaultChecked>
                Facebook
              </option>
              <option value="twitter">Twitter</option>
              <option value="instagram">Instagram</option>
              <option value="github">GitHub</option>
              <option value="tiktok">TikTok</option>
            </select>
          </div>

          {/* URL Input */}
          <div>
            <label className="block text-sm font-medium">Enter URL</label>
            <input
              type="text"
              placeholder="https://yourlink.com"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={newData.url}
              onChange={(e) => setNewData({ ...newData, url: e.target.value })}
              required
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              placeholder="Enter description"
              className=" resize-none w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={4}
              maxLength={150}
              value={newData.description}
              onChange={(e) =>
                setNewData({ ...newData, description: e.target.value })
              }
              required
            ></textarea>
          </div>

          <div className="w-full flex items-center">
            {newData && newData.description.length === 0
              ? 0
              : newData.description.length}
            /150
          </div>
          <button
            type="submit"
            className={`w-full bg-gradient-to-r font-semibold from-blue-500 to-violet-800 text-white py-2 rounded-md hover:bg-blue-700 transition ${
              isDisabled || (!isDataChanged && "opacity-40")
            }`}
            style={{
              cursor: isDisabled || !isDataChanged ? "not-allowed" : "",
            }}
            disabled={isDisabled || !isDataChanged}
          >
            Update URL
          </button>
        </form>
      </div>
    </div>
  );
}

export default UrlUpdate;
