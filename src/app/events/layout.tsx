import "@/styles/globals.css";
import { bebasFont, oldStandordFont } from "@/lib/font";

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`h-full w-full ${bebasFont.className} ${oldStandordFont.className} antialiased`}
    >
      <main>{children}</main>
    </div>
  );
}
