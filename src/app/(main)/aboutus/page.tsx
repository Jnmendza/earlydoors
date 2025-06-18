import React from "react";
import TechStackSection from "@/components/landing/TechStackSection";
import { bebasFont } from "@/lib/font";
import Image from "next/image";
import WhatsNext from "@/components/landing/ WhatsNext";

const AboutUs = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className='relative h-screen w-full overflow-hidden bg-ednavy'>
        <div
          className={`${bebasFont.className} absolute inset-0 z-0 flex flex-col justify-center overflow-hidden`}
        >
          <div className='w-[200%] -translate-x-1/4 opacity-30'>
            <h1 className='text-[250px] text-gray-700 text-stroke-1 whitespace-nowrap'>
              Gol! Goal! Golazo! Gol! Goal! Golazo!
            </h1>
            <h1 className='text-[250px] text-gray-700 text-stroke-1 whitespace-nowrap leading-[0.6]'>
              EarlyDoors EarlyDoors EarlyDoors
            </h1>
            <h1 className='text-[250px] text-gray-700 text-stroke-1 whitespace-nowrap '>
              Supporters Community Passion
            </h1>
          </div>
        </div>

        {/* Vignettes */}
        <div className='absolute left-0 top-0 h-full w-1/3 z-1 bg-gradient-to-r from-ednavy to-transparent pointer-events-none' />
        <div className='absolute right-0 top-0 h-full w-1/3 z-1 bg-gradient-to-l from-ednavy to-transparent pointer-events-none' />

        <div className='absolute inset-0 z-10 flex flex-col justify-center items-center text-center p-8 space-y-4'>
          <Image
            src={"/assets/BeachDay.png"}
            alt='beachday'
            fill
            className='object-contain'
          />
          <div className='flex space-x-10 mt-2 text-primary'></div>
        </div>
      </div>

      {/* Me section */}
      <div className='flex gap-x-16 items-center justify-center ml-48'>
        <div>
          <p className='text-xl w-[400px]'>
            Hey, I&apos;m Jonathan — a front-end engineer from San Diego with a
            love for fútbol, design, and building experiences that bring people
            together. I created EarlyDoors as both a personal project and a love
            letter to my city&apos;s vibrant matchday culture.
          </p>
        </div>
      </div>

      {/* Tech stack section */}
      <div className='flex h-full justify-between'>
        <TechStackSection />
        <div
          className={`relative flex flex-col justify-center w-1/4 mr-8 ${bebasFont.className} text-4xl`}
        >
          <span className='self-start'>The</span>
          <div className='relative w-full h-20 md:h-24 lg:h-32'>
            <Image
              src='/assets/ED_Text.png'
              alt='text-logo'
              fill
              className='object-contain'
            />
          </div>

          <span className='self-end'>Formation</span>
        </div>
      </div>

      {/* Whats next section */}
      <WhatsNext />
    </div>
  );
};

export default AboutUs;
