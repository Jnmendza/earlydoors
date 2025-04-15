import SupportersGroupForm from "@/components/forms/SupportersGroupForm";
import { bebasFont } from "@/lib/font";
import React from "react";

const SupportersGroupsCreatePage = () => {
  return (
    <div className='flex flex-col mt-10 items-center h-screen'>
      <h3 className={`mb-6 ${bebasFont.className} text-edorange text-2xl`}>
        Create a new supporters group
      </h3>
      <SupportersGroupForm />
    </div>
  );
};

export default SupportersGroupsCreatePage;
