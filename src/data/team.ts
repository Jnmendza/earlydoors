import { db } from "@/lib/db";

export const getTeams = async () => {
  try {
    const teams = await db.team.findMany();
    return teams;
  } catch (error) {
    console.error("Error fetching teams:", error);
    throw new Error("Failed to fetch teams");
  }
};
