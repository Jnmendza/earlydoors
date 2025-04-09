import { db } from "@/lib/db";

export const getEvents = async () => {
  try {
    const events = await db.event.findMany({
      include: {
        Venue: true,
        Team: true,
      },
    });
    return events;
  } catch (error) {
    console.error("Erro fetching events:", error);
    throw new Error("Failed to fetch events");
  }
};
