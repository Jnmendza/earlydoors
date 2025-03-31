"use client";
import React, { useState } from "react";
import TechStackSection from "@/components/TechStackSection";
import { bebasFont } from "@/lib/font";
import Image from "next/image";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { GrNext, GrPrevious } from "react-icons/gr";

type NextText = {
  title: string;
  subTitle: string;
  imagePath: string;
};

const content: NextText[] = [
  {
    title: "User RSVPs",
    subTitle:
      "Claim your spot at the bar—because great matches deserve packed houses.",
    imagePath: "next1.jpg",
  },
  {
    title: "Merch Store",
    subTitle:
      "Wear your colors—scarves, tees, and pint glasses that scream ‘I run with the crew’.",
    imagePath: "next2.jpg",
  },
  {
    title: "Supporter Leaderboards",
    subTitle:
      "Earn stripes for hosting, cheering, and (responsibly) shotgunning.",
    imagePath: "next3.jpg",
  },
  {
    title: "Community-Submitted Watch Parties",
    subTitle:
      "From backyard projectors to dive bar takeovers—powered by fans like you.",
    imagePath: "next4.jpg",
  },
  {
    title: "Live Match Data",
    subTitle:
      "Real-time stats, heatmaps, and fan chatter—all without leaving your stool.",
    imagePath: "next5.jpg",
  },
];

const AboutUs = () => {
  const LAST_INDEX = content.length - 1;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  console.log(currentIndex);
  const next = () => {
    setCurrentIndex((prev) => (prev === LAST_INDEX ? 0 : prev + 1));
  };
  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? LAST_INDEX : prev - 1));
  };

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
        <div className='absolute top-55 left-20 transform -rotate-25'>
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
      <ResizablePanelGroup
        direction='horizontal'
        className='max-w-md rounded-lg border md:min-w-2/3 flex mx-auto mt-4'
      >
        <ResizablePanel defaultSize={50}>
          <div className='flex flex-col items-start h-[500px] justify-center p-6'>
            <h1 className={`${bebasFont.className} text-5xl text-ednavy`}>
              What&apos;s Next?
            </h1>
            <div className='mt-4'>
              <h3 className='text-edorange text-3xl'>
                {content[currentIndex].title}
              </h3>
              <p>{content[currentIndex].subTitle}</p>
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction='vertical'>
            <ResizablePanel defaultSize={75}>
              <div className='flex h-full items-center justify-center p-6'>
                <Image
                  src={`/assets/next${currentIndex}.jpg`}
                  alt='upcoming-features'
                  height={500}
                  width={250}
                />
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={25}>
              <div className='flex h-full items-center justify-center p-6'>
                <span className='cursor-pointer' onClick={prev}>
                  <GrPrevious />
                </span>
                <span className='cursor-pointer' onClick={next}>
                  <GrNext />
                </span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default AboutUs;
