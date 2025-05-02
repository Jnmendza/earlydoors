import React from "react";
import Image from "next/image";
import StatsCard from "./StatsCard";
import { InteractiveHoverButton } from "../magicui/interactive-hover-button";

const HeroSection = () => {
  return (
    <div className='relative h-screen w-full overflow-hidden'>
      {/* Split Screen Container */}
      <div className='flex h-full flex-col md:flex-row'>
        {/* Left Side - Image */}
        <div className='flex flex-col h-1/2 w-full items-center space-y-4 justify-center bg-edcream md:h-full md:w-1/2'>
          <div className='max-w-md px-8 py-12 md:px-12'>
            <h2 className='mb-4 text-3xl font-bold md:text-4xl'>
              Find Your Local
              <br />
              <span className='text-edorange'>Watch Party!</span> <br />
            </h2>
            <p className='mb-8 text-ednavy text-lg'>
              Discover where to watch your club with supporters near you.
            </p>

            <InteractiveHoverButton className='rounded-none text-edcream bg-edorange hover:bg-red-500'>
              Explore the Map
            </InteractiveHoverButton>
            <div className='mt-10'>
              <StatsCard />
            </div>
          </div>
        </div>

        {/* Right Side - Content */}

        <div className='relative h-1/2 w-full md:h-full md:w-1/2'>
          {/* Image */}
          <Image
            src='/assets/BeachDay.png'
            alt='Modern home'
            fill
            className='object-cover'
            priority
          />

          {/* Vignette Overlay */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/0' />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
