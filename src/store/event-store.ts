import { create } from "zustand";
import { Event } from "@prisma/client";

type EventStore = {
  events: Array<Event>;
  setEvents: (events: Array<Event>) => void;
  addEvent: (event: Event) => void;
};

export const useEventStore = create<EventStore>((set) => ({
  events: [],
  setEvents: (events) => set({ events }),
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
}));
