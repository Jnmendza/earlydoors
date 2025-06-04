"use client";
import CtaSection from "@/components/landing/CtaSection";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";
import QuoteSection from "@/components/landing/QuoteSection";
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
    <>
      <HeroSection />
      <HowItWorks />
      <QuoteSection />
      <CtaSection />
    </>
  );
}
