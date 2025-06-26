"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";
import VenueCard from "./VenueCard";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { useClubStore } from "@/store/club-store";
import { useVenueStore } from "@/store/venue-store";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Separator } from "../ui/separator";

interface AppSidebarProps {
  openMarkerKey: string | null;
  setOpenMarkerKey: (key: string | null) => void;
}

export function AppSidebar({
  openMarkerKey,
  setOpenMarkerKey,
}: AppSidebarProps) {
  const router = useRouter();
  const {
    searchQuery,
    setSearchQuery,
    setClubId,
    selectedClubId,
    filteredVenuesCombined,
  } = useVenueStore();

  const { fetchClubs, isLoading: isClubLoading } = useClubStore();
  const filteredVenues = filteredVenuesCombined();

  useEffect(() => {
    fetchClubs();
  }, [fetchClubs]);

  if (isClubLoading) return null;
  return (
    <Sidebar variant='floating'>
      <SidebarContent>
        <SidebarGroup>
          <SidebarHeader className='text-center'>
            EarlyDoor Venues
          </SidebarHeader>

          <SidebarGroupContent className='mt-4'>
            <div className='relative'>
              <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                disabled={selectedClubId ? true : false}
                placeholder={
                  selectedClubId
                    ? "Clear filters to type"
                    : "Search name or club affiliates..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full pl-8'
              />
              {selectedClubId && (
                <div className='flex flex-col justify-end mt-2'>
                  <Button
                    className='cursor-pointer'
                    variant='outline'
                    onClick={() => {
                      setClubId(null);
                      router.push("/events"); // removes the ?clubId param
                    }}
                  >
                    Clear Filter
                  </Button>
                  <Separator orientation='horizontal' className='mt-4' />
                </div>
              )}
            </div>

            <SidebarMenu className='mt-4'>
              {filteredVenues.length === 0 ? (
                <p className='text-center text-muted-foreground py-8'>
                  No venues at this moment
                </p>
              ) : (
                filteredVenues.map((venue) => (
                  <VenueCard
                    key={venue.id}
                    id={venue.id}
                    name={venue.name}
                    city={venue.city}
                    venueLat={venue.lat}
                    venueLng={venue.lng}
                    address={venue.address}
                    website_url={venue.website_url}
                    logo_url={venue.logo_url || ""}
                    google_maps_url={venue.google_maps_url}
                    openMarkerKey={openMarkerKey}
                    setOpenMarkerKey={setOpenMarkerKey}
                  />
                ))
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
