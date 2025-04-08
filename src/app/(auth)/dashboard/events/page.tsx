import EventsForm from "@/components/forms/EventsForm";
import { bebasFont } from "@/lib/font";
import React from "react";

const EventsFormPage = () => {
  return (
    <div className='flex flex-col mt-10 items-center h-screen'>
      <h3 className={`mb-6 ${bebasFont.className} text-edorange text-2xl`}>
        Create a new event
      </h3>
      <EventsForm />
    </div>
  );
};

export default EventsFormPage;
