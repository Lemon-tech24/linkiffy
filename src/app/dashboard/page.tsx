import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

import React from "react";
import LogoutButton from "../components/LogoutButton";

const Navigation = ({ session }: any) => {
  return (
    <div className="h-[6%] w-full flex items-center justify-between px-4">
      <div>{session.user.email}</div>

      <LogoutButton />
    </div>
  );
};

const page = async () => {
  const session = await auth();

  if (!session) {
    return redirect("/");
  }

  return (
    <div className="h-[94%] w-full">
      <Navigation session={session} />
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
};

export default page;
