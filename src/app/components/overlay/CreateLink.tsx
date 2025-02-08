/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useState } from "react";
import { IoClose } from "react-icons/io5";
import { createLink } from "@/app/lib/action";
import toast from "react-hot-toast";
import DOMPurify from "dompurify";

function CreateLink({
  setOpen,
  setKeyword,
}: {
  setOpen: (data: boolean) => void;
  setKeyword: any;
}) {
  const [isDisable, setDisable] = useState<boolean>(false);
  const [inputLink, setInputLink] = useState<string>("");

  const handleClose = () => {
    setTimeout(() => setOpen(false), 300); // Delay removing from DOM for smooth transition
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDisable(true);

    const newInputLink = DOMPurify.sanitize(inputLink);

    toast
      .promise(
        createLink(newInputLink).then((res) => {
          if (!res.ok) throw res;
          return res;
        }),
        {
          loading: "Creating...",
          success: (data: any) => data.msg,
          error: (err) => err.msg,
        }
      )
      .finally(() => {
        setDisable(false);
        setOpen(false);
        setKeyword((prev: boolean) => !prev);
      });
  };

  return (
    <div className="fixed inset-0 bg-slate-600/80 flex items-center justify-center z-10">
      <div className="bg-white rounded-xl p-6 w-[30%] gap-2 flex flex-col scale-95 transition-all duration-300 animate-fadeIn">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-3xl font-semibold bg-gradient-to-r from-[#F90B0B] via-[#209C94] to-[#69B72B] bg-clip-text text-transparent">
            Create New Link
          </h1>
          <button
            onClick={handleClose}
            className="text-4xl"
            disabled={isDisable}
          >
            <IoClose />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="text"
            className="border border-black p-2 rounded-xl text-xl"
            placeholder="Enter your link"
            name="link"
            value={inputLink}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputLink(e.target.value.trim())
            }
            maxLength={20}
            required
          />
          <div>{inputLink.length}/20</div>
          <div className="text-xs">
            <strong>Note:</strong> more features will be available upon creation
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white text-xl rounded-xl p-2"
            disabled={isDisable}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateLink;
