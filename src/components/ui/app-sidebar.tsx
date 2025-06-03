import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";
import VenueCard from "../map/VenueCard";
import { VenueWithEvents } from "@/store/venue-store";

interface AppSidebarProps {
  venues: VenueWithEvents[];
  openMarkerKey: string | null;
  setOpenMarkerKey: (key: string | null) => void;
}

export function AppSidebar({
  venues,
  openMarkerKey,
  setOpenMarkerKey,
}: AppSidebarProps) {
  return (
    <Sidebar variant='floating'>
      <SidebarContent>
        <SidebarGroup>
          <SidebarHeader className='text-center'>
            EarlyDoor Venues
          </SidebarHeader>
          <SidebarGroupContent className='mt-4'>
            <SidebarMenu>
              {venues.map(
                (
                  {
                    id,
                    name,
                    address,
                    city,
                    website_url,
                    logo_url,
                    google_maps_url,
                  },
                  index
                ) => (
                  <VenueCard
                    id={id}
                    name={name}
                    key={index}
                    city={city}
                    distance='100 meters'
                    openUntil='Open till 6pm'
                    address={address}
                    website_url={website_url}
                    logo_url={logo_url || ""}
                    google_maps_url={google_maps_url}
                    openMarkerKey={openMarkerKey}
                    setOpenMarkerKey={setOpenMarkerKey}
                  />
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
