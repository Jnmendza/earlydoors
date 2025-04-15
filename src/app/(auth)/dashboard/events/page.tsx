"use client";

import Link from "next/link";
import { useEventStore } from "@/store/event-store"; // adjust if needed
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { formatDateReadable, formatTimeTo12Hour } from "@/lib/utils";

export default function EventsCreatePage() {
  const { events, fetchEvents, isLoading, error } = useEventStore();

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

      {isLoading && <p>Loading...</p>}
      {error && <p className='text-red-500'>{error}</p>}
      {!isLoading && events?.length === 0 && <p>No events found.</p>}

      <ul className='space-y-4'>
        {events?.map((event) => (
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
              <Button variant='outline' asChild>
                <Link href={`/dashboard/events/${event.id}/edit`}>Edit</Link>
              </Button>
              {/* Add a delete button or modal here later */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
