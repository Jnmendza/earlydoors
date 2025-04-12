import { NextRequest, NextResponse } from "next/server";
import { getEvents } from "@/data/event";
import { db } from "@/lib/db";
import { Event, status_enum } from "@prisma/client";

export async function GET() {
  const events = await getEvents();
  return NextResponse.json(events);
}

export async function POST(req: NextRequest) {
  try {
    const body: Event = await req.json();

    const event = await db.event.create({
      data: {
        name: body.name,
        description: body.description,
        start_time: body.start_time,
        date: new Date(body.date),
        venue_id: body.venue_id,
        team_id: body.team_id,
        has_garden: body.has_garden,
        has_big_screen: body.has_big_screen,
        has_outdoor_screens: body.has_outdoor_screens,
        is_bookable: body.is_bookable,
        status: status_enum.PENDING,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
