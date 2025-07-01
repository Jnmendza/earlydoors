import React from "react";
import { SelectItem } from "./ui/select";
import Image from "next/image";

interface SelectProps {
  id: string;
  logoUrl: string;
  value: string;
}

const SelectItemWithIcon = ({ id, logoUrl, value }: SelectProps) => {
  return (
    <SelectItem value={id}>
      <div className='flex items-center gap-2'>
        <Image
          src={logoUrl}
          alt='logo'
          width={25}
          height={25}
          className='h-auto w-[30px]'
        />
        {value}
      </div>
    </SelectItem>
  );
};

export default SelectItemWithIcon;
