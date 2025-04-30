import { create } from "zustand";
import { Event } from "@prisma/client";
import { approveStatus, rejectStatus } from "@/actions/status-change";
import { CalendarEvent } from "@/types/types";
import { transformToCalendarEvents } from "@/lib/utils";

export type EventWithVenue = Event & {
  venue?: { name: string };
};

export type EventStore = {
  events: Array<EventWithVenue>;
  calendarEvents: Array<CalendarEvent>;
  isLoading: boolean;
  error: string | null;
  setEvents: (events: Array<EventWithVenue>) => void;
  addEvent: (event: EventWithVenue) => void;
  fetchEvents: () => Promise<void>;
  fetchCalendarEvents: () => void;
  updateEvent: (updatedEvent: Event) => void;
  approveEvent: (id: string) => Promise<void>;
  rejectEvent: (id: string) => Promise<void>;
};

export const useEventStore = create<EventStore>((set, get) => ({
  events: [],
  calendarEvents: [],
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
      set({
        events: data,
        calendarEvents: transformToCalendarEvents(data),
        isLoading: false,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch events";
      set({ error: errorMessage, isLoading: false });
    }
  },
  fetchCalendarEvents: async () => {
    await get().fetchEvents();
  },
  updateEvent: (updatedEvent: EventWithVenue) => {
    set((state) => {
      const updatedEvents = state.events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      );

      return {
        events: updatedEvents,
        calendarEvents: transformToCalendarEvents(updatedEvents),
      };
    });
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
