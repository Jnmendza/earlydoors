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

type Author = {
  image: unknown;
  bio?: unknown;
  name: string;
  _id: string;
};

type Categories = {
  description: string;
  title: string;
};

export type BlogCardPost = {
  author: Author;
  categories: Categories[];
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mainImage: any;
  readTime: number;
  slug: string;
  title: string;
  _createdAt: string;
  _id: string;
};

export type FullBlog = {
  author: Author;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any;
  categories: Categories[];
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mainImage: any;
  publishedAt: string;
  readTime: number;
  slug: string;
  title: string;
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
};

export type ActionType = "CREATE" | "UPDATE" | "DELETE" | "REJECT" | "APPROVE";
