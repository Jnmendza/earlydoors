import ClubsForm from "@/components/forms/ClubsForm";
import { bebasFont } from "@/lib/font";
import React from "react";

const ClubsFormPage = () => {
  return (
    <div className='flex flex-col mt-10 items-center h-screen'>
      <h3 className={`mb-6 ${bebasFont.className} text-edorange text-2xl`}>
        Create a new club
      </h3>
      <ClubsForm />
    </div>
  );
};

export default ClubsFormPage;
