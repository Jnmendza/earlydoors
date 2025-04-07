import { create } from "zustand";
import { Team } from "@prisma/client";

type TeamStore = {
  teams: Array<Team>;
  setTeams: (teams: Array<Team>) => void;
  addTeam: (team: Team) => void;
};

export const useTeamStore = create<TeamStore>((set) => ({
  teams: [],
  setTeams: (teams) => set({ teams }),
  addTeam: (team) => set((state) => ({ teams: [...state.teams, team] })),
}));
