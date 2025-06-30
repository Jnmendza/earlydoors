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
import { GoShieldSlash } from "react-icons/go";
import { BsHouseSlash } from "react-icons/bs";

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
    isLoading: venuesLoading,
    selectedClubId,
    filteredVenuesCombined,
  } = useVenueStore();

  const { fetchClubs } = useClubStore();
  const filteredVenues = filteredVenuesCombined();

  useEffect(() => {
    fetchClubs();
  }, [fetchClubs]);

  const EmptyState = ({
    selectedClubId,
  }: {
    selectedClubId: string | null;
  }) => {
    const icon = selectedClubId ? <GoShieldSlash /> : <BsHouseSlash />;
    const message = selectedClubId
      ? "No venue is affiliated with this club, clear the filter to continue searching"
      : "No venues at this moment";

    return (
      <div className='flex flex-col items-center py-8'>
        <div className='mb-2 text-3xl text-muted-foreground'>{icon}</div>
        <p className='text-center text-muted-foreground'>{message}</p>
      </div>
    );
  };

  if (venuesLoading) return null;
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
                <EmptyState selectedClubId={selectedClubId} />
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
