import type { Metadata } from "next";
import "./globals.css";
import { bebasFont, oldStandordFont } from "@/lib/font";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "EarlDoors",
  description: "Link up with SD’s loudest supporters— matchday starts now.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${bebasFont.className} ${oldStandordFont.className} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
