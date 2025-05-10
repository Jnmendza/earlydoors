"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { bebasFont } from "@/lib/font";
<<<<<<< HEAD
=======
import { links } from "@/data/Links";
>>>>>>> origin/main

const Navbar = () => {
  const pathname = usePathname();

  const links = [
    { label: "Home", href: "/" },
    { label: "Events", href: "/events" },
    { label: "About Us", href: "/aboutus" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <nav
      className={`${bebasFont.className} flex justify-between items-center text-2xl text-ednavy px-16`}
    >
      <div>
        <Image src='/assets/logo-main.png' alt='logo' height={80} width={80} />
      </div>
      <div className='space-x-4'>
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={`${
              pathname === link.href
                ? "text-edorange hover:text-edorange"
                : "text-ednavy"
            } hover:text-edgreen`}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div>
        <Link href='/portal'>Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
