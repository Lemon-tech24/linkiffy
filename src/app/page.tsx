import HomeContent from "./components/HomeContent";
import { auth } from "@/lib/auth";
import { cookies } from "next/headers";

import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  const access = cookies().get("access");

  if (session || access) return redirect("/dashboard");

  return (
    <div className="w-full h-screen">
      <HomeContent />
    </div>
  );
}
