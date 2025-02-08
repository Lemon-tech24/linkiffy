/* eslint-disable @typescript-eslint/no-explicit-any */
import { FiEdit } from "react-icons/fi";
import { ImStatsBars } from "react-icons/im";
import { LuSettings2 } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import UrlUpdate from "./overlay/UrlUpdate";
import UrlDelete from "./overlay/UrlDelete";
import { SetStateAction, useState } from "react";
import { Url } from "@prisma/client";

const UrlItem = ({
  data,
  icon,
  setKeyword,
}: {
  data: Url;
  icon: any;
  setKeyword: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [isOpenDelete, setOpenDelete] = useState<boolean>(false);
  const [isOpenUpdate, setOpenUpdate] = useState<boolean>(false);

  return (
    <>
      {isOpenDelete && (
        <UrlDelete
          data={data}
          setOpen={setOpenDelete}
          setKeyword={setKeyword}
        />
      )}
      {isOpenUpdate && (
        <UrlUpdate
          data={data}
          setOpen={setOpenUpdate}
          setKeyword={setKeyword}
        />
      )}
      <div className="w-full flex items-center border shadow-md rounded-md p-4">
        <div className="w-full flex items-center justify-center gap-2">
          <div className="shadow-2xl bg-blue-700 rounded-full p-1">{icon}</div>

          <div className="flex-1 h-full flex flex-col items-start min-w-0 overflow-hidden">
            <div className="text-sm first-letter:uppercase">{data.name}</div>
            <div className="text-xs text-gray-500 truncate w-full">
              {data.url}
            </div>
          </div>

          <div className="flex-1 flex items-center gap-2 justify-center">
            <ImStatsBars /> <span className="text-sm">{data.views}</span>
          </div>

          <div className="dropdown dropdown-left dropdown-hover">
            <div
              tabIndex={0}
              role="button"
              className="flex-shrink-0 flex items-center justify-center h-full"
            >
              <LuSettings2 className="text-xl" />
            </div>

            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <button
                  type="button"
                  className="flex items-center"
                  onClick={() => setOpenUpdate(true)}
                >
                  <FiEdit className="text-xl" />
                  Update
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="flex items-center"
                  onClick={() => setOpenDelete(true)}
                >
                  <MdDelete className="text-xl text-red-500" />
                  Delete
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default UrlItem;
