import React from "react";
import Image from "next/image";
import { bebasFont } from "@/lib/font";

const BlogHero = () => {
  return (
    <section className='relative w-full h-[60vh] overflow-hidden bg-ednavy'>
      {/* Background image */}
      <Image
        src='https://qtmkwwvomuvavuoaqjcn.supabase.co/storage/v1/object/public/ed-public/landing/coffee2.jpg'
        alt='hero background'
        fill
        priority
        className='object-cover object-center'
      />

      {/* Optional overlay */}
      <div className='absolute inset-0 bg-black/30 z-10' />

      {/* Content + Nav */}
      <div className='relative z-20 flex flex-col h-full'>
        {/* Hero content */}
        <div className='flex flex-1 items-center justify-center text-edcream text-center px-6'>
          <div className='w-2/3'>
            <h2 className={`text-4xl font-bold mb-2 ${bebasFont.className}`}>
              Inside EarlyDoors: Design, Dev, and the Drive behind whatever this
              is going to be.
            </h2>
            <p className={`text-xl max-w-lg mx-auto mt-4`}>
              Posts on what’s under the hood, what’s coming next, and how fútbol
              culture shaped it all.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;
