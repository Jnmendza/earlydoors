import { NextRequest, NextResponse } from "next/server";
import { getEvents } from "@/data/event";
import { db } from "@/lib/db";
import { ActivityType, Event, Status } from "@prisma/client";
import { ActionType } from "@/types/types";
import { apiEventSchema } from "@/lib/validation/eventsSchema";

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
    const parseResult = apiEventSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parseResult.error.format() },
        { status: 400 }
      );
    }

    const {
      name,
      start_time,
      date,
      description,
      venue_id,
      club_id,
      supporters_group_id,
      has_big_screen,
      has_garden,
      has_outdoor_screens,
      is_bookable,
    } = parseResult.data;

    // Combine date and start_time into a UTC DateTime
    const [year, month, day] = date.split("-").map(Number);
    const [hours, minutes] = start_time.split(":").map(Number);
    const utcDateString = new Date(
      Date.UTC(year, month - 1, day, hours, minutes)
    ).toISOString();

    const event = await db.event.create({
      data: {
        name,
        start_time,
        date: utcDateString,
        description: description || "",
        venue_id,
        supporters_group_id,
        club_id,
        has_big_screen,
        has_garden,
        has_outdoor_screens,
        is_bookable,
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
