"use client";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import React from "react";

const DashboardNav = () => {
  const { user, isAuthenticated } = useKindeBrowserClient();
  const router = useRouter();

  if (!isAuthenticated) return null;

  return (
    <div className="w-full h-[6%] p-2 px-4 flex items-center justify-between">
      <div className="text-3xl first-letter:uppercase">
        {user?.given_name || user?.email}
      </div>
      <button
        className="border-none text-5xl font-bold bg-gradient-to-r from-[#F90B0B] via-[#209C94] to-[#69B72B] bg-clip-text text-transparent p-2 text-center"
        onClick={() => router.push("/dashboard")}
      >
        Linkiffy
      </button>
      <LogoutLink className="text-xl border border-black border-solid py-1 px-4 rounded-xl">
        Logout
      </LogoutLink>
    </div>
  );
};

export default DashboardNav;
