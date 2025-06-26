import type { Metadata } from "next";
import "@/styles/globals.css";
import { bebasFont, oldStandordFont } from "@/lib/font";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

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
    <div
      className={`${bebasFont.variable} ${oldStandordFont.variable} relative min-h-screen antialiased`}
    >
      <div className='absolute top-0 left-0 right-0 z-50'>
        <Navbar />
      </div>

      <main className='relative'>{children}</main>

      <Footer />
    </div>
  );
}
