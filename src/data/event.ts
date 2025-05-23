import { db } from "@/lib/db";

export const getEvents = async () => {
  try {
    const events = await db.event.findMany({
      include: {
        venue: {
          select: {
            name: true,
          },
        },
        club: true,
      },
    });
    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw new Error("Failed to fetch events");
  }
};

export const getEventById = async (eventId: string) => {
  try {
    const event = await db.event.findUnique({
      where: {
        id: eventId,
      },
    });
    return event;
  } catch (error) {
    console.error(`Failed to fetch event with ${eventId}:`, error);
    throw new Error("Failed to fetch event");
  }
};
