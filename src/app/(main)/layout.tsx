import type { Metadata } from "next";
import "@/styles/globals.css";
import { bebasFont, oldStandordFont } from "@/lib/font";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
        className={`flex min-h-screen flex-col ${bebasFont.className} ${oldStandordFont.className} antialiased`}
      >
        <Navbar />

        {/* Main content fills space */}
        <main className='flex-grow'>{children}</main>

        {/* Footer sticks to bottom */}
        <Footer />
      </body>
    </html>
  );
}
