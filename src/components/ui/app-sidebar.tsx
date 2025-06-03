import { useMemo, useState } from "react";
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
import { useDebounce } from "@/hooks/use-debounce";
import { Input } from "./input";
import { Search } from "lucide-react";

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
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debounceSearch = useDebounce(searchQuery, 300);

  const filteredList = useMemo(() => {
    const term = debounceSearch.trim().toLowerCase();
    if (term === "") return venues;
    return venues.filter((v) => v.name.toLowerCase().includes(term));
  }, [debounceSearch, venues]);

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
                placeholder='Search venues...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full pl-8'
              />
            </div>
            <SidebarMenu>
              {filteredList.map(
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
