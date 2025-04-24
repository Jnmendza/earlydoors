import { create } from "zustand";
import { ActivityLog } from "@prisma/client";
import { db } from "@/lib/db";

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
      const data = await db.activityLog.findMany({
        orderBy: { created_at: "desc" },
        take: 5,
      });

      set({ logs: data, isLoading: false });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch logs";
      set({ error: errorMessage, isLoading: false });
    }
  },
}));
