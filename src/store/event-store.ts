import { create } from "zustand";
import { Status, Event } from "@prisma/client";
import { approveStatus, rejectStatus } from "@/actions/status-change";
import { CalendarEvent } from "@/types/types";

export type EventWithVenue = Event & {
  venue?: { name: string };
};

type EventStore = {
  events: Array<EventWithVenue>;
  calendarEvents: Array<CalendarEvent>;
  isLoading: boolean;
  error: string | null;
  setEvents: (events: Array<EventWithVenue>) => void;
  addEvent: (event: EventWithVenue) => void;
  fetchEvents: () => Promise<void>;
  fetchCaledarEvents: () => Promise<void>;
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
      set({ events: data, isLoading: false });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch events";
      set({ error: errorMessage, isLoading: false });
    }
  },
  fetchCaledarEvents: async () => {
    set({ isLoading: true, error: null });

    try {
      const res = await fetch("/api/events");
      if (!res.ok) throw new Error(res.statusText);
      const calendarEvents = (await res.json())
        .filter((event: EventWithVenue) => event.status === Status.APPROVED)
        .map((event: EventWithVenue) => {
          // Safely parse and combine date with start_time
          const startDate = new Date(event.date);
          const timeParts = event.start_time?.split(":") || ["0", "0"];
          const [startHours, startMinutes] = timeParts.map(Number);
          startDate.setHours(startHours, startMinutes);

          // Handle end time (with fallbacks)
          const endDate = event.end_time
            ? (() => {
                const end = new Date(event.date);
                const endParts = event.end_time.split(":");
                const [endHours = 0, endMinutes = 0] = endParts.map(Number);
                end.setHours(endHours, endMinutes);
                return end;
              })()
            : new Date(startDate.getTime() + 60 * 60 * 1000);
          return {
            id: event.id,
            title: event.name,
            start: startDate,
            end: endDate,
            venueId: event.venue_id,
            venueName: event.venue?.name ?? "Unknown Venue",
            allDay: false,
            desc: event.description,
          };
        });
      set({ calendarEvents, isLoading: false });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch events";
      set({ error: errorMessage, isLoading: false });
    }
  },
  updateEvent: (updatedEvent: Event) =>
    set((state) => ({
      events: state.events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      ),
    })),

  approveEvent: async (id) => {
    await approveStatus(id, "event");
    await get().fetchEvents();
  },
  rejectEvent: async (id) => {
    await rejectStatus(id, "event");
    await get().fetchEvents();
  },
}));
