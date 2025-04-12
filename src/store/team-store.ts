import { create } from "zustand";
import { Team } from "@prisma/client";

type TeamStore = {
  teams: Array<Team>;
  isLoading: boolean;
  error: string | null;
  setTeams: (teams: Array<Team>) => void;
  addTeam: (team: Team) => void;
  fetchTeams: () => Promise<void>;
};

export const useTeamStore = create<TeamStore>((set) => ({
  teams: [],
  isLoading: false,
  error: null,
  setTeams: (teams) => set({ teams }),
  addTeam: (team) => set((state) => ({ teams: [...state.teams, team] })),

  fetchTeams: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch("/api/teams");
      if (!res.ok) throw new Error("Failed to fetch teams");
      const data = await res.json();
      set({ teams: data, isLoading: false });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch teams";
      set({ error: errorMessage, isLoading: false });
    }
  },
}));
