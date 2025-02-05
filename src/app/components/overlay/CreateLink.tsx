/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent } from "react";
import { IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";
import { createLink } from "@/app/lib/action";
import toast from "react-hot-toast";
import DOMPurify from "dompurify";

function CreateLink({ setOpen }: { setOpen: (data: boolean) => void }) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isDisable, setDisable] = useState<boolean>(false);
  const [inputLink, setInputLink] = useState<string>("");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setOpen(false), 300);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDisable(true);
    const newInputLink = DOMPurify.sanitize(inputLink);
    toast
      .promise(
        new Promise(async (resolve, reject) => {
          const res = await createLink(newInputLink);
          if (!res.ok) reject(res);
          else resolve(res);
        }),
        {
          loading: "Creating...",
          success: (data: any) => {
            return `${data.msg}`;
          },
          error: (err) => `${err.msg}`,
        }
      )
      .finally(() => setDisable(false));
  };

  return (
    <div
      className={`w-full h-[100vh] fixed z-10 top-0 left-0 bg-slate-600/80 flex items-center justify-center transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="bg-white rounded-xl p-6 w-[30%] gap-2 flex flex-col">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-3xl font-semibold bg-gradient-to-r from-[#F90B0B] via-[#209C94] to-[#69B72B] bg-clip-text text-transparent">
            Create New Link
          </h1>
          <button onClick={handleClose} className="text-4xl">
            <IoClose />
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex justify-center flex-col gap-2"
        >
          <input
            type="text"
            className="border-[1px] border-solid border-black p-2 rounded-xl text-xl"
            placeholder="Enter your link"
            name="link"
            value={inputLink}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputLink(e.target.value.trim())
            }
            maxLength={20}
            required
          />
          <div>{!inputLink.length ? 0 : inputLink.length}/20</div>

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
