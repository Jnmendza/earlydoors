"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import HeroSection from "@/components/landing/Hero";
import "@/styles/globals.css";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("code")) {
      router.replace("/");
    }
  }, [searchParams, router]);

  return (
    <div>
      <HeroSection />
      <div className='bg-edorange flex justify-evenly text-edcream py-4 text-2xl'>
        <h3>
          Your Club <span className='text-edcream text-5xl'>.</span>
        </h3>
        <h3>
          Your City <span className='text-ednavy text-5xl'>.</span>
        </h3>
        <h3>
          Your Spot <span className='text-edgreen text-5xl'>.</span>
        </h3>
      </div>
      <HowItWorks />
      <div className='bg-ednavy'>
        <Features />
      </div>
    </div>
  );
}
