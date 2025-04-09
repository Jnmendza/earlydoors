import TeamsForm from "@/components/forms/TeamsForm";
import { bebasFont } from "@/lib/font";
import React from "react";

const TeamsFormPage = () => {
  return (
    <div className='flex flex-col mt-10 items-center h-screen'>
      <h3 className={`mb-6 ${bebasFont.className} text-edorange text-2xl`}>
        Create a new team
      </h3>
      <TeamsForm />
    </div>
  );
};

export default TeamsFormPage;
