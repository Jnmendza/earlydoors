import "../styles/globals.css";
import { bebasFont, oldStandordFont } from "@/lib/font";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={`
          h-screen 
          w-screen 
          ${bebasFont.variable} 
          ${oldStandordFont.className}
        `}
      >
        {children}
      </body>
    </html>
  );
}
