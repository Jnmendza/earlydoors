export type ModelType = "event" | "venue" | "club" | "supportersGroup";

export type CalendarEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  venueId: string;
  allDay?: boolean;
  desc?: string;
  venueName: string;
};

export type ActionType = "CREATE" | "UPDATE" | "DELETE" | "REJECT" | "APPROVE";
