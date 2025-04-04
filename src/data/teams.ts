import { db } from "@/lib/db";

export const getTeams = async () => {
  try {
    const teams = await db.teams.findMany();
    return teams;
  } catch (error) {
    console.error("Error fetching teams:", error);
    throw new Error("Failed to fetch teams");
  }
};
