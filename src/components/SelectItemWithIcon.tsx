import React from "react";
import { SelectItem } from "./ui/select";
import Image from "next/image";

interface SelectProps {
  clubId: string;
  clubLogoUrl: string;
  clubName: string;
}

const SelectItemWithIcon = ({ clubId, clubLogoUrl, clubName }: SelectProps) => {
  return (
    <SelectItem value={clubId}>
      <div className='flex items-center gap-2'>
        <Image
          src={clubLogoUrl}
          alt='logo'
          width={25}
          height={25}
          className='h-auto w-[30px]'
        />
        {clubName}
      </div>
    </SelectItem>
  );
};

export default SelectItemWithIcon;
