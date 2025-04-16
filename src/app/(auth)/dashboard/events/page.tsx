"use client";

import Link from "next/link";
import { useEventStore } from "@/store/event-store";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { formatDateReadable, formatTimeTo12Hour } from "@/lib/utils";
import { DeleteDialog } from "@/components/DeleteDialog";

export default function EventsCreatePage() {
  const {
    events,
    fetchEvents,
    isLoading: eventsLoading,
    error,
  } = useEventStore();

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>All Events</h1>
        <Button asChild>
          <Link href='/dashboard/events/create'>+ Create New Event</Link>
        </Button>
      </div>

      {error && <p className='text-red-500'>{error}</p>}
      {!eventsLoading && events?.length === 0 && <p>No events found.</p>}

      {eventsLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className='space-y-4'>
          {events?.map((event) => {
            return (
              <li
                key={event.id}
                className='border p-4 rounded flex justify-between items-center'
              >
                <div>
                  <h2 className='font-medium'>{event.name}</h2>
                  <p className='text-sm text-gray-500'>
                    {formatDateReadable(event.date)} @{" "}
                    {formatTimeTo12Hour(event.start_time)}
                  </p>
                </div>
                <div className='space-x-2'>
                  <DeleteDialog
                    id={event.id}
                    name={event.name}
                    type='event'
                    onDeleteSuccess={fetchEvents}
                  />
                  <Button variant='outline' asChild>
                    <Link href={`/dashboard/events/${event.id}/edit`}>
                      Edit
                    </Link>
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
