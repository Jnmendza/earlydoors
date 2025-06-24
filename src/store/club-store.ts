import { create } from "zustand";
import { Club } from "@prisma/client";
import { approveStatus, rejectStatus } from "@/actions/status-change";

type ClubStore = {
  clubs: Array<Club>;
  isLoading: boolean;
  error: string | null;
  setClubs: (clubs: Array<Club>) => void;
  addClub: (club: Club) => void;
  fetchClubs: () => Promise<void>;
  getClubMap: () => Record<string, string>;
  approveClub: (id: string) => Promise<void>;
  rejectClub: (id: string) => Promise<void>;
};

export const useClubStore = create<ClubStore>((set, get) => ({
  clubs: [],
  isLoading: false,
  error: null,
  setClubs: (clubs) => set({ clubs }),
  addClub: (club) => set((state) => ({ clubs: [...state.clubs, club] })),

  getClubMap: () => {
    const { clubs } = get();
    return clubs.reduce((acc, club) => {
      acc[club.id] = club.name.toLowerCase();
      return acc;
    }, {} as Record<string, string>);
  },

  fetchClubs: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch("/api/clubs");
      if (!res.ok) throw new Error("Failed to fetch clubs");
      const data = await res.json();
      set({ clubs: data, isLoading: false });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch clubs";
      set({ error: errorMessage, isLoading: false });
    }
  },
  approveClub: async (id) => {
    await approveStatus(id, "club");
    await get().fetchClubs();
  },
  rejectClub: async (id) => {
    await rejectStatus(id, "club");
    await get().fetchClubs();
  },
}));
