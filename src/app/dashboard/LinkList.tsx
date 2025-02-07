/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { deleteLink, getLinkList } from "../lib/action";
import type { Link } from "@prisma/client";
import { HiMiniLink } from "react-icons/hi2";
import { IoIosStats } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";

interface LinkTypes {
  keyword: boolean;
  setKeyword: any;
}

function LinkList({ keyword, setKeyword }: LinkTypes) {
  const [links, setLinks] = useState<Link[]>();
  const [isDisable, setDisabled] = useState<boolean>(false);
  const [isloading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    async function fetchLinks() {
      const data = await getLinkList();
      if (data && data.ok) {
        setLinks(data.list || []);
      }
    }

    fetchLinks().finally(() => setLoading(false));
  }, [keyword]);

  const handleDelete = async (id: string, index: number) => {
    if (isDisable) return;

    setDisabled(true);

    setLinks((prevLinks) => prevLinks?.filter((_, i) => i !== index));

    try {
      const { ok, msg } = await deleteLink(id);

      if (ok) {
        toast.success(msg);
      } else {
        toast.error(msg);
        setKeyword((prev: boolean) => !prev); // Re-fetch on failure
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while deleting the link.");
      setKeyword((prev: boolean) => !prev); // Re-fetch on failure
    } finally {
      setDisabled(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <ul className="list-none flex flex-col justify-center">
        {isloading ? (
          <span className="border-4 border-gray-400 rounded-full border-t-blue-800 h-[70px] w-[70px] animate-spin mx-auto"></span>
        ) : (
          <>
            {links && links.length > 0 ? (
              links.map((item: any, index: any) => (
                <li
                  key={index}
                  className="border-b border-gray-200 last:border-b-0 p-4"
                >
                  <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center justify-center">
                      <HiMiniLink className="text-4xl" />
                    </div>
                    <a className="flex-1 text-center cursor-pointer">
                      {item.link}
                    </a>
                    <div className="text-center flex items-center justify-center">
                      <IoIosStats className="text-2xl" />
                      <div className="text-lg cursor-default">
                        Views: {item.views}
                      </div>
                    </div>
                    <button
                      className="flex-1 flex items-center justify-center"
                      onClick={() => router.push(`/dashboard/${item.id}`)}
                    >
                      <IoIosSettings className="text-black text-3xl" />
                      <div className="text-base">Settings</div>
                    </button>

                    <button
                      className="flex items-center justify-center"
                      onClick={() => {
                        handleDelete(item.id, index);
                      }}
                      disabled={isDisable}
                    >
                      <MdDelete className="text-2xl text-red-600/80" />
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <div className="text-center">Empty Link list</div>
            )}
          </>
        )}
      </ul>
    </div>
  );
}

export default LinkList;
