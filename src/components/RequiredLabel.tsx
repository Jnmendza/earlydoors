import React from "react";

const RequiredLabel = ({ label }: { label: string }) => {
  return (
    <span>
      {label}
      <span className='text-edorange'>*</span>
    </span>
  );
};

export default RequiredLabel;
