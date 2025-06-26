import { getVenues } from "@/data/venue";
import { db } from "@/lib/db";
import { extractLatLng } from "@/utils/storage";
import { venueFormSchema } from "@/lib/validation/venuesSchema";
import { ActionType } from "@/types/types";
import { ActivityType, Status } from "@prisma/client";
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
    const body = await req.json();
    const parsed = venueFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.format() },
        { status: 400 }
      );
    }

    // At this point, logo_url should already be a URL string from Supabase
    if (!parsed.data.logo_url) {
      return NextResponse.json(
        { error: "Logo URL is required" },
        { status: 400 }
      );
    }

    // Validate it's a proper URL
    if (
      typeof parsed.data.logo_url !== "string" ||
      !parsed.data.logo_url.startsWith("https://")
    ) {
      return NextResponse.json(
        { error: "Invalid logo URL format" },
        { status: 400 }
      );
    }

    const latLng = extractLatLng(parsed.data.google_maps_url);
    if (!latLng) {
      return NextResponse.json(
        { error: "Invalid Google Maps URL" },
        { status: 400 }
      );
    }

    // Create venue with the pre-uploaded image URL
    const venue = await db.venue.create({
      data: {
        name: parsed.data.name,
        address: parsed.data.address,
        city: parsed.data.city,
        zipcode: parsed.data.zipcode,
        state: parsed.data.state,
        lat: latLng.lat,
        lng: latLng.lng,
        website_url: parsed.data.website_url,
        google_maps_url: parsed.data.google_maps_url,
        logo_url: parsed.data.logo_url,
        has_garden: parsed.data.has_garden,
        has_big_screen: parsed.data.has_big_screen,
        has_outdoor_screens: parsed.data.has_outdoor_screens,
        is_bookable: parsed.data.is_bookable,
        is_active: false,
        status: Status.PENDING,
      },
    });

    if (parsed.data.club_affiliates?.length) {
      await db.venueClubAffiliate.createMany({
        data: parsed.data.club_affiliates.map((clubId: string) => ({
          venueId: venue.id,
          clubId,
        })),
        skipDuplicates: true, // Prevent duplicate entries
      });
    }

    const newVenue = await db.activityLog.create({
      data: {
        type: ActivityType.VENUE,
        action: "CREATE" as ActionType,
        referenced_id: venue.id,
        message: `Venue ${venue.name} was created`,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          venue: newVenue,
          redirectTo: "/dashboard/venues",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating a venue", error);
    return NextResponse.json(
      { error: "Failed to create a venue" },
      { status: 500 }
    );
  }
}
