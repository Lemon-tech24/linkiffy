/* eslint-disable @typescript-eslint/no-explicit-any */
import { deleteUrl } from "@/app/lib/action";
import type { Url } from "@prisma/client";
import React, { SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { MdClose, MdDelete } from "react-icons/md";

function UrlDelete({
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

  const handleClose = () => {
    setVisible(false);

    setTimeout(() => {
      setOpen((prev: boolean) => !prev);
    }, 300);
  };

  const Delete = () => {
    setDisabled(true);
    toast
      .promise(
        new Promise((resolve, reject) => {
          deleteUrl(data.id).then((res) => {
            if (!res.ok) reject(res.msg);
            else resolve(res.msg);
          });
        }),
        {
          loading: "Updating...",
          success: (msg: any) => {
            setOpen((prev: boolean) => !prev);
            return msg;
          },
          error: (msg: any) => msg,
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
        className={`bg-white w-full max-w-3xl p-6 rounded-xl flex flex-col gap-2 shadow-xl transform transition-transform duration-300`}
      >
        <div className="flex justify-between items-center border-b pb-3">
          <h1 className="text-lg font-semibold flex items-center">
            <MdDelete className="text-2xl text-red-500" />
            Delete URL
          </h1>
          <button
            onClick={handleClose}
            className="p-1 rounded-full hover:bg-gray-200 transition"
            disabled={isDisabled}
          >
            <MdClose size={20} />
          </button>
        </div>

        <h1 className="font-semibold text-xl text-center">
          Are you sure you want to delete ?{" "}
        </h1>
        <div className="w-full flex items-center gap-1">
          <div className="font-semibold text-xl first-letter:uppercase">
            {data.name}:
          </div>
          <div className="truncate w-full text-[18px] overflow-hidden underline">
            <a href={data.url} target="_blank">
              {data.url}
            </a>
          </div>
        </div>

        <div className="flex items-center justify-center w-full gap-4">
          <button
            onClick={Delete}
            disabled={isDisabled}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition disabled:opacity-50 text-xl"
          >
            Yes
          </button>
          <button
            onClick={handleClose}
            className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 transition text-xl"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default UrlDelete;
