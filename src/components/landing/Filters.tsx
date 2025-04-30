"use client";
import React, { useState } from "react";
import { Combobox } from "../ui/combobox";
import { CheckboxFilterGroup } from "./CheckboxFilterGroup";

export interface FilterOption {
  label: string;
  value: string;
}

const filterOptions: FilterOption[] = [
  { value: "garder", label: "Garden" },
  { value: "outdoor-screens", label: "Outdoor Screens" },
  { value: "is-bookable", label: "Is Bookable" },
  { value: "big-screen", label: "Big Screen" },
];

const Filters = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  return (
    <div className='flex flex-col gap-4 p-2 mt-4'>
      <div className='bg-edorange h-[50px] w-full p-2 mb-4'>
        <h3 className='text-edcream text-3xl'>Filters</h3>
      </div>

      <Combobox
        searchPlaceholder='Search By Clubs'
        selectPlaceholder='Select Club'
      />

      <CheckboxFilterGroup
        filterOptions={filterOptions}
        selected={selectedOptions}
        onChange={setSelectedOptions}
      />
    </div>
  );
};

export default Filters;
