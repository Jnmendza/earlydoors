import Filters from "@/components/landing/Filters";
import MapContainer from "@/components/landing/MapContainer";
import React from "react";

const EventsPage = () => {
  return (
    <div className='grid grid-cols-[3fr_1fr] w-full p-4'>
      <MapContainer />
      <Filters />
    </div>
  );
};

export default EventsPage;
