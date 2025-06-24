"use client";
import { useMemo } from "react";
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

interface AppSidebarProps {
  openMarkerKey: string | null;
  setOpenMarkerKey: (key: string | null) => void;
}

export function AppSidebar({
  openMarkerKey,
  setOpenMarkerKey,
}: AppSidebarProps) {
  const router = useRouter();
  const { searchQuery, setSearchQuery, setClubId, selectedClubId } =
    useVenueStore();
  const filteredVenuesFn = useVenueStore(
    (state) => state.filteredVenuesCombined
  );
  const clubs = useClubStore((state) => state.clubs);

  const clubMap = useMemo(() => {
    return clubs.reduce((acc, club) => {
      acc[club.id] = club.name.toLowerCase();
      return acc;
    }, {} as Record<string, string>);
  }, [clubs]);

  const filteredVenues = filteredVenuesFn(clubMap);

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
                placeholder='Search venues or clubs...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full pl-8'
              />
              {selectedClubId && (
                <Button
                  variant='outline'
                  onClick={() => {
                    setClubId(null);
                    router.push("/events"); // removes the ?clubId param
                  }}
                >
                  Clear Filter
                </Button>
              )}
            </div>

            <SidebarMenu className='mt-4'>
              {filteredVenues.map((venue) => (
                <VenueCard
                  key={venue.id}
                  id={venue.id}
                  name={venue.name}
                  city={venue.city}
                  distance='100 meters'
                  openUntil='Open till 6pm'
                  address={venue.address}
                  website_url={venue.website_url}
                  logo_url={venue.logo_url || ""}
                  google_maps_url={venue.google_maps_url}
                  openMarkerKey={openMarkerKey}
                  setOpenMarkerKey={setOpenMarkerKey}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
