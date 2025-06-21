import React from "react";
import TechStackSection from "@/components/landing/TechStackSection";
import { bebasFont } from "@/lib/font";
import Image from "next/image";
import WhatsNext from "@/components/landing/ WhatsNext";

const AboutUs = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className='relative h-[60vh] md:h-screen w-full overflow-hidden'>
        <div className='absolute inset-0 z-0'>
          <Image
            src={
              "https://qtmkwwvomuvavuoaqjcn.supabase.co/storage/v1/object/public/ed-public/landing/beach_match.png"
            }
            alt='beachday'
            fill
            className='object-cover'
            priority
          />
          <div className='absolute inset-0 bg-ednavy/20' />
        </div>
        <div className='relative text-white z-10 flex flex-col items-center justify-center h-full text-center px-4'>
          <h1
            className={`${bebasFont.className} text-3xl sm:text-5xl md:text-6xl text-center max-w-2xl`}
          >
            Bringing San Diego&apos;s Fútbol Community Together
          </h1>
        </div>
      </div>

      {/* Me section */}
      <div className='flex flex-col md:flex-row items-center justify-center bg-ednavy text-white w-full p-4 md:p-10 gap-6 md:gap-0'>
        <div className='flex flex-col items-center border-2 border-edorange p-4 mb-4 md:mb-0 md:mr-10 w-full max-w-xs'>
          <Image
            src='https://qtmkwwvomuvavuoaqjcn.supabase.co/storage/v1/object/public/ed-public/landing/fan.jpg'
            alt='profile-image'
            width={250}
            height={250}
            className='rounded'
            style={{ objectFit: "cover" }}
          />
          <p className='mt-4 text-center text-sm md:text-base'>
            What AI thinks I look like
          </p>
        </div>
        <div className='w-full md:w-1/3'>
          <h1
            className={`${bebasFont.className} text-3xl sm:text-5xl md:text-6xl text-edorange`}
          >
            About the Guy Behind the Code
          </h1>
          <p className='text-base sm:text-lg md:text-xl mt-4 md:mt-6'>
            Hey, I&apos;m Jonathan — a front-end engineer from San Diego with a
            love for fútbol, design, and building experiences that bring people
            together. I created EarlyDoors as both a personal project and a love
            letter to my city&apos;s vibrant matchday culture.
          </p>
        </div>
      </div>

      <WhatsNext />

      {/* Tech stack section */}
      <div className='flex flex-col-reverse md:flex-row h-full justify-between mt-8 gap-8 md:gap-0'>
        <TechStackSection />
        <div
          className={`relative flex flex-col justify-center w-full md:w-1/4 md:mr-8 ${bebasFont.className} text-2xl sm:text-3xl md:text-4xl mt-4 md:mt-0`}
        >
          <span className='self-start'>The</span>
          <div className='relative w-full h-12 sm:h-20 md:h-24 lg:h-32'>
            <Image
              src='https://qtmkwwvomuvavuoaqjcn.supabase.co/storage/v1/object/public/ed-public/landing/ED_Text.png'
              alt='text-logo'
              fill
              className='object-contain'
            />
          </div>
          <span className='self-end'>Formation</span>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
