"use client";

import React, { useEffect, useMemo, useState } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import Markers from "../landing/Markers";
import { LOCATIONS } from "@/constants/maps";
import { API_KEYS, MAP_CONFIG } from "@/constants/api";
import { useVenueStore } from "@/store/venue-store";
import { SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import VenueDetailsSidebar from "./VenueDetailsSidebar";
import Link from "next/link";
import Image from "next/image";

const home = LOCATIONS.HOME;
const apiKey = API_KEYS.GOOGLE_MAPS;
const mapId = MAP_CONFIG.ID;

export default function MapContainer() {
  const [openMarkerKey, setOpenMarkerKey] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { fetchVenues, venues, selectedClubId, searchQuery } = useVenueStore();
  const filteredVenuesFn = useVenueStore(
    (state) => state.filteredVenuesCombined
  );

  {
    /**
    Reason for eslint disable:
    'venues', 'selectedClubId' & 'searchQuery' are from Zustand state, but ESLint thinks its a normal local state value. 
    */
  }

  const filteredVenues = useMemo(() => {
    return filteredVenuesFn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredVenuesFn, venues, selectedClubId, searchQuery]);

  useEffect(() => {
    fetchVenues();
  }, [fetchVenues]);

  const selectedVenue = openMarkerKey
    ? filteredVenues.find((v) => v.id === openMarkerKey) || null
    : null;

  return (
    <APIProvider apiKey={apiKey}>
      <div className='relative h-screen w-screen'>
        <Map
          style={{ width: "100%", height: "100%" }}
          mapId={mapId}
          defaultCenter={home}
          defaultZoom={10}
          gestureHandling='greedy'
          disableDefaultUI={true}
        >
          <Markers
            points={filteredVenues.map((venue) => ({
              lat: venue.lat,
              lng: venue.lng,
              key: venue.id,
              name: venue.name,
              address: venue.address,
              city: venue.city,
              logo_url: venue.logo_url ?? "",
              google_maps_url: venue.google_maps_url,
              website_url: venue.website_url,
            }))}
            setOpenMarkerKey={setOpenMarkerKey}
            openMarkerKey={openMarkerKey}
          />
        </Map>

        <div className='absolute top-0 left-0 h-full z-20'>
          <AppSidebar
            openMarkerKey={openMarkerKey}
            setOpenMarkerKey={setOpenMarkerKey}
          />
          <div className='absolute top-5.5 left-4 z-30'>
            <SidebarTrigger
              className='cursor-pointer'
              onClick={() => setIsSidebarOpen((prev) => !prev)}
            />
          </div>
        </div>

        {!isSidebarOpen && (
          <Link
            href='/'
            className='
              absolute 
              bottom-6 left-4 
              z-30 
              h-14 w-14 
              flex 
              items-center justify-center 
              bg-edorange 
              rounded-full 
              hover:brightness-110
            '
          >
            <Image
              src='https://qtmkwwvomuvavuoaqjcn.supabase.co/storage/v1/object/public/ed-public/landing/icon.png'
              alt='icon-image'
              height={32}
              width={32}
            />
          </Link>
        )}

        {selectedVenue && (
          <div className='absolute top-1/2 -transalte-y-1/2 z-30'>
            <VenueDetailsSidebar
              venue={selectedVenue}
              onClose={() => setOpenMarkerKey(null)}
            />
          </div>
        )}
      </div>
    </APIProvider>
  );
}
