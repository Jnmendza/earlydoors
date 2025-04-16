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

export const getSupporterGroupById = async (groupId: string) => {
  try {
    const group = await db.supportersGroup.findUnique({
      where: { id: groupId },
    });

    return group;
  } catch (error) {
    console.error(`Failed to fetch group with ${groupId}:`, error);
    throw new Error("Failed to fetch group");
  }
};
