import { create } from "zustand";
import { SupportersGroup } from "@prisma/client";

type GroupStore = {
  groups: Array<SupportersGroup>;
  isLoading: boolean;
  error: string | null;
  setGroups: (group: Array<SupportersGroup>) => void;
  addGroup: (group: SupportersGroup) => void;
  fetchGroups: () => Promise<void>;
};

export const useGroupStore = create<GroupStore>((set) => ({
  groups: [],
  isLoading: false,
  error: null,
  setGroups: (groups) => set({ groups }),
  addGroup: (group) => set((state) => ({ groups: [...state.groups, group] })),

  fetchGroups: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch("/api/supportersGroups");
      if (!res.ok) throw new Error("Failed to fetch supporter groups");
      const data = await res.json();
      set({ groups: data, isLoading: false });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to fetch supporters groups";
      set({ error: errorMessage, isLoading: false });
    }
  },
}));
