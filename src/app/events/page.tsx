"use client";
import MapContainer from "@/components/map/MapContainer";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useVenueStore } from "@/store/venue-store";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const EventsPage = () => {
  const { setClubId } = useVenueStore();
  const searchParams = useSearchParams();
  useEffect(() => {
    const clubId = searchParams.get("clubId");
    if (clubId) {
      setClubId(clubId);
    } else {
      setClubId(null);
    }
  }, [searchParams, setClubId]);

  return (
    <SidebarProvider>
      <main className=''>
        <MapContainer />
      </main>
    </SidebarProvider>
  );
};

export default EventsPage;
