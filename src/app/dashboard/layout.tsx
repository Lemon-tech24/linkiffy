import { Toaster } from "react-hot-toast";
import DashboardNav from "../components/DashboardNav";

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
