"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const quotes = [
  {
    quote:
      "Just to let you know, these things only happen because of you. This is the super power of the club, you are the super power of the club.",
    author: "- Jurgen Klopp",
  },
  {
    quote:
      "Right from the start as a manager I tried to show that the fans are the people that matter. You’ve got to know how to treat them (and) have them on your side.",
    author: "- Bill Shankly",
  },
  {
    quote:
      "Football is a game of passion, and the fans are the heart of that passion.",
    author: "- Pep Guardiola",
  },
];

const QuoteSection = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className='w-full bg-ednavy'>
      <div className='flex flex-col md:flex-row h-auto md:h-[500px]'>
        {/* ─── Left: Pub Image ───────────────────────────────────────────────────── */}
        <div className='relative w-full md:w-1/2 h-64 md:h-full'>
          <Image
            src='https://i.imghippo.com/files/FnK7532MM.png'
            alt='Fans celebrating in a cozy pub'
            fill
            className='object-cover'
          />
        </div>

        {/* ─── Right: Quote Text ─────────────────────────────────────────────────── */}
        <div className='w-full md:w-1/2 bg-ednavy flex items-center justify-center p-8'>
          <AnimatePresence mode='wait'>
            <motion.blockquote
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className='max-w-xl text-center'
            >
              <p className='text-2xl md:text-3xl font-serif italic text-edcream leading-snug'>
                “{quotes[currentIndex].quote}”
              </p>
              <cite className='block mt-4 text-lg font-semibold text-edorange'>
                {quotes[currentIndex].author}
              </cite>
            </motion.blockquote>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
