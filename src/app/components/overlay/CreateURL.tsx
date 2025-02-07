/* eslint-disable @typescript-eslint/no-explicit-any */
import { createUrl } from "@/app/lib/action";
import { UrlTypes } from "@/app/lib/interfaces";
import React, { SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";
import DOMPurify from "dompurify";
function CreateURL({
  id,
  setOpen,
  setKeyword,
}: {
  id: string;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  setKeyword: React.Dispatch<SetStateAction<boolean>>;
}) {
  const [isVisible, setVisible] = useState<boolean>(true);
  const [isDisabled, setDisabled] = useState<boolean>(false);

  const initialValues: UrlTypes = {
    name: "facebook",
    description: "",
    displayIcon: true,
    disabled: false,
    url: "",
    views: 0,
  };

  const [data, setData] = useState<UrlTypes>(initialValues);

  const handleClose = () => {
    setVisible(false);

    setTimeout(() => {
      setOpen(false);
    }, 300);
  };

  const detectPlatformFromUrl = (url: string) => {
    if (url.includes("facebook")) return "facebook";
    if (url.includes("twitter")) return "twitter";
    if (url.includes("instagram")) return "instagram";
    if (url.includes("github")) return "github";
    if (url.includes("tiktok")) return "tiktok";
    return "facebook";
  };

  useEffect(() => {
    // When the URL is updated, automatically update the platform selection
    if (data.url) {
      const platform = detectPlatformFromUrl(data.url);
      setData((prevData) => ({
        ...prevData,
        name: platform,
      }));
    }
  }, [data.url]);

  const handleCreate = () => {
    setDisabled(true);

    toast
      .promise(
        new Promise(async (resolve: any, reject: any) => {
          const cleanData = {
            ...data,
            name: DOMPurify.sanitize(data.name),
            description: DOMPurify.sanitize(data.description),
            url: DOMPurify.sanitize(data.url),
          };

          const res = await createUrl(cleanData, id);
          if (!res.ok) return reject(res);
          return resolve(res);
        }),
        {
          loading: "Creating...",
          success: (data: any) => {
            setOpen((prev: boolean) => !prev);
            return data.msg;
          },
          error: (data: any) => data.msg,
        }
      )
      .finally(() => {
        setDisabled(false);
        setKeyword((prev: boolean) => !prev);
      });
  };

  return (
    <div
      className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-300 ${
        isVisible ? "animate-fadeIn" : "animate-fadeOut"
      }`}
    >
      <div
        className={`bg-white w-full max-w-md p-6 rounded-xl shadow-xl transform transition-transform duration-300`}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h1 className="text-lg font-semibold">Create URL</h1>
          <button
            onClick={handleClose}
            className="p-1 rounded-full hover:bg-gray-200 transition"
            disabled={isDisabled}
          >
            <MdClose size={20} />
          </button>
        </div>

        {/* Form */}
        <form
          className="pt-2"
          onSubmit={(e) => {
            e.preventDefault();
            setData(data);
          }}
        >
          {/* Display Icon */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="toggle"
              checked={data.displayIcon}
              onChange={(e) =>
                setData({ ...data, displayIcon: e.target.checked })
              }
            />
            <span>Display Icon</span>
          </div>

          {/* Select Platform */}
          <div>
            <label className="block text-sm font-medium">Select Platform</label>
            <select
              className="w-full p-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
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
              value={data.url}
              onChange={(e) => setData({ ...data, url: e.target.value })}
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
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              required
            ></textarea>
          </div>

          <div className="w-full flex items-center">
            {data && data.description.length === 0
              ? 0
              : data.description.length}
            /150
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r font-semibold from-blue-500 to-violet-800 text-white py-2 rounded-md hover:bg-blue-700 transition"
            style={{ cursor: isDisabled ? "not-allowed" : "" }}
            onClick={handleCreate}
            disabled={isDisabled}
          >
            Create URL
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateURL;
