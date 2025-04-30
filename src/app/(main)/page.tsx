"use client";
import HomeSideBar from "@/components/landing/HomeSideBar";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("code")) {
      router.replace("/");
    }
  }, [searchParams, router]);
  return (
    <div className='grid grid-cols-[3.7fr_1fr] w-full h-screen'>
      {/* Image Side */}
      <div className='relative w-full h-full'>
        <Image
          src='/assets/BeachDay.png'
          alt='BeachDay'
          fill
          className='object-cover'
        />
      </div>

      {/* Sidebar Side */}
      <div className='relative overflow-visible flex justify-end'>
        <HomeSideBar />
      </div>
    </div>
  );
}
