import "@/styles/globals.css";
import { bebasFont, oldStandordFont } from "@/lib/font";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={`flex min-h-screen flex-col ${bebasFont.className} ${oldStandordFont.className} antialiased`}
      >
        <main className='min-h-screen bg-edcream p-4'>{children}</main>
      </body>
    </html>
  );
}
