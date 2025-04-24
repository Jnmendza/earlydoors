/* eslint no-fallthrough: off */
import * as dates from "date-arithmetic";

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

export function monthsInYear(year: number): Date[] {
  const date = new Date(year, 0, 1);

  return MONTHS.map((i) => dates.month(date, i));
}

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

export function ceil(date: Date, unit: dates.Unit): Date {
  const floor: Date =
    unit === "week"
      ? dates.startOf(dates.startOf(date, "day"), "week", 0)
      : dates.startOf(date, unit);

  return dates.eq(floor, date) ? floor : dates.add(floor, 1, unit);
}

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

export function eqTime(dateA: Date, dateB: Date): boolean {
  return (
    dates.hours(dateA) === dates.hours(dateB) &&
    dates.minutes(dateA) === dates.minutes(dateB) &&
    dates.seconds(dateA) === dates.seconds(dateB)
  );
}

export function isJustDate(date: Date) {
  return (
    dates.hours(date) === 0 &&
    dates.minutes(date) === 0 &&
    dates.seconds(date) === 0 &&
    dates.milliseconds(date) === 0
  );
}

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

export function diff(
  dateA: Date,
  dateB: Date,
  unit: keyof typeof MILLI | "milliseconds"
): number {
  if (!unit || unit === "milliseconds") return Math.abs(+dateA - +dateB);

  // the .round() handles an edge case
  // with DST where the total won't be exact
  // since one day in the range may be shorter/longer by an hour
  return Math.round(
    Math.abs(
      +dates.startOf(dateA, unit).getTime() / MILLI[unit] -
        +dates.startOf(dateB, unit).getTime() / MILLI[unit]
    )
  );
}

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

export function week(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  return Math.ceil(
    ((d.getTime() - new Date(d.getFullYear(), 0, 1).getTime()) / 8.64e7 + 1) / 7
  );
}

export function today() {
  return dates.startOf(new Date(), "day");
}

export function yesterday() {
  return dates.add(dates.startOf(new Date(), "day"), -1, "day");
}

export function tomorrow() {
  return dates.add(dates.startOf(new Date(), "day"), 1, "day");
}
