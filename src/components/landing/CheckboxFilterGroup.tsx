import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { FilterOption } from "@/types/types";

interface Props {
  filterOptions: FilterOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export const CheckboxFilterGroup = ({
  filterOptions,
  selected,
  onChange,
}: Props) => {
  const toggleValue = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className='flex space-x-4'>
      {filterOptions.map(({ label, value }, idx) => (
        <div key={idx} className='flex items-center space-x-2'>
          <CheckboxPrimitive.Root
            id={value}
            checked={selected.includes(value)}
            onCheckedChange={() => toggleValue(value)}
            className={cn(
              "h-4 w-4 rounded border border-input bg-background shadow transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            )}
          >
            <CheckboxPrimitive.Indicator className='flex items-center justify-center'>
              <CheckIcon className='h-4 w-4' />
            </CheckboxPrimitive.Indicator>
          </CheckboxPrimitive.Root>
          <Label
            className='text-md flex-1 whitespace-nowrap text-edcream'
            htmlFor={value}
          >
            {label}
          </Label>
        </div>
      ))}
    </div>
  );
};
