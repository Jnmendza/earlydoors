import VenuesForm from "@/components/forms/VenuesForm";
import { bebasFont } from "@/lib/font";
import React from "react";

const EventsPage = () => {
  return (
    <div className='flex flex-col mt-10 items-center h-screen'>
      <h3 className={`mb-6 ${bebasFont.className} text-edorange text-2xl`}>
        Create a new venue
      </h3>
      <VenuesForm />
    </div>
  );
};

export default EventsPage;
