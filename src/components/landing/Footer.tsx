import React from "react";
import { bebasFont } from "@/lib/font";
import { links } from "@/data/Links";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className='flex justify-center bg-edorange'>
      <div
        className={`flex flex-col w-3/4 py-6 text-3xl text-edcream ${bebasFont.className}`}
      >
        {/* Main content - will stack on mobile */}
        <div className='flex flex-col md:flex-row justify-between'>
          {/* Logo - moves to top on mobile */}
          <div className='flex flex-col order-2 md:order-none mb-4 md:mb-0'>
            <Image
              src='https://qtmkwwvomuvavuoaqjcn.supabase.co/storage/v1/object/public/ed-public/landing/text-cream.png'
              alt='text-logo'
              height={50}
              width={250}
              className='mx-auto md:mx-0' // Center on mobile, left align on desktop
            />
          </div>

          {/* Links - moves below logo on mobile */}
          <div className='flex flex-col gap-2 order-1 md:order-none'>
            {links.map(({ name, href }, index) => (
              <Link
                key={index}
                href={href}
                className='transition-transform duration-200 hover:translate-x-2 cursor-pointer text-center md:text-left' // Center on mobile, left align on desktop
              >
                {name}
              </Link>
            ))}
            <Link
              href={"/portal"}
              className='transition-transform duration-200 hover:translate-x-2 cursor-pointer text-center md:text-left'
            >
              Portal
            </Link>
          </div>
        </div>

        {/* Bottom text - remains the same */}
        <div className='flex flex-col md:flex-row py-4 mt-4 justify-between text-lg border-t-2 border-edcream'>
          <p className='text-center md:text-left mb-2 md:mb-0'>
            Pricacy Policy • Terms and conditions
          </p>
          <p className='text-center md:text-left'>Copied © Earlydoors</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
