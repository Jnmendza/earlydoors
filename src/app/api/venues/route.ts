import { getVenues } from "@/data/venues";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const venues = await getVenues();
    return NextResponse.json(venues);
  } catch (error) {
    console.error("Error fetching venues;", error);
    return NextResponse.json(
      { error: "Failed to fetch venues" },
      { status: 500 }
    );
  }
}
