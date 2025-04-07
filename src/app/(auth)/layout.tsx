import "@/styles/globals.css";
import { bebasFont, oldStandordFont } from "@/lib/font";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={`flex min-h-screen flex-col ${bebasFont.className} ${oldStandordFont.className} antialiased`}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
