"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { bebasFont } from "@/lib/font";
import { links } from "@/data/Links";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav
      className='
        w-full z-50 
        bg-transparent 
        px-4 py-4 
        flex justify-center items-center
      '
    >
      {/* Nav Links — centered */}
      <div className='flex gap-6'>
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={`
              ${bebasFont.className} 
              text-4xl 
              px-2 py-2 
              hover:text-edorange 
              ${pathname === link.href ? "text-edorange" : "text-edcream"}
            `}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
