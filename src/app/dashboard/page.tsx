/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { createLink, createUser, deleteLink, getLinkList } from "../lib/action";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { LuMousePointer2 } from "react-icons/lu";
import { ImStatsBars } from "react-icons/im";

const FormOverlay = ({
  setOpen,
  LinkData,
  setLinkData,
  keyword,
  setKeyword,
}: {
  setOpen: (data: boolean) => void;
  LinkData: any;
  setLinkData: (data: any) => void;
  keyword: boolean;
  setKeyword: (data: boolean) => void;
}) => {
  const [isVisible, setVisible] = useState<boolean>(true);
  const [pending, setPending] = useState<boolean>(false);
  const [link, setLink] = useState<string>("");

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      setOpen(false);
    }, 500);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);

    try {
      const data = await createLink(link);
      if (data.ok) {
        setLinkData([...LinkData, data.data]);
        toast.success(data.msg);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Error:", error);
    } finally {
      setPending(false);
      setLink("");
      handleClose();
      setKeyword(!keyword);
    }
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-gray-600/70 ${
          isVisible ? "fade-in" : "fade-out"
        }`}
      >
        <form
          className="w-[35%] bg-white p-4 rounded-lg flex flex-col gap-6"
          onSubmit={handleSubmit}
        >
          <div className="w-full flex items-center justify-between">
            <div className="text-2xl font-semibold">Create Your Linkiffy</div>
            <IoClose
              onClick={handleClose}
              className="text-3xl cursor-pointer"
            />
          </div>

          <div className="text-gray-400">Please type Your Preffered Link</div>

          <div className="w-full flex flex-grow items-center shadow-2xl">
            <div className="bg-gray-300 px-[4px] border border-r-0 text-lg">
              {typeof window !== "undefined" && window.location.origin + `/`}
            </div>

            <input
              type="text"
              className="border w-full border-l-0 text-lg px-[4px]"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              minLength={3}
              maxLength={12}
              required
            />
          </div>
          <div className="text-sm text-gray-400">
            *More settings will be available after creation*
          </div>

          <button
            type="submit"
            className={`${
              pending && "cursor-not-allowed"
            } w-[80%] text-xl bg-gradient-to-r from-[#6981FF] via-[#B86DCB] to-[#FBA4A4] mx-auto rounded-lg p-1 text-white font-bold`}
            aria-disabled={pending}
            disabled={pending}
          >
            {pending ? "Processing..." : "Create Link"}
          </button>
        </form>
      </div>
    </>
  );
};

const LinkList = ({
  LinkData,
  setLinkData,
  keyword,
}: {
  LinkData: Array<any>;
  setLinkData: (data: any) => void;
  keyword: boolean;
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isDisable, setDisabled] = useState<boolean>(false);
  const router = useRouter();

  const handleDelete = async (id: string, index: number) => {
    if (!isDisable)
      try {
        setDisabled(true);
        const { ok, msg } = await deleteLink(id);

        if (ok) {
          toast.success(msg);
          LinkData.splice(index, 1);
        } else {
          toast.error(msg);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setDisabled(false);
      }
  };

  useEffect(() => {
    const FetchLinks = async () => {
      try {
        const { ok, data } = await getLinkList();
        if (ok) {
          setLinkData(data);
        } else {
          setLinkData([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    FetchLinks();
  }, [keyword]);

  if (loading)
    return (
      <span className="border-2 border-gray-400 rounded-full border-t-green-600 h-[40px] w-[40px] animate-spin"></span>
    );

  if (!loading && LinkData.length === 0)
    return <div className="text-xl text-gray-400">No Links Yet.</div>;

  return (
    LinkData && (
      <div className="my-2 w-full pb-10">
        {Array.isArray(LinkData) &&
          LinkData.map((item: any, key: number) => {
            return (
              <div
                key={key}
                className="flex items-center justify-between p-4 border-t border-gray-300"
              >
                <div className="flex items-center">
                  <Image
                    src="/link_1.png"
                    alt={"globe icon"}
                    width={20}
                    height={20}
                  />
                  <span
                    className="ml-4 cursor-pointer text-base font-semibold"
                    onClick={() => router.push(`/dashboard/${item.id}`)}
                  >
                    {item.link}
                  </span>
                </div>

                <div
                  className="flex items-center gap-1 text-[18px] tooltip tooltip-bottom"
                  data-tip="Views"
                >
                  <ImStatsBars className="text-2xl" />
                  {item.views}
                </div>

                <div
                  className="flex items-center gap-1 text-[18px] tooltip tooltip-bottom"
                  data-tip="Click"
                >
                  <LuMousePointer2 className="text-2xl" />
                  {item.clicks}
                </div>

                <button
                  onClick={() =>
                    handleDelete(item.id, LinkData.indexOf(item) as number)
                  }
                  disabled={isDisable || loading}
                  aria-disabled={isDisable || loading}
                  className={`${
                    (isDisable || loading) && "cursor-not-allowed"
                  }`}
                >
                  delete
                </button>
              </div>
            );
          })}
      </div>
    )
  );
};

const DashboardContent = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [LinkData, setLinkData] = useState<any>([]);
  const [keyword, setKeyword] = useState<boolean>(false);

  return (
    <>
      {isOpen && (
        <FormOverlay
          setOpen={setOpen}
          setLinkData={setLinkData}
          LinkData={LinkData}
          keyword={keyword}
          setKeyword={setKeyword}
        />
      )}
      <div className="w-full h-[94%] flex items-center flex-col">
        <div className="w-[40%] h-[80%] flex items-center flex-col">
          <div className="text-3xl font-semibold w-full flex items-start my-[1em]">
            Public Pages
          </div>
          <button
            className="text-2xl font-semibold w-full bg-black text-white my-4 p-2 rounded-full"
            onClick={() => setOpen(true)}
          >
            Create Page
          </button>
          <LinkList
            LinkData={LinkData}
            setLinkData={setLinkData}
            keyword={keyword}
          />
        </div>
      </div>
    </>
  );
};

function Page() {
  const { isAuthenticated, isLoading } = useKindeBrowserClient();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      createUser().then((data) => {
        console.log(data?.msg);
      });
    }
  }, []);

  return (
    !isLoading &&
    isAuthenticated && (
      <>
        <DashboardContent />
      </>
    )
  );
}

export default Page;
