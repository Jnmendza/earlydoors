import React from "react";
import TechStackSection from "@/components/TechStackSection";
import { bebasFont } from "@/lib/font";
import Image from "next/image";
import WhatsNext from "@/components/ WhatsNext";

const AboutUs = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className='flex flex-col items-center mt-20'>
        <h1 className={`text-4xl text-edorange text-center w-xl`}>
          Bringing San Diego&apos;s Fútbol Community Together
        </h1>
        <h4 className={`${bebasFont.className} text-2xl mt-4`}>
          Link up with San Diego&apos;s Loudest Supporters -- MatchDay Starts
          Now!
        </h4>
        <div className='absolute top-1/2 left-1/6 transform -translate-y-1/2 -translate-x-1/2 -rotate-25'>
          <Image
            src='/assets/ticket.png'
            alt='ticket'
            width={200}
            height={200}
          />
        </div>
      </div>
      {/* Me section */}
      <div className='flex gap-x-16 items-center justify-center ml-48'>
        <div>
          <p className='text-xl w-[400px]'>
            Hey, I&apos;m Jon — a front-end engineer from San Diego with a love
            for fútbol, design, and building experiences that bring people
            together. I created EarlyDoors as both a personal project and a love
            letter to my city’s vibrant matchday culture.
          </p>
        </div>
        <div className='rotate-10 drop-shadow-xl ml-32 mt-10'>
          <Image
            src='/assets/PubScarf.png'
            alt='scarf'
            width={250}
            height={450}
          />
        </div>
      </div>

      {/* Tech stack section */}
      <div className='flex h-full justify-between'>
        <TechStackSection />
        <div
          className={`flex flex-col justify-center w-1/4 mr-8 ${bebasFont.className} text-4xl`}
        >
          <span className='self-start'>The</span>
          <Image
            src='/assets/ED_Text.png'
            alt='text-logo'
            width={340}
            height={80}
          />
          <span className='self-end'>Formation</span>
        </div>
      </div>

      {/* Whats next section */}
      <WhatsNext />
    </div>
  );
};

export default AboutUs;
