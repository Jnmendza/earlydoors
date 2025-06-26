import { useState } from "react";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandInput,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Club } from "@prisma/client";

interface MultiSelectProps {
  type: string;
  options: Club[];
  selectedOptions: string[];
  onChange: (ids: string[]) => void;
  onTouched?: () => void;
}

const MultiSelect = ({
  options,
  type,
  selectedOptions,
  onChange,
  onTouched,
}: MultiSelectProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleClub = (id: string) => {
    const updated = selectedOptions.includes(id)
      ? selectedOptions.filter((c) => c !== id)
      : [...selectedOptions, id];
    onChange(updated);
    onTouched?.();
  };
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className='w-full border p-2 rounded-none text-left text-sm text-gray-700'>
          {selectedOptions.length > 0
            ? "Selected: " + selectedOptions.length
            : `Select ${type}`}
        </PopoverTrigger>
        <PopoverContent className='w-[300px] p-0'>
          <Command>
            <CommandInput placeholder={`Search ${type}...`} />
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.id}
                  onSelect={() => toggleClub(option.id)}
                  className='flex items-center justify-between'
                >
                  {option.name}
                  <Checkbox checked={selectedOptions.includes(option.id)} />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Render selected as tags */}
      <div className='mt-2 flex flex-wrap gap-2'>
        {selectedOptions.map((id) => {
          const option = options.find((o) => o.id === id);
          return (
            <Badge key={id} variant='secondary' className='flex items-center'>
              {option?.name}
              <X
                className='ml-1 h-3 w-3 cursor-pointer'
                onClick={() => toggleClub(id)}
              />
            </Badge>
          );
        })}
      </div>
    </>
  );
};

export default MultiSelect;
