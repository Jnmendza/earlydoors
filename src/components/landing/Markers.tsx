"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  AdvancedMarker,
  Pin,
  InfoWindow,
  useMap,
} from "@vis.gl/react-google-maps";
import { Marker, MarkerClusterer } from "@googlemaps/markerclusterer";

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

export default Markers;
