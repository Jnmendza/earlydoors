import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { eventFormSchema } from "@/lib/validation/eventsSchema";
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
    const body = await req.json();

    // Convert incoming date to UTC
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

    const parsedBody = {
      ...body,
      date: utcDateString, // Use UTC-converted date
    };

    const parseResult = eventFormSchema.safeParse(parsedBody);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parseResult.error.format() },
        { status: 400 }
      );
    }

    const updated = await db.event.update({
      where: { id },
      data: parseResult.data,
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
