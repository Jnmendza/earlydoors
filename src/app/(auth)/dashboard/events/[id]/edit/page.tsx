import React from "react";
import EventsForm from "@/components/forms/EventsForm";
import { getEventById } from "@/data/event";

export async function generateStaticParams() {
  // Return an array of possible id values
  // If you don't know them at build time, return an empty array
  return [];
}

export default async function EditEventPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;
  const event = await getEventById(id);
  if (!event) {
    return <div>Event not found</div>;
  }
  const {
    name,
    description,
    date,
    venue_id,
    club_id,
    supporters_group_id,
    has_big_screen,
    has_garden,
    has_outdoor_screens,
    is_bookable,
  } = event;
  return (
    <div className='flex flex-col mt-10 p-4 items-center h-screen'>
      <h3 className='mb-6 text-2xl text-edorange'>Edit Event</h3>
      {event && (
        <EventsForm
          eventId={id}
          initialData={{
            name,
            description,
            date,
            venue_id,
            club_id: club_id || undefined,
            supporters_group_id: supporters_group_id || undefined,
            has_big_screen,
            has_garden,
            has_outdoor_screens,
            is_bookable,
          }}
        />
      )}
    </div>
  );
}
