"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";

const CtaSection = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    className='flex flex-col items-center text-center text-ednavy py-12'
    style={{
      backgroundImage:
        "url(https://www.transparenttextures.com/patterns/dark-stripes-light.png)",
    }}
  >
    <Image
      src='https://qtmkwwvomuvavuoaqjcn.supabase.co/storage/v1/object/public/ed-public/landing/ticket.png'
      alt='ticket'
      width={200}
      height={200}
    />

    <h2 className='text-3xl  font-bold mb-2'>
      Ready to Find Your Matchday Venue?
    </h2>
    <p className='text-xl mb-4'>
      EarlyDoors helps you claim your spot before kickoff
    </p>

    <Button
      size={"lg"}
      className='bg-edorange text-xl font-semibold mb-8 hover:bg-ednavy'
      asChild
    >
      <Link href={"/events"}>Search Now</Link>
    </Button>
  </motion.div>
);

export default CtaSection;
