"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { bebasFont } from "@/lib/font";
import { links } from "@/data/Links";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className='relative w-full flex justify-center py-4'>
      {/* Nav Links — centered */}
      <div className='flex gap-6'>
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={`text-4xl  hover:text-edorange ${
              pathname === link.href ? "text-edorange" : "text-ednavy"
            } px-2 py-2 ${bebasFont.className}`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Logo — hidden on home */}
      {pathname !== "/" && (
        <div className='absolute top-0 right-8 p-4 z-10'>
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
