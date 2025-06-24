"use client";

import React, { useEffect } from "react";
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
import { useClubStore } from "@/store/club-store";
import { Status } from "@prisma/client";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(""); // This will store the club ID
  const { clubs, fetchClubs } = useClubStore();
  const approvedClubs = clubs.filter((c) => c.status === Status.APPROVED);

  useEffect(() => {
    if (clubs.length === 0) {
      fetchClubs();
    }
  }, [clubs.length, fetchClubs]);

  const handleSearch = () => {
    if (selectedId) router.push(`/events?clubId=${selectedId}`);
  };

  // Find the selected club
  const selectedClub = approvedClubs.find((club) => club.id === selectedId);

  return (
    <div className='flex justify-center'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className='w-5/6 justify-between h-[48px] rounded-none'
          >
            {selectedClub ? selectedClub.name : "Select club..."}
            <ChevronsUpDown className='opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[360px] p-0'>
          <Command>
            <CommandInput placeholder='Search...' className='h-9' />
            <CommandList>
              <CommandEmpty>No clubs found.</CommandEmpty>
              <CommandGroup>
                {approvedClubs.map((club) => (
                  <CommandItem
                    key={club.id} // Use id as key for better uniqueness
                    value={club.id}
                    onSelect={(currentValue) => {
                      setSelectedId(
                        currentValue === selectedId ? "" : currentValue
                      );
                      setOpen(false);
                    }}
                  >
                    {club.name}
                    <Check
                      className={cn(
                        "ml-auto",
                        selectedId === club.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div>
        <button
          onClick={handleSearch}
          className='bg-[#e24e1b] px-5 py-3 text-white font-semibold hover:bg-orange-700 transition cursor-pointer'
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
