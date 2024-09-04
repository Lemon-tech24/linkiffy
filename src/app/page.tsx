import HomeContent from "./components/HomeContent";
import { auth } from "@/auth";

import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (session) return redirect("/dashboard");

  return (
    <div className="w-full h-screen">
      <HomeContent />
    </div>
  );
}
