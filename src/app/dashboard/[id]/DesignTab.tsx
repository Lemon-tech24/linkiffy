/* eslint-disable @typescript-eslint/no-explicit-any */

import { UpdateDesign } from "@/app/lib/action";
import { DesignTypes } from "@/app/lib/interfaces";
import Image from "next/image";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { CiCamera } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const DesignTab = ({
  data,
  setData,
  id,
  initialData,
}: {
  data: DesignTypes;
  setData: React.Dispatch<React.SetStateAction<DesignTypes>>;
  id: string;
  initialData: DesignTypes;
}) => {
  const [isDisabled, setDisabled] = useState<boolean>(false);

  const ref = useRef<HTMLInputElement>(null);

  const initialColors = {
    first: "#000000",
    second: "#ffffff",
  };

  const isColorsDefault =
    data.gradientColor1 === initialColors.first &&
    data.gradientColor2 === initialColors.second;

  const handleUpdate = () => {
    if (isDisabled) return;

    setDisabled(true);
    toast
      .promise(
        UpdateDesign(data, id).then((res) => {
          if (!res.ok) throw res;
          return res;
        }),
        {
          loading: "Updating design...",
          success: "Design updated successfully!",
          error: "Failed to update design.",
        }
      )
      .finally(() => setDisabled(false));
  };

  const isDataChanged = JSON.stringify(data) !== JSON.stringify(initialData);

  const convertImage = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  };

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      removeImage();
      toast.error("Please select a valid image format.");
      return;
    }

    if (file.size && file.size > 3 * 1024 * 1024) {
      removeImage();
      toast.error("File exceeds the maximum size of 3MB.");
      return;
    }

    return await toast.promise(
      convertImage(file).then((converted) => {
        setData((prev: any) => ({
          ...prev,
          image: converted as string | null,
        }));
      }),
      {
        loading: "Uploading image...",
        success: "Image uploaded successfully!",
        error: "Error: Something went wrong.",
      }
    );
  };

  const removeImage = () => {
    setData((prev: DesignTypes) => ({ ...prev, image: "" }));
    if (ref.current) return (ref.current.value = "");
  };

  return (
    <div className="w-full h-[90%] rounded-lg border-2 bg-white shadow-md flex items-center gap-10 flex-col overflow-y-auto p-4">
      {/* Link Image Section */}
      <div className="w-full flex items-center flex-col">
        <div className="w-full text-left text-lg font-semibold">Link Image</div>
        {data && data.image ? (
          <div className="flex items-center justify-center">
            <Image src={data.image} alt="Image" width={100} height={100} />
            <MdDelete
              className="text-2xl text-red-600 cursor-pointer"
              onClick={removeImage}
            />
          </div>
        ) : (
          <div
            className="p-1 rounded-full border-2 border-dashed border-black hover:border-green-600"
            onClick={() => ref.current?.click()}
          >
            <CiCamera className="text-7xl hover:scale-90" />
            <input
              type="file"
              ref={ref}
              className="hidden"
              name="image"
              accept="image/*"
              onChange={handleImage}
            />
          </div>
        )}
      </div>

      {/* Link Title Section */}
      <div className="w-full flex items-center flex-col gap-2">
        <div className="w-full flex items-center flex-col">
          <div className={`w-full text-left text-lg font-semibold`}>
            Link Title
          </div>
          <input
            type="text"
            className={`border border-gray-600 rounded-md p-1 border-solid w-full outline-none padding`}
            style={{ color: `${data.titleColor ? data.titleColor : "black"}` }}
            value={data.title}
            placeholder="Untitled"
            onChange={(e) => setData({ ...data, title: e.target.value })}
            minLength={3}
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

      {/* Bio Section */}
      <div className="w-full flex items-center flex-col">
        <div className="w-full text-left text-lg font-semibold">Bio</div>
        <textarea
          value={data.bio}
          className="resize-none w-full h-[100px] border border-gray-600 rounded-md p-1 border-solid outline-none padding"
          onChange={(e) => setData({ ...data, bio: e.target.value })}
          maxLength={100}
        ></textarea>
      </div>

      {/* Background Color */}
      <div className="w-full flex items-center flex-col gap-2">
        <div className="w-full text-left text-lg font-semibold">
          Background Color
        </div>
        <div className="w-full flex items-center justify-start">
          <div className="flex items-center border border-solid rounded-md shadow-xl">
            <div
              className={`w-[100px] cursor-pointer text-center text-lg rounded-l-md ${
                data.colorType === "solid" &&
                "bg-gradient-to-r from-blue-500 to-violet-600 text-white"
              }`}
              onClick={() => setData({ ...data, colorType: "solid" })}
            >
              Solid
            </div>
            <div
              className={`w-[100px] cursor-pointer text-center text-lg rounded-r-md ${
                data.colorType === "gradient" &&
                "bg-gradient-to-r from-blue-500 to-violet-600 text-white"
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

      <button
        onClick={handleUpdate}
        disabled={isDisabled || !isDataChanged}
        className={`w-[70%] border border-solid shadow-2xl text-xl font-semibold rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 text-white ${
          isDisabled || !isDataChanged ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Update
      </button>
    </div>
  );
};

export default DesignTab;
