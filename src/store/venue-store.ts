import { create } from "zustand";
import { Venue } from "@prisma/client";

type VenueStore = {
  venues: Array<Venue>;
  setVenues: (venues: Array<Venue>) => void;
  addVenue: (venue: Venue) => void;
};

{
  /**
    import { useVenueStore } from "@/store/useVenueStore";

const venues = useVenueStore((state) => state.venues);
const setVenues = useVenueStore((state) => state.setVenues);

    */
}

export const useVenueStore = create<VenueStore>((set) => ({
  venues: [],
  setVenues: (venues) => set({ venues }),
  addVenue: (venue) => set((state) => ({ venues: [...state.venues, venue] })),
}));
