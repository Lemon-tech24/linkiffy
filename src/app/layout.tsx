import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Linkiffy | An Online Bio Tool",
  description: "Linkiffy is an Online Bio Tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
