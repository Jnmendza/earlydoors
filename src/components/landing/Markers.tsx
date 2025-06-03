"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  AdvancedMarker,
  Pin,
  InfoWindow,
  useMap,
} from "@vis.gl/react-google-maps";
import { Marker, MarkerClusterer } from "@googlemaps/markerclusterer";
import Image from "next/image";
import { IMAGE_PLACEHOLDER } from "@/constants/ui";
import HoverLink from "../map/HoverLink";
import { Volleyball } from "lucide-react";

type Point = google.maps.LatLngLiteral & {
  key: string;
  name: string;
  address: string;
  city: string;
  logo_url: string;
};

type Props = {
  points: Point[];
  setOpenMarkerKey: (key: string | null) => void;
  openMarkerKey: string | null;
};

type LinkData = {
  title: string;
  cardContent: string;
};

const linkData: LinkData[] = [
  { title: "Directions", cardContent: "Google Maps Link" },
  { title: "Website", cardContent: "Venues Webpage" },
];

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
                <div className='flex items-center space-x-4'>
                  <Image
                    src={
                      point.logo_url?.trim()
                        ? point.logo_url
                        : IMAGE_PLACEHOLDER
                    }
                    alt='pub-image'
                    height={50}
                    width={50}
                    className='rounded-full bg-gray-100 object-cover'
                  />
                  <div>
                    <h1 className='text-lg font-bold'>{point.name}</h1>
                    <p>
                      {point.address}, {point.city}
                    </p>
                  </div>
                </div>
                <div className='flex justify-end items-center'>
                  {linkData.map(({ title, cardContent }, index) => (
                    <React.Fragment key={index}>
                      <HoverLink title={title} cardContent={cardContent} />
                      {index < linkData.length - 1 && <Volleyball size={10} />}
                    </React.Fragment>
                  ))}
                </div>
              </InfoWindow>
            )}
          </AdvancedMarker>
        </React.Fragment>
      ))}
    </>
  );
};

export default Markers;
