import { FiEdit } from "react-icons/fi";
import { ImStatsBars } from "react-icons/im";
import { LuSettings2 } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import UrlUpdate from "./overlay/UrlUpdate";
import UrlDelete from "./overlay/UrlDelete";
import { SetStateAction, useState } from "react";
import { Url } from "@prisma/client";

const PreviewItem = ({ data, icon }: { data: Url; icon: any }) => {
  return (
    <div className="shadow-md border-2 border-black rounded-xl p-4 w-full mb-2 flex flex-col bg-white shrink-0 flex-grow">
      <div className="flex items-center gap-2 justify-center">
        {data.displayIcon && (
          <div className="bg-blue-600 rounded-full p-2">{icon}</div>
        )}
        {data.name}
      </div>
      {data.description && (
        <div
          style={{
            height: "auto",
            wordWrap: "break-word",
            overflowWrap: "break-word",
          }}
        >
          {data.description}
        </div>
      )}
    </div>
  );
};

export default PreviewItem;
