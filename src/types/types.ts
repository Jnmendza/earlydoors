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

export type BlogCardPost = {
  author: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: any;
    name: string;
    _id: string;
  };
  categories: [
    {
      description: string;
      title: string;
    }
  ];
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mainImage: any;
  readTime: number;
  slug: string;
  title: string;
  _createdAt: string;
  _id: string;
};

export type ActionType = "CREATE" | "UPDATE" | "DELETE" | "REJECT" | "APPROVE";
