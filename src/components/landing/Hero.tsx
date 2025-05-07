"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import StatsCard from "./StatsCard";
import { InteractiveHoverButton } from "../magicui/interactive-hover-button";
import { useRouter } from "next/navigation";
import { useClubStore } from "@/store/club-store";
import { bebasFont } from "@/lib/font";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  const router = useRouter();
  const { clubs, fetchClubs } = useClubStore();
  const [selectedClub, setSelectedClub] = useState<string>("");

  useEffect(() => {
    fetchClubs();
  }, [fetchClubs]);

  const handleSearch = () => {
    if (selectedClub) {
      router.push(`/events?club=${selectedClub}`);
    } else {
      router.push("/events");
    }
  };

  const bounceAnimation = {
    y: [0, -5, 0],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatDelay: 5,
      ease: "easeInOut",
    },
  };

  return (
    <div className='relative h-screen w-full overflow-hidden'>
      {/* Vertical Split Container */}
      <div className='flex h-full flex-col'>
        {/* Top Section - Content (Former Left Side) */}
        <div className='grid grid-cols-3 gap-4 bg-edcream px-10 md:h-1/2'>
          <div className='col-span-2 px-8 py-12 text-6xl md:px-12'>
            <h1 className='mb-4 font-bold'>Find Your Local</h1>
            <h1 className='text-edorange mt-6 font-bold'>Watch Party!</h1>

            <div className='mt-10'>
              <StatsCard />
            </div>
          </div>

          <div className='mt-10 z-100'>
            <p className='mb-8 text-lg text-ednavy '>
              Discover where to watch your club with supporters near you.
              Discover where to watch your club with supporters near you.
              Discover where to watch your club with supporters near you.
            </p>

            {/* Form */}
            <motion.div
              initial={{ y: 0 }}
              animate={bounceAnimation}
              className='flex flex-col max-w-2/3 -mb-10 space-y-4 bg-edcream p-6 shadow-lg'
            >
              <h3 className={`${bebasFont.className} text-ednavy text-lg`}>
                Find your next watch party
              </h3>
              <div className='relative'>
                <input
                  type='text'
                  id='location'
                  value='San Diego, CA'
                  readOnly
                  className='w-full p-2 pt-6 bg-gray-100 border border-gray-300 rounded-none text-ednavy cursor-not-allowed peer'
                />
                <label
                  htmlFor='location'
                  className='absolute left-2 top-1 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm'
                >
                  Location
                </label>
              </div>

              {/* Club Dropdown with Floating Label */}
              <div className='relative border-2 border-edorange'>
                <select
                  id='club'
                  value={selectedClub}
                  onChange={(e) => setSelectedClub(e.target.value)}
                  className='w-full p-2 pt-6 border border-gray-300 rounded-none text-ednavy appearance-none peer'
                >
                  <option value=''></option>
                  {clubs.map((club) => (
                    <option key={club.id} value={club.id}>
                      {club.name}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor='club'
                  className='absolute left-2 top-1 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:text-xs peer-focus:top-1'
                >
                  Club
                </label>
                <ChevronDown
                  className='pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-ednavy transition-colors peer-focus:text-edorange'
                  aria-hidden='true'
                />
              </div>

              {/* Search Button */}
              <InteractiveHoverButton
                className='rounded-none bg-edorange text-edcream hover:bg-red-500'
                onClick={handleSearch}
              >
                Search Now
              </InteractiveHoverButton>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section - Image (Former Right Side) */}
        <div className='relative h-1/2 w-full md:h-1/2'>
          <Image
            src='/assets/BeachDay.png'
            alt='Soccer watch party'
            fill
            className='object-cover'
            priority
          />
          {/* Vignette Overlay - Adjusted for top-to-bottom fade */}
          <div className='absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/0' />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
