/* eslint no-fallthrough: off */
import * as dates from "date-arithmetic";
import { format } from "date-fns";

export {
  milliseconds,
  seconds,
  minutes,
  hours,
  month,
  startOf,
  endOf,
  add,
  eq,
  neq,
  gte,
  gt,
  lte,
  lt,
  inRange,
  min,
  max,
} from "date-arithmetic";

const MILLI = {
  seconds: 1000,
  minutes: 1000 * 60,
  hours: 1000 * 60 * 60,
  day: 1000 * 60 * 60 * 24,
};

const MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

/** Array of 24-hour format strings from "00" to "23". */
export const hrs = Array.from({ length: 24 }, (_, i) =>
  i.toString().padStart(2, "0")
);

/** Array of minute strings in 15-minute increments: ["00", "15", "30", "45"]. */
export const mins = ["00", "15", "30", "45"];

/**
 * Returns an array of Date objects representing the first day of each month in a given year.
 * @param year - The year for which to generate month start dates.
 * @returns An array of Date objects, one for each month (January to December).
 */
export function monthsInYear(year: number): Date[] {
  const date = new Date(year, 0, 1);

  return MONTHS.map((i) => dates.month(date, i));
}

/**
 * Returns the first visible day of the month for a calendar view, based on the start of the week.
 * @param date - The date within the month to calculate from.
 * @param localizer - An object with a startOfWeek method to determine the first day of the week.
 * @returns A Date object representing the first visible day (start of the week containing the first of the month).
 */
export function firstVisibleDay(
  date: Date,
  localizer: { startOfWeek: () => number }
): Date {
  const firstOfMonth = dates.startOf(date, "month");

  return dates.startOf(
    firstOfMonth,
    "week",
    localizer.startOfWeek() as dates.StartOfWeek
  );
}

/**
 * Returns the last visible day of the month for a calendar view, based on the start of the week.
 * @param date - The date within the month to calculate from.
 * @param localizer - An object with a startOfWeek method to determine the first day of the week.
 * @returns A Date object representing the last visible day (end of the week containing the last of the month).
 */
export function lastVisibleDay(
  date: Date,
  localizer: { startOfWeek: () => number }
): Date {
  const endOfMonth = dates.endOf(date, "month");

  return dates.endOf(
    endOfMonth,
    "week",
    localizer.startOfWeek() as dates.StartOfWeek
  );
}

/**
 * Returns an array of all visible days in a month for a calendar view, from the first to the last visible day.
 * @param date - The date within the month to calculate from.
 * @param localizer - An object with a startOfWeek method to determine the first day of the week.
 * @returns An array of Date objects representing all visible days in the calendar view.
 */
export function visibleDays(
  date: Date,
  localizer: { startOfWeek: () => number }
): Date[] {
  let current = firstVisibleDay(date, localizer);
  const last = lastVisibleDay(date, localizer),
    days = [];

  while (dates.lte(current, last, "day")) {
    days.push(current);
    current = dates.add(current, 1, "day");
  }

  return days;
}

/**
 * Rounds a date up to the next boundary of the specified unit (e.g., next day, month, or week).
 * @param date - The date to round up.
 * @param unit - The unit to round to (e.g., "day", "month", "week").
 * @returns A Date object representing the next boundary of the specified unit.
 */
export function ceil(date: Date, unit: dates.Unit): Date {
  const floor: Date =
    unit === "week"
      ? dates.startOf(dates.startOf(date, "day"), "week", 0)
      : dates.startOf(date, unit);

  return dates.eq(floor, date) ? floor : dates.add(floor, 1, unit);
}

/**
 * Generates an array of Date objects between a start and end date, inclusive, incrementing by the specified unit.
 * @param start - The start date of the range.
 * @param end - The end date of the range.
 * @param unit - The unit to increment by (default: "day").
 * @returns An array of Date objects representing the range of dates.
 */
export function range(
  start: Date,
  end: Date,
  unit: dates.Unit = "day"
): Date[] {
  let current: Date = start;
  const days: Date[] = [];

  while (dates.lte(current, end, unit)) {
    days.push(current);
    current = dates.add(current, 1, unit);
  }

  return days;
}

/**
 * Merges the date from one Date object with the time from another, or returns null if both are null.
 * @param date - The date to merge (provides year, month, day).
 * @param time - The time to merge (provides hours, minutes, seconds, milliseconds).
 * @returns A new Date object with the merged date and time, or null if both inputs are null.
 */
export function merge(date: Date | null, time: Date | null): Date | null {
  if (time == null && date == null) return null;

  if (time == null) time = new Date();
  if (date == null) date = new Date();

  date = dates.startOf(date, "day");
  date = dates.hours(date, dates.hours(time));
  date = dates.minutes(date, dates.minutes(time));
  date = dates.seconds(date, dates.seconds(time));
  return dates.milliseconds(date, dates.milliseconds(time));
}

/**
 * Compares the time portions (hours, minutes, seconds) of two Date objects for equality.
 * @param dateA - The first date to compare.
 * @param dateB - The second date to compare.
 * @returns True if the time portions are equal, false otherwise.
 */
