"use client";

import React, { useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useClubStore } from "@/store/club-store";
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
import { useVenueStore } from "@/store/venue-store";

interface ComboBoxProps {
  selectPlaceholder: string;
  searchPlaceholder: string;
}

export function Combobox({
  searchPlaceholder,
  selectPlaceholder,
}: ComboBoxProps) {
  const { fetchClubs, clubs } = useClubStore();
  const { setClubId } = useVenueStore();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  useEffect(() => {
    fetchClubs();
  }, [fetchClubs]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size='lg'
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className=' bg-transparent text-xl text-edcream justify-between  border-l-0 border-r-0 border-t-0 border-ednavy rounded-none'
        >
          {value
            ? clubs.find((club) => club.name === value)?.name
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
                  key={club.name}
                  value={club.name}
                  onSelect={(currentValue) => {
                    const matchedClub = clubs.find(
                      (club) => club.name === currentValue
                    );
                    if (matchedClub) setClubId(matchedClub.id);
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {club.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === club.name ? "opacity-100" : "opacity-0"
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
