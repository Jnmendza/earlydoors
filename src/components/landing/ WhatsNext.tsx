"use client";
import React, { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { GrNext, GrPrevious } from "react-icons/gr";
import { bebasFont } from "@/lib/font";
import { content } from "@/data/aboutuscontent";
import Image from "next/image";

const WhatsNext = () => {
  const LAST_INDEX = content.length - 1;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const next = () => {
    setCurrentIndex((prev) => (prev === LAST_INDEX ? 0 : prev + 1));
  };
  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? LAST_INDEX : prev - 1));
  };
  return (
    <ResizablePanelGroup
      direction='horizontal'
      className='max-w-md rounded-lg border md:min-w-2/3 flex mx-auto mt-4'
    >
      <ResizablePanel defaultSize={50}>
        <div className='flex flex-col items-start h-[500px] justify-center p-6 text-ednavy'>
          <h1 className={`${bebasFont.className} text-5xl `}>
            What&apos;s Next?
          </h1>
          <div className='mt-6'>
            <h3 className='text-edorange text-3xl'>
              {content[currentIndex].title}
            </h3>
            <p className='text-xl mt-2'>{content[currentIndex].subTitle}</p>
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
  );
};

export default WhatsNext;
