import React from "react";
import { Badge } from "../ui/badge";

interface TechIconProps {
  Icon: React.ElementType;
  label: string;
}

const TechIcon = ({ Icon, label }: TechIconProps) => {
  return (
    <div className='relative group flex flex-col items-center'>
      <Icon className='text-edcream' size={58} />

      <div className='absolute'>
        <Badge className='opacity-0 mt-18 group-hover:opacity-100 transition-opacity bg-edorange text-xl'>
          {label}
        </Badge>
      </div>
    </div>
  );
};

export default TechIcon;
