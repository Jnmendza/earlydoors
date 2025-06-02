"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { bebasFont } from "@/lib/font";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import Markers from "./Markers";
import { LOCATIONS } from "@/constants/maps";
import { API_KEYS, MAP_CONFIG } from "@/constants/api";
import VenueCard from "../landing/VenueCard";
import Filters from "./Filters";
import { useVenueStore } from "@/store/venue-store";

const home = LOCATIONS.HOME;
const apiKey = API_KEYS.GOOGLE_MAPS;
const mapId = MAP_CONFIG.ID;

const MapContainer = () => {
  const [openMarkerKey, setOpenMarkerKey] = useState<string | null>(null);
  const { fetchVenues } = useVenueStore();
  const filteredVenuesFn = useVenueStore(
    (state) => state.filteredVenuesCombined
  );
  const filteredVenues = filteredVenuesFn();
  useEffect(() => {
    fetchVenues();
  }, [fetchVenues]);
  console.log("FILTERED", filteredVenues);
  return (
    <APIProvider apiKey={apiKey}>
      <div className='p-2 mt-4'>
        {/* Header */}
        <div className='flex justify-between items-center bg-ednavy p-2 mb-4 space-x-8'>
          <div className='flex items-center ml-4'>
            <Image
              src='/assets/ED_Text.png'
              alt='logo'
              width={135}
              height={30}
            />
            <div className='w-[1px] h-8 bg-edcream mx-2'></div>
            <p className={`text-edcream text-2xl ${bebasFont.className}`}>
              Total
              <span className='text-edorange ml-2'>
                {filteredVenues.length} Results
              </span>
            </p>
          </div>

          <Filters />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-4 w-full gap-2'>
          <div className='col-span-1 pr-2 space-y-2 overflow-y-auto max-h-[500px]'>
            {filteredVenues.map(
              (
                {
                  id,
                  name,
                  address,
                  city,
                  website_url,
                  logo_url,
                  google_maps_url,
                },
                index
              ) => (
                <VenueCard
                  key={index}
                  id={id}
                  name={name}
                  address={address}
                  city={city}
                  website_url={website_url}
                  logo_url={logo_url || ""}
                  google_maps_url={google_maps_url}
                  openMarkerKey={openMarkerKey}
                  setOpenMarkerKey={setOpenMarkerKey}
                />
              )
            )}
          </div>
          <div className='col-span-3 h-[500px]'>
            <Map
              style={{ width: "100%", height: "100%" }}
              mapId={mapId}
              defaultCenter={home}
              defaultZoom={10}
              gestureHandling={"greedy"}
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
                  logo_url: venue.logo_url || "",
                }))}
                setOpenMarkerKey={setOpenMarkerKey}
                openMarkerKey={openMarkerKey}
              />
            </Map>
          </div>
        </div>
      </div>
    </APIProvider>
  );
};

export default MapContainer;
