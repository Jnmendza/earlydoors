"use client";
import React, { useState } from "react";
import Image from "next/image";
import { GrNext, GrPrevious } from "react-icons/gr";
import { bebasFont } from "@/lib/font";
import { content } from "@/data/AboutusContent";

const WhatsNext = () => {
  const LAST_INDEX = content.length - 1;
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () =>
    setCurrentIndex((prev) => (prev === LAST_INDEX ? 0 : prev + 1));
  const prev = () =>
    setCurrentIndex((prev) => (prev === 0 ? LAST_INDEX : prev - 1));

  return (
    <section className='max-w-5xl mx-auto mt-8 flex flex-col md:flex-row rounded-lg overflow-visible h-auto md:h-[500px]'>
      {/* Text Section */}
      <div className='w-full md:w-1/2 p-4 sm:p-6 text-ednavy flex flex-col justify-center'>
        <h1 className={`${bebasFont.className} text-3xl sm:text-5xl`}>
          What&apos;s Next?
        </h1>
        <h3 className='text-edorange text-2xl sm:text-3xl mt-4 sm:mt-6'>
          {content[currentIndex].title}
        </h3>
        <p className='text-base sm:text-xl mt-2'>
          {content[currentIndex].subTitle}
        </p>
      </div>

      {/* Image + Arrows Section */}
      <div className='w-full md:w-1/2 flex flex-col items-center justify-center p-4'>
        <div className='flex-1 flex items-center justify-center w-full h-48 sm:h-full overflow-visible'>
          <Image
            // src={`/assets/next${currentIndex}.jpg`}
            src={content[currentIndex].imagePath}
            alt='upcoming-feature'
            width={300}
            height={300}
            className='rounded-md w-full max-w-xs sm:max-w-none object-contain h-full'
          />
        </div>
        <div className='flex gap-6 mt-6 sm:mt-8'>
          <button onClick={prev} aria-label='Previous' className='text-2xl'>
            <GrPrevious />
          </button>
          <button onClick={next} aria-label='Next' className='text-2xl'>
            <GrNext />
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhatsNext;
