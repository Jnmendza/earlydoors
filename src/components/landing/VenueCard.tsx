import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { IMAGE_PLACEHOLDER } from "@/constants/ui";

interface VenueCardProps {
  id: string;
  name: string;
  city: string;
  address: string;
  logo_url: string;
  website_url: string;
  google_maps_url: string;
  distance: string; // e.g. "100 meter"
  openUntil: string; // e.g. "Open till 6 pm"
  openMarkerKey: string | null;
  setOpenMarkerKey: (id: string | null) => void;
}

const VenueCard = ({
  id,
  name,
  logo_url,
  distance,
  openUntil,
  openMarkerKey,
  setOpenMarkerKey,
}: VenueCardProps) => {
  const isActive = id === openMarkerKey;

  return (
    <div
      className={cn(
        "flex items-center space-x-4 py-3 px-4 ",
        isActive
          ? "bg-edorange/10" // highlight when active
          : "hover:bg-edorange/10 cursor-pointer" // hover effect when not active
      )}
      onClick={() => setOpenMarkerKey(id)}
    >
      {/* Logo on the left (square, 48×48 or so) */}
      <div className='flex-shrink-0'>
        <Image
          src={logo_url?.trim() ? logo_url : IMAGE_PLACEHOLDER}
          alt={`${name} logo`}
          width={48}
          height={48}
          className='rounded-full bg-gray-100 object-cover'
        />
      </div>

      {/* Name + subtitle on the right */}
      <div className='flex flex-col justify-center text-left'>
        {/* 1st line: Name */}
        <h3 className='text-lg font-semibold text-gray-900'>{name}</h3>

        {/* 2nd line: distance (gray) + “Open till…” (blue) */}
        <div className='mt-1 flex space-x-2 text-sm'>
          <span className='text-gray-500'>{distance}</span>
          <span className='text-blue-600 font-medium'>{openUntil}</span>
        </div>
      </div>
    </div>
  );
};

export default VenueCard;
