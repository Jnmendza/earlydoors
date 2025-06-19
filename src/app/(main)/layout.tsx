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
    <html lang='en'>
      <body
        className={`
          flex min-h-screen flex-col 
          ${bebasFont.className} ${oldStandordFont.className} 
          antialiased
        `}
      >
        {/* Navbar is now static in the flow */}
        <Navbar />

        {/* 
          Apply a negative top margin to the first child (the Hero), pulling it up 
          so the nav overlaps it initially. If your nav is ~4rem tall, use -mt-16 
          (16 × 4px = 64px). Tweak “mt-?” until the HUD just covers the hero. 
        */}
        <main className='flex-grow'>
          {/* We assume children[0] is HeroSection; wrap it in a div to apply -mt-16 */}
          <div className='-mt-22'>{children}</div>
        </main>

        <Footer />
      </body>
    </html>
  );
}
