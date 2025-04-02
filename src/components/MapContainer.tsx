"use client";
import { useState } from "react";
import Image from "next/image";
import React from "react";
import { bebasFont } from "@/lib/font";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

const tabs = ["Popular", "Active Doors"];

const MapContainer = () => {
  const [currentTab, setCurrentTab] = useState<string>("Popular");
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
  const mapId = process.env.NEXT_PUBLIC_MAP_ID!;
  console.log("API", apiKey);
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
              defaultCenter={{ lat: 32.715736, lng: -117.161087 }}
              defaultZoom={10}
              gestureHandling={"greedy"}
              disableDefaultUI={true}
            />
          </div>
        </div>
      </div>
    </APIProvider>
  );
};

export default MapContainer;
