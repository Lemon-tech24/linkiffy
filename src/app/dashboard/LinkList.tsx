/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { getLinkList } from "../lib/action";
import type { Link } from "@prisma/client";
import { HiMiniLink } from "react-icons/hi2";
import { IoIosStats } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import toast from "react-hot-toast";

function LinkList() {
  const [links, setLinks] = useState<Link[]>();

  useEffect(() => {
    async function fetchLinks() {
      const data = await getLinkList();

      if (data && data.ok) {
        setLinks(data.list);
      }
    }

    fetchLinks();

    return () => {};
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <ul className="list-none flex flex-col">
        {links &&
          links.length !== 0 &&
          links.map((link: any, index: any) => (
            <li
              key={index}
              className=" border-b border-gray-200 last:border-b-0 p-4"
            >
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center justify-center">
                  <HiMiniLink className="text-4xl" />
                </div>
                <a className="flex-1 text-center cursor-pointer">{link.link}</a>
                <div className="text-center flex items-center justify-center">
                  <IoIosStats className="text-2xl" />
                  <div className="text-lg cursor-default">
                    Views: {link.views}
                  </div>
                </div>
                <button className="flex-1 flex items-center justify-center">
                  <IoIosSettings className="text-black text-3xl" />
                  <div className="text-base">Settings</div>
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default LinkList;
