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
    <div className='flex mr-4 space-x-6'>
      <Combobox
        searchPlaceholder='Search By Clubs'
        selectPlaceholder='Select A Club'
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
