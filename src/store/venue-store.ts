import { create } from "zustand";
import { Venue } from "@prisma/client";
import { approveStatus, rejectStatus } from "@/actions/status-change";

type VenueStore = {
  venues: Array<Venue>;
  isLoading: boolean;
  error: string | null;
  setVenues: (venues: Array<Venue>) => void;
  addVenue: (venue: Venue) => void;
  fetchVenues: () => Promise<void>;
  approveVenue: (id: string) => Promise<void>;
  rejectVenue: (id: string) => Promise<void>;
};

export const useVenueStore = create<VenueStore>((set, get) => ({
  venues: [],
  isLoading: false,
  error: null,
  setVenues: (venues) => set({ venues }),
  addVenue: (venue) => set((state) => ({ venues: [...state.venues, venue] })),
  fetchVenues: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch("/api/venues");
      if (!res.ok) throw new Error("Failed to fetch venues");
      const data = await res.json();
      set({ venues: data, isLoading: false });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch venues";
      set({ error: errorMessage, isLoading: false });
    }
  },
  approveVenue: async (id) => {
    await approveStatus(id, "venue");
    await get().fetchVenues();
  },
  rejectVenue: async (id) => {
    await rejectStatus(id, "venue");
    await get().fetchVenues();
  },
}));
