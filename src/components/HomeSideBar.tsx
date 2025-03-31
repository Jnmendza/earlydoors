import { bebasFont } from "@/lib/font";
import Image from "next/image";
import React from "react";

const HomeSideBar = () => {
  return (
    <div className='flex flex-col items-end justify-center p-6 relative'>
      <div className='absolute -top-16 right-3'>
        <Image
          src='/assets/logo-main.png'
          alt='SideBar'
          width={250}
          height={250}
          className='object-contain'
        />
      </div>

      {/* Other content */}
      <div className='text-5xl flex flex-col items-end justify-center mt-48'>
        <h3>Your Club.</h3>
        <h3>
          Your City<span className='text-edorange'>.</span>
        </h3>
        <h3>
          Your Spot<span className='text-edgreen'>.</span>
        </h3>
      </div>

      <div>
        <p
          className={`${bebasFont.className} text-2xl w-[190px] text-edorange mt-4 text-right`}
        >
          Link up with SD’s loudest supporters — matchday starts now!
        </p>
      </div>

      <button className='px-8 py-2 cursor-pointer bg-edgreen mt-4 w-full'>
        <span className={`relative text-edcream ${bebasFont.className}`}>
          View Events
        </span>
      </button>
    </div>
  );
};

export default HomeSideBar;
