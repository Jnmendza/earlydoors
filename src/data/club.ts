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
