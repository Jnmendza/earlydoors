"use client";
import React, { useMemo, useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { useClubStore } from "@/store/club-store";
import { VenueWithEvents } from "@/store/venue-store";
import { IMAGE_PLACEHOLDER } from "@/constants/ui";
import Link from "next/link";
import { EventWithVenue, useEventStore } from "@/store/event-store";
import EventCard from "./EventsCard";
import { MdEventBusy } from "react-icons/md";

interface VenueDetailsProps {
  venue: VenueWithEvents;
  onClose: () => void;
}

const VenueDetailsSidebar = ({ venue, onClose }: VenueDetailsProps) => {
  const getClubMap = useClubStore((state) => state.getClubMap);
  const clubMap = useMemo(() => getClubMap(), [getClubMap]);
  const affiliatedClubs = venue.club_affiliates?.map(
    (aff) => clubMap[aff.clubId]
  );
  const { events, isLoading, fetchUpcomingEventsByVenueId } = useEventStore();

  useEffect(() => {
    if (venue.id) {
      fetchUpcomingEventsByVenueId(venue.id);
    }
  }, [venue.id, fetchUpcomingEventsByVenueId]);

  return (
    <Sidebar variant='floating' className='my-auto left-78 h-5/6 w-80 z-30'>
      <SidebarContent className='flex flex-col h-full'>
        <SidebarHeader className='flex items-center justify-between px-4 py-3 border-b'>
          <div className='flex items-center w-full justify-between'>
            <Button
              onClick={onClose}
              variant='outline'
              className='p-1 hover:bg-gray-200 rounded'
              aria-label='Close details'
            >
              <ArrowLeft size={18} />
            </Button>
            <span className='text-lg font-semibold'>Venue Details</span>
          </div>
        </SidebarHeader>

        <div className='overflow-y-auto px-4 py-3 flex-1 space-y-4 bg-white'>
          {/* Logo + Name */}
          <div className='flex items-center space-x-4'>
            {venue.logo_url ? (
              <Image
                src={venue.logo_url}
                alt={`${venue.name} logo`}
                height={48}
                width={48}
                className='rounded-md object-cover bg-gray-100'
              />
            ) : (
              <div className='h-12 w-12 rounded-md bg-gray-200' />
            )}
            <h2 className='text-xl font-bold'>{venue.name}</h2>
          </div>

          {/* Address */}
          <div>
            <h3 className='text-sm font-medium text-gray-600'>Address</h3>
            <p className='mt-1 text-gray-800'>
              {venue.address}, {venue.city}
            </p>
          </div>

          {/* Website / Directions */}
          <div className='space-y-1'>
            <h3 className='text-sm font-medium text-gray-600'>Links</h3>
            <div className='flex space-x-4'>
              {venue.website_url && (
                <Link
                  href={venue.website_url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-600 hover:underline text-sm'
                >
                  Website
                </Link>
              )}
              {venue.google_maps_url && (
                <Link
                  href={venue.google_maps_url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-600 hover:underline text-sm'
                >
                  Directions
                </Link>
              )}
            </div>
          </div>

          {affiliatedClubs && affiliatedClubs.length > 0 && (
            <div className='space-y-1'>
              <h3>Affiliated Clubs</h3>
              {affiliatedClubs.map((aff) => (
                <Image
                  key={aff.name}
                  src={aff.logo_url || IMAGE_PLACEHOLDER}
                  alt={`${aff.name}-logo`}
                  width={42}
                  height={42}
                  className='rounded-md object-cover bg-gray-100'
                />
              ))}
            </div>
          )}

          {/* Additional details placeholder */}
          <div>
            <h3 className='text-sm font-medium text-gray-600'>
              Upcoming Events
            </h3>
            <p className='mt-1 text-gray-800 text-sm'>
              {/* Replace this with actual venue details */}
              {isLoading ? (
                <div className='flex items-center justify-center mt-6 space-x-2 text-gray-500 border-2 border-solid border-gray-100 py-10'>
                  <span>Loading events...</span>
                </div>
              ) : events.length === 0 ? (
                <div className='flex items-center justify-center mt-6 space-x-2 text-gray-500 border-2 border-solid border-gray-100 py-10'>
                  <MdEventBusy size={20} />
                  <span>No upcoming events</span>
                </div>
              ) : (
                events.map((e: EventWithVenue, index: number) => (
                  <EventCard key={index} event={e} />
                ))
              )}
            </p>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default VenueDetailsSidebar;
