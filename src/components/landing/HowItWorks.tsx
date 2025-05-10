import { bebasFont } from "@/lib/font";
import React from "react";
import { Separator } from "../ui/separator";
import ContentCard from "./ContentCard";
import pickYourClubImage from "../../../public/assets/pickyourclub.jpg";
import venuesNearYouImage from "../../../public/assets/venuesnearyou.jpg";
import watchPartyImage from "../../../public/assets/watchparty.jpg";
import { Volleyball, School, PartyPopper } from "lucide-react";
import { StaticImageData } from "next/image";

export type Step = {
  image: StaticImageData;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  desc: string;
};

const HowItWorks = () => {
  const steps: Step[] = [
    {
      image: pickYourClubImage,
      Icon: Volleyball,
      title: "Pick Your Club",
      desc: "Choose from the top leagues or local clubs.",
    },
    {
      image: venuesNearYouImage,
      Icon: School,
      title: "See Venues Near You",
      desc: "Browse a real-time map for local watch parties",
    },
    {
      image: watchPartyImage,
      Icon: PartyPopper,
      title: "Join the Watch Party",
      desc: "Show up & chant with your people",
    },
  ];
  return (
    <section>
      <div className='flex items-end justify-between mx-auto max-w-2/3 py-10'>
        <div>
          <p className={`${bebasFont.className} text-lg tracking-widest`}>
            How it works
          </p>
          <div className=' mt-4 text-2xl'>
            <p>Your Gateway To Local </p>
            <p className='text-edorange'>Matchday Experience</p>
          </div>
        </div>

        <div className='flex w-2/3 justify-end items-end gap-4 h-20'>
          <Separator orientation='vertical' className='bg-edorange h-10' />
          <p className='text-lg max-w-[80%]'>
            Find where your favorite clubs and supporters gather. Search by club
            or venue. Whether you&apos;re a diehard or new fan, join the
            matchday community.
          </p>
        </div>
      </div>
      <div className='mx-auto flex max-w-2/3 py-6 space-x-6'>
        {steps.map(({ image, Icon, title, desc }, index) => (
          <ContentCard
            key={index}
            image={image}
            Icon={Icon}
            title={title}
            desc={desc}
          />
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
