"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import React from "react";
import { bebasFont } from "@/lib/font";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useMap,
} from "@vis.gl/react-google-maps";
import { Marker, MarkerClusterer } from "@googlemaps/markerclusterer";
import trees from "@/data/trees";
import { useEffect } from "react";
import { useMemo } from "react";

const tabs = ["Popular", "Active Doors"];

const MapContainer = () => {
  const [currentTab, setCurrentTab] = useState<string>("Popular");
  const [openMarkerKey, setOpenMarkerKey] = useState<string | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
  const mapId = process.env.NEXT_PUBLIC_MAP_ID!;

  // const position = { lat: 32.715736, lng: -117.161087 };
  const position = { lat: 43.64, lng: -79.41 };
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
              defaultCenter={position}
              defaultZoom={10}
              gestureHandling={"greedy"}
              disableDefaultUI={true}
            >
              <Markers
                points={trees}
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

type Point = google.maps.LatLngLiteral & { key: string };
type Props = {
  points: Point[];
  setOpenMarkerKey: (key: string | null) => void;
  openMarkerKey: string | null;
};

const Markers = ({ points, setOpenMarkerKey, openMarkerKey }: Props) => {
  const map = useMap();
  const memoizedPoints = useMemo(() => points, [points]);
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const clusterer = useRef<MarkerClusterer | null>(null);

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  const setMarkerRef = (marker: Marker | null, key: string) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };

  return (
    <>
      {memoizedPoints.map((point, index) => (
        <React.Fragment key={`marker-${point.key}`}>
          <AdvancedMarker
            key={index}
            ref={(marker) => setMarkerRef(marker, point.key)}
            position={point}
            onClick={() =>
              setOpenMarkerKey(point.key === openMarkerKey ? null : point.key)
            }
          >
            <Pin
              background={"#E24E1B"}
              borderColor={"#032434"}
              glyphColor={"#177C4C"}
            />
            {openMarkerKey === point.key && (
              <InfoWindow
                position={point}
                onCloseClick={() => setOpenMarkerKey(null)}
                key={`info-${point.key}`}
                anchor={markers[point.key]}
                shouldFocus={false}
              >
                <p>Window</p>
              </InfoWindow>
            )}
          </AdvancedMarker>
        </React.Fragment>
      ))}
    </>
  );
};

export default MapContainer;
