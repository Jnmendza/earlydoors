import "../styles/globals.css";
import { bebasFont, oldStandordFont } from "@/lib/font";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>{/* Any meta or <link> tags go here */}</head>
      <body
        className={`
          h-screen 
          w-screen 
          ${bebasFont.className} 
          ${oldStandordFont.className}
        `}
      >
        {children}
      </body>
    </html>
  );
}
