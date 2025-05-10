"use client";
import Image from "next/image";
import { Step } from "./HowItWorks";

const ContentCard = ({ image, Icon, title, desc }: Step) => {
  return (
    <div className='max-w-xs w-full group/card'>
      <div className='relative h-96 w-full overflow-hidden  shadow-xl'>
        <Image
          src={image}
          alt={title}
          fill
          className='object-cover'
          sizes='(max-width: 768px) 100vw, 320px'
        />

        <div className='absolute inset-0 bg-black/0 transition-all duration-300 group-hover/card:bg-black/60' />

        <div className='relative z-10 flex h-full flex-col justify-between p-6'>
          <div className='flex justify-start'>
            {Icon && (
              <Icon className='h-8 w-8 text-orange-500 transition-transform group-hover/card:scale-100' />
            )}
          </div>

          <div className='mt-auto'>
            <h1 className='text-2xl font-bold text-gray-50'>{title}</h1>
            <p className='mt-2 text-lg text-gray-50/90'>{desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
