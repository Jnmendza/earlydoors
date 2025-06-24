import { db } from "@/lib/db";
import { Status } from "@prisma/client";

export const getVenues = async () => {
  try {
    const venues = await db.venue.findMany({
      include: {
        events: true,
      },
    });
    return venues;
  } catch (error) {
    console.error("Error fetching venues:", error);
    throw new Error("Failed to fetch venues");
  }
};

export const getApprovedVenues = async () => {
  try {
    const approvedVenues = await db.venue.findMany({
      where: {
        status: Status.APPROVED,
      },
    });
    return approvedVenues;
  } catch (error) {
    console.error("Error fetching venues", error);
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

export const getVenuesByClubIds = async (clubId: string) => {
  try {
    const venues = await db.venue.findMany({
      where: {
        events: {
          some: {
            club_id: clubId,
            date: { gte: new Date() },
            status: Status.APPROVED,
          },
        },
      },
      include: {
        events: {
          where: {
            club_id: clubId,
            date: { gte: new Date() },
            status: Status.APPROVED,
          },
          include: {
            club: true,
          },
        },
      },
    });
    return venues;
  } catch (error) {
    console.error(`Failed to fetch venue with club ${clubId}:`, error);
    throw new Error("Failed to fetch venue");
  }
};
