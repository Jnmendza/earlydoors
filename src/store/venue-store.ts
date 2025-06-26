import { create } from "zustand";
import { Venue, Event, VenueClubAffiliate } from "@prisma/client";
import { approveStatus, rejectStatus } from "@/actions/status-change";
import { VenueFilters } from "@/types/types";

export type VenueWithEvents = Venue & {
  events?: Event[];
  club_affiliates?: VenueClubAffiliate[];
};

type VenueStore = {
  venues: Array<VenueWithEvents>;
  isLoading: boolean;
  error: string | null;

  filters: VenueFilters;
  selectedClubId: string | null;
  searchQuery: string;

  // Setters
  addVenue: (venue: Venue) => void;
  setClubId: (clubId: string | null) => void;
  setVenues: (venues: Array<Venue>) => void;
  setFilters: (filters: Partial<VenueStore["filters"]>) => void;
  setSearchQuery: (query: string) => void;

  // Async
  fetchVenues: () => Promise<void>;
  rejectVenue: (id: string) => Promise<void>;
  approveVenue: (id: string) => Promise<void>;

  // Filtering
  filteredVenuesCombined: (
    clubMap: Record<string, string>
  ) => VenueWithEvents[];
};

export const useVenueStore = create<VenueStore>((set, get) => ({
  venues: [],
  isLoading: false,
  error: null,

  filters: {},
  selectedClubId: null,
  searchQuery: "",

  setClubId: (club_id) => set({ selectedClubId: club_id }),
  setFilters: (filters: VenueFilters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  setVenues: (venues) => set({ venues }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  addVenue: (venue) => set((state) => ({ venues: [...state.venues, venue] })),

  filteredVenuesCombined: (clubMap: Record<string, string>) => {
    const { venues, filters, selectedClubId, searchQuery } = get();
    const term = searchQuery?.trim().toLowerCase() ?? "";

    return venues
      .filter((venue) => {
        const match = [
          filters.is_active === undefined ||
            venue.is_active === filters.is_active,
          filters.has_garden === undefined ||
            venue.has_garden === filters.has_garden,
          filters.has_big_screen === undefined ||
            venue.has_big_screen === filters.has_big_screen,
          filters.has_outdoor_screens === undefined ||
            venue.has_outdoor_screens === filters.has_outdoor_screens,
          filters.is_bookable === undefined ||
            venue.is_bookable === filters.is_bookable,
        ];
        return match.every(Boolean);
      })
      .filter((venue) => {
        if (
          selectedClubId &&
          !venue.events?.some((e) => e.club_id === selectedClubId)
        ) {
          return false;
        }

        // Filter by search query
        if (term) {
          const matchesVenue = venue.name.toLowerCase().includes(term);

          const matchesClub =
            Array.isArray(venue.events) || Array.isArray(venue.club_affiliates)
              ? [
                  ...(venue.events ?? []),
                  ...(venue.club_affiliates?.map((c) => ({ club_id: c.id })) ??
                    []),
                ].some((entry) => {
                  const clubId = entry.club_id ?? undefined;
                  const clubName = clubId ? clubMap[clubId] ?? "" : "";
                  return clubName.toLowerCase().includes(term);
                })
              : false;

          return matchesVenue || matchesClub;
        }

        return true;
      });
  },

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
