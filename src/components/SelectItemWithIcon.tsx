import React from "react";
import { SelectItem } from "./ui/select";
import Image from "next/image";

interface SelectProps {
  teamId: string;
  teamLogoUrl: string;
  teamName: string;
}

const SelectItemWithIcon = ({ teamId, teamLogoUrl, teamName }: SelectProps) => {
  return (
    <SelectItem value={teamId}>
      <div className='flex items-center gap-2'>
        <Image
          src={teamLogoUrl}
          alt='logo'
          width={25}
          height={25}
          className='h-auto w-[30px]'
        />
        {teamName}
      </div>
    </SelectItem>
  );
};

export default SelectItemWithIcon;
