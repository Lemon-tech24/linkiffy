/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import React, { useState } from "react";
import { CiCamera } from "react-icons/ci";

interface DataTypes {
  title: string;
  titleColor: string;
  bio: string;
  colorType: "solid" | "gradient" | string;
  monoColor?: string;
  gradientColor1?: string;
  gradientColor2?: string;
  colorDirection?:
    | "to top"
    | "to top right"
    | "to right"
    | "to bottom right"
    | "to bottom"
    | "to bottom left"
    | "to left"
    | "to top left"
    | string;
}

const DesignTab = ({
  data,
  setData,
}: {
  data: DataTypes;
  setData: (data: DataTypes) => void;
}) => {
  const initialColors = {
    first: "#000000",
    second: "#ffffff",
  };

  const isColorsDefault =
    data.gradientColor1 === initialColors.first &&
    data.gradientColor2 === initialColors.second;

  return (
    <div className="w-full h-[90%] rounded-lg border-2 bg-white shadow-md flex items-center gap-10 flex-col overflow-y-auto p-4">
      <div className="w-full flex items-center flex-col">
        <div className="w-full text-left text-lg font-semibold">Link Image</div>
        <div className="p-1 rounded-full border-2 border-dashed border-black hover:border-green-600">
          <CiCamera className="text-7xl hover:scale-90" />
          <input type="file" className="hidden" />
        </div>
      </div>

      <div className="w-full flex items-center flex-col gap-2">
        <div className="w-full flex items-center flex-col">
          <div className="w-full text-left text-lg font-semibold">
            Link Title
          </div>
          <input
            type="text"
            className="border border-gray-600 rounded-md p-1 border-solid w-full outline-none padding"
            value={data.title}
            placeholder="Untitled"
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
        </div>
        <div className="w-full flex items-center gap-1">
          <div className="text-base font-semibold">Color:</div>
          <input
            type="color"
            value={data.titleColor}
            className="w-[100px]"
            onChange={(e) => setData({ ...data, titleColor: e.target.value })}
          />
        </div>
      </div>

      <div className="w-full flex items-center flex-col">
        <div className="w-full text-left text-lg font-semibold">Bio</div>
        <textarea
          value={data.bio}
          className="resize-none w-full h-[100px] border border-gray-600 rounded-md p-1 border-solid outline-none padding"
          onChange={(e) => setData({ ...data, bio: e.target.value })}
        ></textarea>
      </div>

      <div className="w-full flex items-center flex-col gap-2">
        <div className="w-full text-left text-lg font-semibold">
          Background Color
        </div>
        <div className="w-full flex items-center justify-start">
          <div className="flex items-center border border-solid rounded-md shadow-xl">
            <div
              className={`w-[100px] cursor-pointer text-center text-lg rounded-l-md ${
                data.colorType === "solid" && "bg-blue-400"
              }`}
              onClick={() => setData({ ...data, colorType: "solid" })}
            >
              Solid
            </div>
            <div
              className={`w-[100px] cursor-pointer text-center text-lg rounded-r-md ${
                data.colorType === "gradient" && "bg-blue-400"
              }`}
              onClick={() => setData({ ...data, colorType: "gradient" })}
            >
              Gradient
            </div>
          </div>
        </div>

        <div
          className="w-full h-[60px] border border-solid border-black"
          style={{
            background: `${
              data.colorType === "gradient"
                ? `linear-gradient(${data.colorDirection}, ${data.gradientColor1}, ${data.gradientColor2})`
                : data.monoColor
            }`,
          }}
        ></div>

        <div className="w-full flex gap-1 items-center">
          {data.colorType === "solid" ? (
            <div className="flex items-center w-full justify-start gap-1">
              <div className="text-lg">Color</div>
              <input
                type="color"
                value={data.monoColor}
                onChange={(e) =>
                  setData({ ...data, monoColor: e.target.value })
                }
                className="border border-black border-solid rounded-md"
              />
            </div>
          ) : (
            <>
              <div className="w-full flex items-center gap-1">
                <div className="text-lg">Direction </div>
                <select
                  onChange={(e) =>
                    setData({
                      ...data,
                      colorDirection: e.target.value as any,
                    })
                  }
                  value={data.colorDirection}
                  className="border border-solid border-black rounded-md text-base px-1"
                >
                  <option value="to right" defaultValue={"to right"}>
                    Right
                  </option>
                  <option value="to left">Left</option>
                  <option value="to top">Top</option>
                  <option value="to top right">Top Right</option>
                  <option value="to top left">Top Left</option>
                  <option value="to bottom right">Bottom Right</option>
                  <option value="to bottom">Bottom</option>
                  <option value="to bottom left">Bottom Left</option>
                </select>
              </div>
              <div className="flex items-center w-full justify-center gap-2">
                <div className="flex item-center gap-2">
                  <div className="text-lg">Colors</div>
                  <input
                    type="color"
                    value={data.gradientColor1}
                    onChange={(e) =>
                      setData({ ...data, gradientColor1: e.target.value })
                    }
                    className="border border-black border-solid rounded-md"
                  />
                  <input
                    type="color"
                    value={data.gradientColor2}
                    onChange={(e) =>
                      setData({ ...data, gradientColor2: e.target.value })
                    }
                    className="border border-black border-solid rounded-md"
                  />
                </div>

                {!isColorsDefault && (
                  <button
                    type="button"
                    onClick={() =>
                      setData({
                        ...data,
                        gradientColor1: initialColors.first,
                        gradientColor2: initialColors.second,
                      })
                    }
                    className="text-lg"
                  >
                    Reset
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const Page = ({ params: { id } }: { params: { id: string } }) => {
  const { isAuthenticated, isLoading } = useKindeBrowserClient();
  const initial = {
    title: "",
    titleColor: "#000000",
    bio: "",
    colorType: "solid",
    gradientColor1: "#000000",
    gradientColor2: "#ffffff",
    colorDirection: "to right",
    monoColor: "#000000",
  };

  const btns = ["design", "links", "settings"];

  const [data, setData] = useState<DataTypes>(initial);
  const [selected, setSelect] = useState<string>("design");

  return (
    !isLoading &&
    isAuthenticated && (
      <div className="w-full h-[94%] flex items-center justify-center px-36 gap-10">
        <div className="w-[35%] h-full flex flex-col items-center justify-between py-4">
          <div className="w-full flex items-center bg-white rounded-lg border shadow-md">
            {btns.map((item, index) => {
              return (
                <button
                  className={`first-letter:uppercase first:rounded-l-lg last:rounded-r-lg w-full text-2xl p-2 ${
                    selected === item.toLowerCase() && "bg-blue-500"
                  } duration-500`}
                  type="button"
                  key={index}
                  onClick={() => setSelect(item.toLowerCase())}
                >
                  {item}
                </button>
              );
            })}
          </div>

          {selected === "design" && <DesignTab data={data} setData={setData} />}
        </div>

        {/* ------------------------------------------------------------- */}
        <div className="w-1/2 h-full flex flex-col items-center justify-between py-4">
          <div className="w-full flex items-center border bg-white">
            Share you Link
          </div>
          <div className="w-[50%] h-[90%] bg-white border-[8px] shadow-xl rounded-[50px] border-solid border-black"></div>
        </div>
      </div>
    )
  );
};

export default Page;
