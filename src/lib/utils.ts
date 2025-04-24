import { Status } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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

export function statusBadgeColor(status: string) {
  switch (status) {
    case Status.APPROVED:
      return "bg-green-500 text-white";
    case Status.PENDING:
      return "bg-yellow-300 text-black";
    case Status.REJECTED:
      return "bg-red-500 text-white";
    default:
      return "bg-black text-white";
  }
}
