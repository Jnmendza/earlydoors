import { API_KEYS } from "@/constants/api";
import React, { useState, useEffect } from "react";

function RoadDistanceCalculator({
  venueLat,
  venueLng,
}: {
  venueLat: number;
  venueLng: number;
}) {
  const apiKey = API_KEYS.GOOGLE_MAPS;
  const [distance, setDistance] = useState<{ mi: string; time: string } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setIsLoading(false);
      return;
    }

    const getLocationAndCalculate = async () => {
      try {
        // Step 1: Get user's current position
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 0,
            });
          }
        );

        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        // Use Next.js API route as proxy
        const proxyUrl = `/api/distance?origins=${userLat},${userLng}&destinations=${venueLat},${venueLng}&units=imperial&key=${apiKey}`;

        const response = await fetch(proxyUrl);
        const data = await response.json();

        if (data.rows?.[0]?.elements?.[0]?.status === "OK") {
          setDistance({
            mi: data.rows[0].elements[0].distance.text,
            time: data.rows[0].elements[0].duration.text,
          });
        } else {
          throw new Error(data.error_message || "Could not calculate distance");
        }
      } catch (err) {
        if (err instanceof GeolocationPositionError) {
          setError(err.message);
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unexpected error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    getLocationAndCalculate();
  }, [venueLat, venueLng, apiKey]);

  if (isLoading) return <div className='loading'>Getting your location...</div>;
  if (error)
    return (
      <div className='error'>
        <p>Error: {error}</p>
        {error.includes("permission") && (
          <p>Please enable location permissions in your browser settings</p>
        )}
      </div>
    );

  return (
    <>
      {distance && (
        <div className='distance-result'>
          <>
            <p>{distance.mi}</p>
            <p>ETA: {distance.time}</p>
          </>
        </div>
      )}
    </>
  );
}

export default RoadDistanceCalculator;
