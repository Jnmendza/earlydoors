import { db } from "@/lib/db";

export const getSupporterGroups = async () => {
  try {
    const groups = await db.supportersGroup.findMany();
    return groups;
  } catch (error) {
    console.error("Error fetching supporters group", error);
    throw new Error("Failed to fetch supporters groups");
  }
};
