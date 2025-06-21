import { Status } from "@prisma/client";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import { EventWithVenue } from "@/store/event-store";
import { CalendarEvent } from "@/types/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimeTo12Hour(time24: string): string {
  const [hourStr, minuteStr] = time24.split(":");
  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);
  const ampm = hour >= 12 ? "pm" : "am";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;

  return `${hour12}:${minute.toString().padStart(2, "0")} ${ampm}`;
}

export function formatDateReadable(dateInput: string | Date): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  const day = date.getDate();
  const daySuffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
  const year = date.getFullYear();

  return `${weekday} ${day}${daySuffix} ${year}`;
}

export function isUUID(str: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(
    str
  );
}

export function capitalizeFirstLetterOnly(input: string): string {
  if (!input) return "";
  return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}

export function textBadgeColor(text: string) {
  switch (text) {
    case Status.APPROVED:
    case "EVENT":
      return "bg-green-600 text-white";
    case Status.PENDING:
    case "VENUE":
      return "bg-yellow-300 text-black";
    case Status.REJECTED:
      return "bg-red-500 text-white";
    case "CLUB":
      return "bg-blue-600 text-white";
    case "SUPPORTERS_GROUP":
      return "bg-purple-600 text-white";
    default:
      return "bg-black text-white";
  }
}

export function transformToCalendarEvents(
  events: EventWithVenue[]
): CalendarEvent[] {
  return events
    .filter((event) => event.status === Status.APPROVED)
    .map((event) => {
      // Create date in UTC mode
      const startDate = new Date(event.date);
      const [startHours = 0, startMinutes = 0] =
        event.start_time?.split(":").map(Number) || [];

      // Use UTC methods to avoid timezone conversion
      const utcStartDate = new Date(
        Date.UTC(
          startDate.getUTCFullYear(),
          startDate.getUTCMonth(),
          startDate.getUTCDate(),
          startHours,
          startMinutes
        )
      );

      const utcEndDate = event.end_time
        ? (() => {
            const [endHours = 0, endMinutes = 0] = event.end_time
              .split(":")
              .map(Number);
            return new Date(
              Date.UTC(
                startDate.getUTCFullYear(),
                startDate.getUTCMonth(),
                startDate.getUTCDate(),
                endHours,
                endMinutes
              )
            );
          })()
        : new Date(utcStartDate.getTime() + 60 * 60 * 1000);

      return {
        id: event.id,
        title: event.name,
        start: utcStartDate,
        end: utcEndDate,
        venueId: event.venue_id,
        venueName: event.venue?.name ?? "Unknown Venue",
        allDay: false,
        desc: event.description,
      };
    });
}

export function cleanInstagramHandle(handle: string): string {
  return handle.startsWith("@") ? handle.slice(1) : handle;
}
