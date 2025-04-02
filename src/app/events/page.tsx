import Filters from "@/components/Filters";
import Map from "@/components/Map";
import React from "react";

const EventsPage = () => {
  return (
    <div className='grid grid-cols-[3fr_1fr] w-full p-4'>
      <Map />
      <Filters />
    </div>
  );
};

export default EventsPage;
