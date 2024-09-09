"use client";
import React, { useEffect } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

import { useRouter } from "next/navigation";
import { createUser } from "../lib/action";
import DashboardNav from "../components/DashboardNav";

const Content = () => {
  return <div className="w-full h-[94%]"></div>;
};

function Page() {
  const { isAuthenticated, isLoading } = useKindeBrowserClient();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/");
    } else if (isAuthenticated) {
      createUser().then((data) => {
        console.log(data?.msg);
      });
    }
  }, [isLoading, isAuthenticated, router]);

  return (
    isAuthenticated &&
    !isLoading && (
      <div className="w-full h-screen">
        <DashboardNav />
        <Content />
      </div>
    )
  );
}

export default Page;
