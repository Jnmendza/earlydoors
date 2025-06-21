"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useVenueStore } from "@/store/venue-store";
import { Button } from "@/components/ui/button";
import { DeleteDialog } from "@/components/DeleteDialog";
import Image from "next/image";
import { IMAGE_PLACEHOLDER } from "@/constants/ui";
import { Status } from "@prisma/client";

export default function EventsPage() {
  const { venues, fetchVenues, isLoading, error } = useVenueStore();
  const venuesApproved = venues.filter((e) => e.status === Status.APPROVED);

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
      {!isLoading && venuesApproved?.length === 0 && <p>No venues found.</p>}

      <ul className='space-y-4'>
        {venuesApproved?.map((venue) => (
          <li
            key={venue.id}
            className='border p-4 rounded flex justify-between items-center'
          >
            <div className='flex items-center space-x-4'>
              <Image
                src={venue.logo_url ?? IMAGE_PLACEHOLDER}
                alt='venue-logo'
                height={50}
                width={50}
              />
              <div>
                <h2 className='text-lg font-medium'>{venue.name}</h2>
                <p className='text-sm text-gray-500'>
                  <Link
                    href={venue.google_maps_url}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {venue.address}, {venue.city}, {venue.state} {venue.zipcode}
                  </Link>
                </p>
              </div>
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
