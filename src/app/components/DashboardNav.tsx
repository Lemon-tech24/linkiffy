import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import React from "react";

const DashboardNav = () => {
  const { user, isLoading, isAuthenticated } = useKindeBrowserClient();

  return (
    !isLoading &&
    isAuthenticated && (
      <div className="w-full h-[6%] px-4 flex items-center justify-between">
        <div className="text-3xl">{user?.given_name || user?.email}</div>
        <div className="text-4xl">Linkiffy</div>
        <LogoutLink className="text-xl border border-black border-solid py-1 px-4 rounded-xl">
          Logout
        </LogoutLink>
      </div>
    )
  );
};

export default DashboardNav;
