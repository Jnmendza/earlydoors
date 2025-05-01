import Image from "next/image";
import React from "react";
import { AspectRatio } from "../ui/aspect-ratio";

import { Button } from "../ui/button";
import { bebasFont } from "@/lib/font";
import { FlipText } from "../magicui/flip-text";
import StatsCard from "./StatsCard";

const HeroSection = () => {
  return (
    <section className='text-center'>
      <div className='relative mx-auto max-w-4xl'>
        <AspectRatio ratio={16 / 9}>
          <Image
            src='/assets/BeachDay.png'
            alt='BeachDay'
            fill
            className='object-cover'
          />
          <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(0,0,0,0.7)_70%)]'></div>
          <div className='absolute inset-0 flex flex-col items-center justify-center text-white space-y-8'>
            <div className='[&>*]:drop-shadow-lg'>
              <FlipText className={`${bebasFont.className} text-4xl`}>
                Find Your Local Watch Party
              </FlipText>
              <h3 className='text-xl'>
                Discover where to watch your club with supporters near you
              </h3>
            </div>
            <Button className='bg-edorange text-edcream'>
              Explore the map
            </Button>
          </div>
        </AspectRatio>
      </div>
      <div className='mx-auto max-w-4xl'>
        <StatsCard />
      </div>
    </section>
  );
};

export default HeroSection;
