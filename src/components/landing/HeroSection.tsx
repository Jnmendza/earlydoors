import React from "react";
import Image from "next/image";
import { bebasFont } from "@/lib/font";
import SearchBar from "./SearchBar";

const HeroSection = () => {
  return (
    <div className='relative h-screen w-full'>
      {/* ─── Background Image ───────────────────────────────────────────────────── */}
      <div className='absolute inset-0'>
        <Image
          src='https://qtmkwwvomuvavuoaqjcn.supabase.co/storage/v1/object/public/ed-public/landing/hero_bg.png'
          alt='Football fans cheering in a pub'
          fill
          className='object-cover w-auto h-auto'
        />
      </div>

      {/* ─── Overlay Content ────────────────────────────────────────────────────── */}
      <div className='relative top-20 z-10 flex flex-col items-center justify-center h-full text-center px-4'>
        {/* Heading */}
        <Image
          src='https://qtmkwwvomuvavuoaqjcn.supabase.co/storage/v1/object/public/ed-public/landing/logo-main.png'
          alt='logo'
          width={150}
          height={150}
        />
        <h1
          className={`${bebasFont.className} text-5xl sm:text-6xl md:text-7xl text-white font-bold leading-tight max-w-3xl`}
        >
          Find Your Football Tribe
        </h1>

        {/* Subheading */}
        <p className='text-lg sm:text-xl md:text-2xl text-gray-200 mt-4 max-w-2xl'>
          Discover local pubs where fans gather to cheer—from Premier League to
          La Liga, MLS and beyond.
        </p>

        {/* Search Bar */}
        <div className='mt-8 w-full max-w-lg px-2'>
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
