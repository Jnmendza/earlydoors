import { create } from "zustand";
import { Event } from "@prisma/client";
import { approveStatus, rejectStatus } from "@/actions/status-change";
type EventStore = {
  events: Array<Event>;
  isLoading: boolean;
  error: string | null;
  setEvents: (events: Array<Event>) => void;
  addEvent: (event: Event) => void;
  fetchEvents: () => Promise<void>;
  approveEvent: (id: string) => Promise<void>;
  rejectEvent: (id: string) => Promise<void>;
};

export const useEventStore = create<EventStore>((set, get) => ({
  events: [],
  isLoading: false,
  error: null,
  setEvents: (events) => set({ events }),
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
  fetchEvents: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch("/api/events");
      if (!res.ok) throw new Error("Error fetching events");
      const data = await res.json();
      set({ events: data, isLoading: false });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch events";
      set({ error: errorMessage, isLoading: false });
    }
  },
  approveEvent: async (id) => {
    await approveStatus(id, "event");
    await get().fetchEvents();
  },
  rejectEvent: async (id) => {
    await rejectStatus(id, "event");
    await get().fetchEvents();
  },
}));
