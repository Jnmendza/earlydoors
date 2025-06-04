"use client";
import React, { useState } from "react";
import { Combobox } from "../ui/combobox";
import { CheckboxFilterGroup } from "./CheckboxFilterGroup";
import { useVenueStore } from "@/store/venue-store";
import { FilterOption } from "@/types/types";
import { Button } from "../ui/button";
import { bebasFont } from "@/lib/font";

const filterOptions: FilterOption[] = [
  { value: "active", label: "Active" },
  { value: "garder", label: "Garden" },
  { value: "outdoor_screens", label: "Outdoor Screens" },
  { value: "is_bookable", label: "Is Bookable" },
  { value: "big_screen", label: "Big Screen" },
];

const Filters = () => {
  const [pendingFilters, setPendingFilters] = useState<string[]>([]);
  const { setFilters } = useVenueStore();

  const handleApply = () => {
    const filterObj = pendingFilters.reduce((acc, curr) => {
      acc[curr] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setFilters(filterObj);
  };

  return (
    <div className='flex mr-4 space-x-6'>
      <Combobox
        searchPlaceholder='Search By Clubs'
        selectPlaceholder='Select A Club'
      />

      <CheckboxFilterGroup
        filterOptions={filterOptions}
        selected={pendingFilters}
        onChange={setPendingFilters}
      />
      <Button
        className={`${bebasFont.className} text-lg bg-edorange text-white hover:bg-white hover:text-edorange cursor-pointer`}
        onSubmit={handleApply}
      >
        Apply
      </Button>
    </div>
  );
};

export default Filters;
