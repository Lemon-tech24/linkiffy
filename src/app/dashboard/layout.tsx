import { Toaster } from "react-hot-toast";
import DashboardNav from "@/app/dashboard/DashboardNav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-screen">
      <Toaster />
      <DashboardNav />
      {children}
    </div>
  );
}
