"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
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

      {/* Logo — show on non‐home pages */}
      {pathname !== "/" && (
        <div className='absolute top-0 right-8 p-4'>
          <Image
            src='/assets/logo-main.png'
            alt='EarlyDoors-Logo'
            width={100}
            height={100}
            className='object-contain'
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