export function eqTime(dateA: Date, dateB: Date): boolean {
  return (
    dates.hours(dateA) === dates.hours(dateB) &&
    dates.minutes(dateA) === dates.minutes(dateB) &&
    dates.seconds(dateA) === dates.seconds(dateB)
  );
}

/**
 * Checks if a date has no time component (hours, minutes, seconds, milliseconds are all 0).
 * @param date - The date to check.
 * @returns True if the date has no time component, false otherwise.
 */
export function isJustDate(date: Date) {
  return (
    dates.hours(date) === 0 &&
    dates.minutes(date) === 0 &&
    dates.seconds(date) === 0 &&
    dates.milliseconds(date) === 0
  );
}

/**
 * Calculates the absolute difference between two dates in the specified unit.
 * @param start - The start date.
 * @param end - The end date.
 * @param unit - The unit to measure the difference in (e.g., "day").
 * @param firstOfWeek - The first day of the week (for week-based calculations).
 * @returns The absolute number of units between the two dates.
 */
export function duration(
  start: Date,
  end: Date,
  unit: dates.Unit,
  firstOfWeek: dates.StartOfWeek
): number {
  if (unit === "day") unit = "day";
  return Math.abs(
    (
      dates[unit as keyof typeof dates] as (
        date: Date,
        unit?: dates.Unit,
        firstOfWeek?: dates.StartOfWeek
      ) => number
    )(start, undefined, firstOfWeek) -
      (
        dates[unit as keyof typeof dates] as (
          date: Date,
          unit?: dates.Unit,
          firstOfWeek?: dates.StartOfWeek
        ) => number
      )(end, undefined, firstOfWeek)
  );
}

/**
 * Calculates the absolute difference between two dates in the specified unit (e.g., milliseconds, seconds).
 * @param dateA - The first date.
 * @param dateB - The second date.
 * @param unit - The unit to measure the difference in (e.g., "milliseconds", "seconds").
 * @returns The absolute difference in the specified unit, rounded to the nearest integer.
 */
export function diff(
  dateA: Date,
  dateB: Date,
  unit: keyof typeof MILLI | "milliseconds"
): number {
  if (!unit || unit === "milliseconds") return Math.abs(+dateA - +dateB);

  return Math.round(
    Math.abs(
      +dates.startOf(dateA, unit).getTime() / MILLI[unit] -
        +dates.startOf(dateB, unit).getTime() / MILLI[unit]
    )
  );
}

/**
 * Converts a date to a total number of units (e.g., days, hours) since the Unix epoch.
 * @param date - The date to convert.
 * @param unit - The unit to convert to (e.g., "week", "day", "hours").
 * @returns The total number of units since the Unix epoch.
 */
export function total(
  date: Date,
  unit: "week" | "day" | "hours" | "minutes" | "seconds"
): number {
  const ms: number = date.getTime();
  let div: number = 1;

  switch (unit) {
    case "week":
      div *= 7;
    case "day":
      div *= 24;
    case "hours":
      div *= 60;
    case "minutes":
      div *= 60;
    case "seconds":
      div *= 1000;
  }

  return ms / div;
}

/**
 * Calculates the ISO week number of the year for a given date.
 * @param date - The date to calculate the week number for.
 * @returns The ISO week number (1-53).
 */
export function week(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  return Math.ceil(
    ((d.getTime() - new Date(d.getFullYear(), 0, 1).getTime()) / 8.64e7 + 1) / 7
  );
}

/**
 * Returns the start of the current day (midnight).
 * @returns A Date object representing the start of today.
 */
export function today() {
  return dates.startOf(new Date(), "day");
}

/**
 * Returns the start of the previous day (midnight).
 * @returns A Date object representing the start of yesterday.
 */
export function yesterday() {
  return dates.add(dates.startOf(new Date(), "day"), -1, "day");
}

/**
 * Returns the start of the next day (midnight).
 * @returns A Date object representing the start of tomorrow.
 */
export function tomorrow() {
  return dates.add(dates.startOf(new Date(), "day"), 1, "day");
}

/**
 * Formats a date or ISO string into a human-readable string (e.g., "June 30, 2025").
 * @param isoDate - The date or ISO string to format.
 * @returns A formatted string in "Month Day, Year" format (e.g., "June 30, 2025").
 */
export function formatDate(isoDate: string | Date): string {
  const date = typeof isoDate === "string" ? new Date(isoDate) : isoDate;

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Converts a 24-hour time string (HH:mm) to a 12-hour format with AM/PM (e.g., "13:00" to "1:00 pm").
 * @param time - A time string in HH:mm format (e.g., "13:00").
 * @returns A string in 12-hour format with AM/PM (e.g., "1:00 pm") or throws an error if the input is invalid.
 * @throws Error if the time string is not in valid HH:mm format.
 */
export function formatTime(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  if (
    isNaN(hours) ||
    isNaN(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    throw new Error("Invalid time format. Expected HH:mm (e.g., '13:00').");
  }
  // Use an arbitrary date (today) since we only care about time
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return format(date, "h:mm a").toLowerCase(); // e.g., "1:00 pm"
}
