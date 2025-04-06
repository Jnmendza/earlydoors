import { db } from "@/lib/db";

export const getVenues = async () => {
  try {
    const venues = await db.venues.findMany();
    return venues;
  } catch (error) {
    console.error("Error fetching venues:", error);
    throw new Error("Failed to fetch venues");
  }
};
