import { NextRequest, NextResponse } from "next/server";
import { getEvents } from "@/data/event";
import { db } from "@/lib/db";
import { ActivityType, Event, Status } from "@prisma/client";
import { ActionType } from "@/types/types";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const events = await getEvents();
    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: Event = await req.json();

    // Convert incoming date to UTC right at the entry point
    const utcDate = new Date(body.date);
    const utcDateString = new Date(
      Date.UTC(
        utcDate.getUTCFullYear(),
        utcDate.getUTCMonth(),
        utcDate.getUTCDate(),
        utcDate.getUTCHours(),
        utcDate.getUTCMinutes()
      )
    ).toISOString();

    const event = await db.event.create({
      data: {
        name: body.name,
        description: body.description,
        start_time: body.start_time,
        date: utcDateString,
        venue_id: body.venue_id,
        club_id: body.club_id,
        has_garden: body.has_garden,
        has_big_screen: body.has_big_screen,
        has_outdoor_screens: body.has_outdoor_screens,
        is_bookable: body.is_bookable,
        status: Status.PENDING,
      },
    });

    await db.activityLog.create({
      data: {
        type: ActivityType.EVENT,
        action: "CREATE" as ActionType,
        referenced_id: event.id,
        message: `Event ${event.name} was created`,
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
