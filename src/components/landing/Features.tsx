import { bebasFont } from "@/lib/font";
import { cn } from "@/lib/utils";

import {
  FileTerminal,
  BadgeHelp,
  Heart,
  Spline,
  DollarSign,
  Cloud,
  Columns3,
  TrendingUpDown,
} from "lucide-react";
import { Separator } from "../ui/separator";

export default function FeaturesSectionDemo() {
  const features = [
    {
      title: "Built for developers",
      description:
        "Built for engineers, developers, dreamers, thinkers and doers.",
      icon: <FileTerminal />,
    },
    {
      title: "Ease of use",
      description:
        "It's as easy as using an Apple, and as expensive as buying one.",
      icon: <Spline />,
    },
    {
      title: "Pricing like no other",
      description:
        "Our prices are best in the market. No cap, no lock, no credit card required.",
      icon: <DollarSign />,
    },
    {
      title: "100% Uptime guarantee",
      description: "We just cannot be taken down by anyone.",
      icon: <Cloud />,
    },
    {
      title: "Multi-tenant Architecture",
      description: "You can simply share passwords instead of buying new seats",
      icon: <TrendingUpDown />,
    },
    {
      title: "24/7 Customer Support",
      description:
        "We are available a 100% of the time. Atleast our AI Agents are.",
      icon: <BadgeHelp />,
    },
    {
      title: "Money back guarantee",
      description:
        "If you donot like EveryAI, we will convince you to like us.",
      icon: <Columns3 />,
    },
    {
      title: "And everything else",
      description: "I just ran out of copy ideas. Accept my sincere apologies",
      icon: <Heart />,
    },
  ];

  return (
    <>
      <div className='flex items-end justify-between mx-auto max-w-2/3 py-10 text-edcream'>
        <div>
          <p
            className={`${bebasFont.className} text-lg tracking-widest text-edorange`}
          >
            Featured Clubs & Venues
          </p>
          <div className=' mt-4 text-2xl '>
            <p>Discover the most popular spots and fan clubs near you.</p>
          </div>
        </div>

        <div className='flex w-2/3 justify-end items-end gap-4 h-20'>
          <Separator orientation='vertical' className='bg-edorange h-10' />
          <p className='text-lg max-w-[80%]'>
            Where legends gather. Bars. Clubs. Pure passion. San Diego’s top
            football hangouts — no bandwagon fans.
          </p>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10  max-w-2/3 mx-auto'>
        {features.map((feature, index) => (
          <Feature key={feature.title} {...feature} index={index} />
        ))}
      </div>
    </>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  p-4 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className='opacity-0  transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none' />
      )}
      {index >= 4 && (
        <div className='opacity-0 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none' />
      )}
      <div className='mb-4 relative z-10 px-10 text-edorange dark:text-edorange'>
        {icon}
      </div>
      <div className='text-lg font-bold mb-2 relative z-10 px-10'>
        <div className='absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-edorange transition-all duration-200 origin-center' />
        <span className='group-hover/feature:translate-x-2 transition duration-200 inline-block text-edcream dark:text-neutral-100'>
          {title}
        </span>
      </div>
      <p className='text-sm text-edcream dark:text-neutral-300 max-w-xs relative z-10 px-10'>
        {description}
      </p>
    </div>
  );
};
