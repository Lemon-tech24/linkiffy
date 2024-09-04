/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import LoginCreate from "./LoginCreate";
import ThreeD from "./ThreeD";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const HomeContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const search = searchParams.get("error");
  const [route, setRoute] = useState<string>("home");

  useEffect(() => {
    if (search === "OAuthCallbackError") {
      console.log("canceled");
      router.replace("/");
    }
  }, [search]);
  return (
    <>
      <Navigation />

      <div className="w-full h-[94%] flex animate-fadeIn">
        {route === "home" && (
          <>
            <div className="w-1/2 h-full flex flex-col justify-center items-center gap-10">
              <div className="text-[48px] font-bold bg-gradient-to-r from-[#F90B0B] via-[#209C94] to-[#69B72B] bg-clip-text text-transparent">
                Link it All Together
              </div>
              <p className="font-semibold text-black text-[32px]">
                Where you can showcase your links
              </p>

              <button
                type="button"
                className="p-4 border-2 border-solid border-black text-[24px] rounded-xl"
                onClick={() => setRoute("account")}
              >
                Login or Create Account
              </button>
            </div>
            <div className="w-1/2 h-full flex items-center justify-center">
              <ThreeD />
            </div>
          </>
        )}

        {route === "account" && <LoginCreate />}
      </div>
    </>
  );
};

export default HomeContent;
