import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { apiEventSchema } from "@/lib/validation/eventsSchema";
import { ActivityType, Status } from "@prisma/client";
import { ActionType } from "@/types/types";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const event = await db.event.findUnique({
      where: { id },
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const existingEvent = await db.event.findUnique({
      where: { id },
    });
    if (!existingEvent) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const body = await req.json();
    const parseResult = apiEventSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parseResult.error.format() },
        { status: 400 }
      );
    }

    const { date, start_time, ...rest } = parseResult.data;

    // Combine date and start_time into a UTC DateTime
    const [year, month, day] = date.split("-").map(Number);
    const [hours, minutes] = start_time.split(":").map(Number);
    const utcDateString = new Date(
      Date.UTC(year, month - 1, day, hours, minutes)
    ).toISOString();

    const updated = await db.event.update({
      where: { id },
      data: {
        ...rest,
        date: utcDateString, // Store as UTC DateTime
        start_time, // Store time as string
      },
    });

    await db.activityLog.create({
      data: {
        type: ActivityType.EVENT,
        action: "UPDATE" as ActionType,
        referenced_id: updated.id,
        message: `Event ${updated.name} was updated`,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const { status } = await req.json();

    if (![Status.APPROVED, Status.PENDING, Status.REJECTED].includes(status)) {
      return NextResponse.json({ error: "Invalid status " }, { status: 400 });
    }

    const updated = await db.event.update({
      where: { id },
      data: { status },
    });

    await db.activityLog.create({
      data: {
        type: ActivityType.EVENT,
        action: "UPDATE" as ActionType,
        referenced_id: updated.id,
        message: `Event ${updated.name} status was updated to ${status}`,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating status:", error);
    return NextResponse.json(
      { error: "Server error updating status for events " },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await db.event.delete({ where: { id } });

    await db.activityLog.create({
      data: {
        type: ActivityType.EVENT,
        action: "DELETE" as ActionType,
        referenced_id: id,
        message: `Event ${id} was deleted`,
      },
    });
    return NextResponse.json({ message: `Event ${id} deleted ` });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
