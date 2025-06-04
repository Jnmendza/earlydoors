import React from "react";
import { bebasFont } from "@/lib/font";
import { links } from "@/data/Links";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className='flex justify-center bg-edorange '>
      <div
        className={`flex flex-col w-3/4 py-6 h-[350px] text-3xl text-edcream ${bebasFont.className}`}
      >
        <div className='flex justify-between'>
          {/* Left */}
          <div className='flex flex-col gap-2'>
            {links.map(({ name, href }, index) => (
              <Link
                key={index}
                href={href}
                className='transition-transform duration-200 hover:translate-x-2 cursor-pointer'
              >
                {name}
              </Link>
            ))}
            <Link
              href={"/portal"}
              className='transition-transform duration-200 hover:translate-x-2 cursor-pointer'
            >
              Portal
            </Link>
          </div>
          {/* Right  */}
          <div className='flex flex-col'>
            <Image
              src='https://i.imghippo.com/files/bifr4251GUs.png'
              alt='text-logo'
              height={50}
              width={250}
            />
          </div>
        </div>
        <div className='flex py-4 mt-4 justify-between text-lg border-t-2 border-edcream'>
          <p>Pricacy Policy • Terms and conditions</p>
          <p>Copied © Earlydoors</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
