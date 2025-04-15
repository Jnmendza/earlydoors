import { db } from "@/lib/db";
import { venueFormSchema } from "@/lib/validation/venuesSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const venue = await db.venue.findUnique({
      where: { id: params.id },
    });

    if (!venue) {
      return NextResponse.json({ error: "Venue not found" }, { status: 404 });
    }

    return NextResponse.json(venue);
  } catch (error) {
    console.error("Error fetching venue:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const parsed = venueFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.format() },
        { status: 400 }
      );
    }

    const updatedVenue = await db.venue.update({
      where: { id: params.id },
      data: {
        ...parsed.data,
        lat: Number(parsed.data.lat),
        lng: Number(parsed.data.lng),
      },
    });

    return NextResponse.json(updatedVenue);
  } catch (error) {
    console.error("Error updating venue:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
