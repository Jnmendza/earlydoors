import React from "react";
import ClubsForm from "@/components/forms/ClubsForm";
import { getClubById } from "@/data/club";

export default async function EditClubPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;
  const club = await getClubById(id);

  if (!club) {
    return <div>Club not found</div>;
  }
  return (
    <div className='flex flex-col mt-10 p-4 items-center h-screen'>
      <h3 className='mb-6 text-2xl text-edorange'>Edit Event</h3>
      {club && (
        <ClubsForm
          clubId={id}
          initialData={{
            ...club,
            logo_url: club.logo_url ?? "",
          }}
        />
      )}
    </div>
  );
}
