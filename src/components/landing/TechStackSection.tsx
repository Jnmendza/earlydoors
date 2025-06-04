import React from "react";
import {
  SiNextdotjs,
  SiTypescript,
  SiSupabase,
  SiTailwindcss,
  SiShadcnui,
  SiSanity,
  SiFigma,
  SiAdobeillustrator,
  SiGooglemaps,
  SiAdobephotoshop,
} from "react-icons/si";

const TechStackSection = () => {
  return (
    <div
      className='relative bg-edgreen overflow-hidden w-2/3 h-[500px]'
      style={{
        backgroundImage:
          "url(https://www.transparenttextures.com/patterns/football-no-lines.png)",
      }}
    >
      {/* Field Markings */}
      <div className='absolute inset-0'>
        {/* Center circle */}
        <div className='absolute top-1/2 -right-1/6 w-[28%] aspect-square rounded-full border-2 border-white transform -translate-y-1/2'></div>

        {/* Penalty area */}
        <div className='absolute top-1/2 left-0 w-[15%] h-[50%] border-t-2 border-b-2 border-r-2 border-white transform -translate-y-1/2'></div>

        {/* Goal area */}
        <div className='absolute top-1/2 left-0 w-[10%] h-[25%] border-t-2 border-b-2 border-l-2 border-r-2 border-white transform -translate-y-1/2 -translate-x-1/2'></div>

        {/* Goals */}
        <div className='absolute top-1/2 left-0 h-[15%] w-[1%] bg-white transform -translate-y-1/2 -translate-x-1/2'></div>
      </div>

      {/* Icons  */}
      <div className='grid grid-cols-3 h-full place-items-center'>
        <div className='flex flex-col items-center justify-center gap-16'>
          <SiNextdotjs className='text-edcream' size={58} />
          <SiGooglemaps className='text-edcream' size={58} />
          <SiSanity className='text-edcream' size={58} />
          <SiSupabase className='text-edcream' size={58} />
        </div>
        <div className='flex flex-col items-center justify-center gap-16'>
          <SiShadcnui className='text-edcream' size={58} />
          <SiTypescript className='text-edcream' size={58} />
          <SiTailwindcss className='text-edcream' size={58} />
        </div>
        <div className='flex flex-col items-center justify-center gap-16'>
          <SiAdobeillustrator className='text-edcream' size={58} />
          <SiFigma className='text-edcream' size={58} />
          <SiAdobephotoshop className='text-edcream' size={58} />
        </div>
      </div>
    </div>
  );
};

export default TechStackSection;
