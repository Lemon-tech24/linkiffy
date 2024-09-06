import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const inter = Poppins({
  subsets: ["latin-ext"],
  weight: ["300"],
  variable: "--font-pop",
});

export const metadata: Metadata = {
  title: "Linkiffy | An Online Bio Tool",
  description: "An Online Bio Tool",
  icons: "./link_1.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
