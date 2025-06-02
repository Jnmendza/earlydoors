import MapContainer from "@/components/landing/MapContainer";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

const EventsPage = () => {
  return (
    <SidebarProvider>
      <main className=''>
        <MapContainer />
      </main>
    </SidebarProvider>
  );
};

export default EventsPage;
