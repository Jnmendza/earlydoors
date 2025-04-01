import React from "react";
import { bebasFont } from "@/lib/font";
import { links } from "@/data/Links";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <div className='flex justify-center bg-edorange '>
      <div
        className={`flex flex-col w-3/4 py-6 h-[300px] text-3xl text-edcream ${bebasFont.className}`}
      >
        <div className='flex justify-between'>
          {/* Left */}
          <div className='flex flex-col gap-2'>
            {links.map(({ name, href }, index) => (
              <Link key={index} href={href}>
                {name}
              </Link>
            ))}
          </div>
          {/* Right  */}
          <div className='flex flex-col'>
            <label>Join EarlyDoors newsletter</label>
            <input
              name='email'
              className='bg-edcream p-2 text-black/25'
              placeholder='Enter Email'
            />
            <Image
              className='mt-8'
              src='/assets/text-cream.png'
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
    </div>
  );
};

export default Footer;
