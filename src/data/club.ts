import { db } from "@/lib/db";

export const getClubs = async () => {
  try {
    const clubs = await db.club.findMany();
    return clubs;
  } catch (error) {
    console.error("Error fetching clubs:", error);
    throw new Error("Failed to fetch clubs");
  }
};

export const getClubById = async (clubId: string) => {
  try {
    const club = await db.club.findUnique({
      where: {
        id: clubId,
      },
    });
    return club;
  } catch (error) {
    console.error(`Error fetching club ${clubId}:`, error);
    throw new Error("Failed to fetch club");
  }
};
