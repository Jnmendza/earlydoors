import { create } from "zustand";
import { ActivityLog } from "@prisma/client";

type ActivityStore = {
  logs: Array<ActivityLog>;
  isLoading: boolean;
  error: string | null;
  fetchLogs: () => Promise<void>;
};

export const useActivityStore = create<ActivityStore>((set) => ({
  logs: [],
  isLoading: false,
  error: null,
  fetchLogs: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch("/api/activityLogs");
      if (!res.ok) throw new Error("Failed to fetch activity logs");
      const data = await res.json();
      set({ logs: data, isLoading: false });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch logs";
      set({ error: errorMessage, isLoading: false });
    }
  },
}));
