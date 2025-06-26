import React from "react";
import VenuesForm from "@/components/forms/VenuesForm";
import { getVenueById } from "@/data/venue";

export async function generateStaticParams() {
  // Return an array of possible id values
  // If you don't know them at build time, return an empty array
  return [];
}

export default async function EditVenuePage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;
  const venue = await getVenueById(id);

  if (!venue) {
    return <div>Venue not found</div>;
  }

  return (
    <div className='flex flex-col mt-10 p-4 items-center h-screen'>
      <h3 className='mb-6 text-2xl text-edorange'>Edit Venue</h3>

      <VenuesForm
        venueId={id}
        initialData={{
          ...venue,
          logo_url: venue.logo_url || null,
          club_affiliates: venue.club_affiliates.map(
            (affiliate: { clubId: string }) => affiliate.clubId
          ),
        }}
      />
    </div>
  );
}
