"use client";

import React, { useEffect, useState } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps"; // using your original library
import Markers from "./Markers";
import { LOCATIONS } from "@/constants/maps";
import { API_KEYS, MAP_CONFIG } from "@/constants/api";
import { useVenueStore } from "@/store/venue-store";
import { SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "../ui/app-sidebar";

const home = LOCATIONS.HOME;
const apiKey = API_KEYS.GOOGLE_MAPS;
const mapId = MAP_CONFIG.ID;

export default function MapContainer() {
  const [openMarkerKey, setOpenMarkerKey] = useState<string | null>(null);
  const { fetchVenues } = useVenueStore();
  const filteredVenuesFn = useVenueStore(
    (state) => state.filteredVenuesCombined
  );
  const filteredVenues = filteredVenuesFn();

  useEffect(() => {
    fetchVenues();
  }, [fetchVenues]);

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
          {/* 3) Render markers on top of the map */}
          <Markers
            points={filteredVenues.map((venue) => ({
              lat: venue.lat,
              lng: venue.lng,
              key: venue.id,
              name: venue.name,
              address: venue.address,
              city: venue.city,
              logo_url: venue.logo_url || "",
            }))}
            setOpenMarkerKey={setOpenMarkerKey}
            openMarkerKey={openMarkerKey}
          />
        </Map>

        <div className='absolute top-0 left-0 h-full z-20'>
          <AppSidebar
            venues={filteredVenues}
            openMarkerKey={openMarkerKey}
            setOpenMarkerKey={setOpenMarkerKey}
          />
          <div className='absolute top-5.5 left-4 z-30'>
            <SidebarTrigger className='cursor-pointer' />
          </div>
        </div>
      </div>
    </APIProvider>
  );
}
