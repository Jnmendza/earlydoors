import CtaSection from "@/components/landing/CtaSection";
import FeaturedLeagues from "@/components/landing/FeaturedLeagues";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";
import QuoteSection from "@/components/landing/QuoteSection";
import { Suspense } from "react";
import SearchParamRedirect from "@/components/landing/SearchParamRedirect";

export default function Home() {
  return (
    <>
      <Suspense fallback={null}>
        <SearchParamRedirect />
      </Suspense>
      <HeroSection />
      <HowItWorks />
      <FeaturedLeagues />
      <QuoteSection />
      <CtaSection />
    </>
  );
}
