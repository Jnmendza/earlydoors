"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { bebasFont } from "@/lib/font";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { Venue } from "@prisma/client";
import Markers from "./Markers";
import { LOCATIONS } from "@/constants/maps";
import { API_KEYS, MAP_CONFIG } from "@/constants/api";
import { TABS } from "@/constants/ui";

const home = LOCATIONS.HOME;
const apiKey = API_KEYS.GOOGLE_MAPS;
const mapId = MAP_CONFIG.ID;
const tabs = TABS;

const MapContainer = () => {
  const [currentTab, setCurrentTab] = useState<string>("Popular");
  const [openMarkerKey, setOpenMarkerKey] = useState<string | null>(null);
  const [venuesData, setVenuesData] = useState<Venue[]>([]);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch("/api/venues");
        const data = await response.json();
        setVenuesData(data);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };

    fetchVenues();
  }, []);

  return (
    <APIProvider apiKey={apiKey}>
      <div className='p-2 mt-4'>
        <div className='flex justify-between items-center bg-ednavy w-full p-2 mb-4 h-[50px]'>
          <div className='flex items-center'>
            <Image
              src='/assets/ED_Text.png'
              alt='logo'
              width={135}
              height={30}
            />
            <div className='w-[1px] h-8 bg-edcream mx-2'></div>
            <p className={`text-edcream ${bebasFont.className}`}>
              Total<span className='text-edorange'>12 Results</span>
            </p>
          </div>
          <div
            className={`flex items-center gap-4 ${bebasFont.className} text-edcream`}
          >
            {tabs.map((tab, index) => (
              <button
                key={index}
                className={`
              py-1 px-2 cursor-pointer
              ${
                currentTab === tab
                  ? "bg-edcream text-edorange"
                  : "bg-transparent text-edcream"
              }
              `}
                onClick={() => setCurrentTab(tab)}
              >
                {tab}
              </button>
            ))}

            <div className='w-[1px] h-8 bg-edcream mx-2'></div>
            <p className='mr-2'>MAP VIEW</p>
          </div>
        </div>

        <div className='flex'>
          <div>Location Cards</div>
          <div className='w-full h-[500px]'>
            <Map
              style={{ width: "100%", height: "100%" }}
              mapId={mapId}
              defaultCenter={home}
              defaultZoom={10}
              gestureHandling={"greedy"}
              disableDefaultUI={true}
            >
              <Markers
                points={venuesData.map((venue) => ({
                  lat: venue.lat,
                  lng: venue.lng,
                  key: venue.id,
                  name: venue.name,
                  address: venue.address,
                  city: venue.city,
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
