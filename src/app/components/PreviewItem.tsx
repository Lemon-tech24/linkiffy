/* eslint-disable @typescript-eslint/no-explicit-any */
import { Url } from "@prisma/client";
import { AddViewsUrl } from "../lib/action";

const PreviewItem = ({
  data,
  icon,
  isPreview,
}: {
  data: Url;
  icon: any;
  isPreview: boolean;
}) => {
  const handleClick = async () => {
    await AddViewsUrl(data.id);
  };
  return (
    !data.disabled && (
      <a
        href={data.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 justify-center"
        aria-disabled={isPreview}
        onClick={() => {
          if (isPreview === false) return handleClick();
        }}
      >
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
              className="text-xs"
            >
              {data.description}
            </div>
          )}
        </div>
      </a>
    )
  );
};

export default PreviewItem;
