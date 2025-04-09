import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@supabase/supabase-js";

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
  lastChecked: number | null;
  setLastChecked: (timestamp: number) => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      lastChecked: null,
      setLastChecked: (timestamp) => set({ lastChecked: timestamp }),
    }),
    {
      name: "user-store",
    }
  )
);
