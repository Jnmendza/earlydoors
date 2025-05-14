import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IMAGE_PLACEHOLDER } from "@/constants/ui";

interface VenueCardProps {
  id: string;
  name: string;
  address: string;
  city: string;
  website_url: string;
  logo_url: string;
  google_maps_url: string;
  openMarkerKey: string | null;
  setOpenMarkerKey: (id: string | null) => void;
}

const VenueCard = ({
  id,
  name,
  address,
  city,
  website_url,
  logo_url,
  google_maps_url,
  openMarkerKey,
  setOpenMarkerKey,
}: VenueCardProps) => {
  const isActive = id === openMarkerKey;
  return (
    <div
      className={cn(
        "border-2 border-solid p-4",
        isActive
          ? "border-ednavy bg-edorange/10"
          : "border-edorange cursor-pointer hover:bg-edorange/10"
      )}
      onClick={() => setOpenMarkerKey(id)}
    >
      <div className='flex space-x-4'>
        <Image
          src={logo_url?.trim() ? logo_url : IMAGE_PLACEHOLDER}
          alt='logo'
          height={70}
          width={70}
        />
        <h1 className='text-lg font-bold'>{name}</h1>
      </div>
      <div className='mt-4'>
        <p>
          {address}, {city}
        </p>
        <div className='flex items-center space-x-2'>
          <Link className='hover:text-edorange' href={website_url}>
            Website
          </Link>
          <span className='text-edorange text-xl'>•</span>
          <Link className='hover:text-edorange' href={google_maps_url}>
            Directions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VenueCard;
