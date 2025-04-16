import { db } from "@/lib/db";

export const getVenues = async () => {
  try {
    const venues = await db.venue.findMany();
    return venues;
  } catch (error) {
    console.error("Error fetching venues:", error);
    throw new Error("Failed to fetch venues");
  }
};

export const getVenueById = async (venueId: string) => {
  try {
    const venue = await db.venue.findUnique({
      where: {
        id: venueId,
      },
    });
    return venue;
  } catch (error) {
    console.error(`Failed to fetch venue with ${venueId}:`, error);
    throw new Error("Failed to fetch venue");
  }
};
