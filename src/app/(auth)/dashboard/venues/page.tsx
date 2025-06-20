"use client";
import React, { useEffect } from "react";
import { useVenueStore } from "@/store/venue-store";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DeleteDialog } from "@/components/DeleteDialog";

export default function EventsPage() {
  const { venues, fetchVenues, isLoading, error } = useVenueStore();

  useEffect(() => {
    fetchVenues();
  }, [fetchVenues]);

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>All Venues</h1>
        <Button asChild>
          <Link href='/dashboard/venues/create'>+ Create New Venue</Link>
        </Button>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p className='text-red-500'>{error}</p>}
      {!isLoading && venues?.length === 0 && <p>No venues found.</p>}

      <ul className='space-y-4'>
        {venues?.map((venue) => (
          <li
            key={venue.id}
            className='border p-4 rounded flex justify-between items-center'
          >
            <div>
              <h2 className='font-medium'>{venue.name}</h2>
            </div>
            <div className='space-x-2'>
              <DeleteDialog
                id={venue.id}
                name={venue.name}
                type='venue'
                onDeleteSuccess={fetchVenues}
              />
              <Button variant='outline' asChild>
                <Link href={`/dashboard/venues/${venue.id}/edit`}>Edit</Link>
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
