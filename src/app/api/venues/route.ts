import { getVenues } from "@/data/venue";
import { db } from "@/lib/db";
import { Status, Venue } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

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

export async function POST(req: NextRequest) {
  try {
    const body: Venue = await req.json();
    console.log("POST", body);
    const venue = await db.venue.create({
      data: {
        name: body.name,
        address: body.address,
        city: body.city,
        zipcode: body.zipcode,
        state: body.state,
        lat: body.lat,
        lng: body.lng,
        website_url: body.website_url,
        google_maps_url: body.google_maps_url,
        logo_url: body.logo_url,
        has_garden: body.has_garden,
        has_big_screen: body.has_big_screen,
        has_outdoor_screens: body.has_outdoor_screens,
        is_bookable: body.is_bookable,
        is_active: false,
        status: Status.PENDING,
      },
    });

    return NextResponse.json(venue, { status: 201 });
  } catch (error) {
    console.error("Error creating a venue", error);
    return NextResponse.json(
      { error: "Failed to create a venue" },
      { status: 500 }
    );
  }
}
