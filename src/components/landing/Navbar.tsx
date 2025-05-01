"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { bebasFont } from "@/lib/font";
import { links } from "@/data/links";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className='relative w-2/3 mx-auto flex justify-between items-center p-6'>
      <Image
        src='/assets/logo-main.png'
        alt='EarlyDoors-Logo'
        width={100}
        height={100}
        className='object-contain'
      />
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
    </nav>
  );
};

export default Navbar;
