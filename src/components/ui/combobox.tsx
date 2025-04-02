"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const clubs = [
  {
    value: "fc-barcelona",
    label: "FC Barcelona",
  },
  {
    value: "everton",
    label: "Everton",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

interface ComboBoxProps {
  selectPlaceholder: string;
  searchPlaceholder: string;
}

export function Combobox({
  searchPlaceholder,
  selectPlaceholder,
}: ComboBoxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size='lg'
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-full bg-transparent text-2xl justify-between border-b-2 border-l-0 border-r-0 border-t-0 border-ednavy rounded-none'
        >
          {value
            ? clubs.find((club) => club.value === value)?.label
            : selectPlaceholder}
          <ChevronsUpDown className='opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full p-0'>
        <Command>
          <CommandInput placeholder={searchPlaceholder} className='h-9' />
          <CommandList>
            <CommandEmpty>No clubs found.</CommandEmpty>
            <CommandGroup>
              {clubs.map((club) => (
                <CommandItem
                  key={club.value}
                  value={club.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {club.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === club.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
