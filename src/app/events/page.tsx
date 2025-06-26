"use client";
import ClubSearchHandler from "@/components/landing/ClubSearchHandler";
import SearchParamRedirect from "@/components/landing/SearchParamRedirect";
import MapContainer from "@/components/map/MapContainer";
import { SidebarProvider } from "@/components/ui/sidebar";
import React, { Suspense } from "react";

const EventsPage = () => {
  return (
    <>
      <Suspense fallback={null}>
        <SearchParamRedirect />
        <ClubSearchHandler />
      </Suspense>
      <SidebarProvider>
        <main>
          <MapContainer />
        </main>
      </SidebarProvider>
    </>
  );
};

export default EventsPage;
