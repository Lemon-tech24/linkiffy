"use client";
import React, { useEffect, useState } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { createUser } from "@/app/lib/action";
import LinkList from "./LinkList";
import CreateLink from "../components/overlay/CreateLink";

function Page() {
  const [isOpen, setOpen] = useState<boolean>(false);

  useEffect(() => {
    createUser().then((data) => console.log(data));
  }, []);

  const { isAuthenticated, isLoading } = useKindeBrowserClient();

  return (
    !isLoading &&
    isAuthenticated && (
      <>
        {isOpen && <CreateLink setOpen={setOpen} />}
        <div className="w-full h-[94%] flex flex-col py-16">
          <div className="card w-[40%] h-full mx-auto gap-2">
            <h1 className="font-semibold text-black text-4xl">
              Your Link List
            </h1>
            <button
              className="w-full bg-black text-white rounded-xl text-2xl p-2"
              onClick={() => {
                setOpen(true);
              }}
            >
              Create Link
            </button>

            <LinkList />
          </div>
        </div>
      </>
    )
  );
}

export default Page;
