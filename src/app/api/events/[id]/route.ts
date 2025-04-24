import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { eventFormSchema } from "@/lib/validation/eventsSchema";
import { ActivityType, Status } from "@prisma/client";
import { ActionType } from "@/types/types";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const event = await db.event.findUnique({
      where: { id: params.id },
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
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const parsedBody = {
      ...body,
      date: new Date(body.date),
    };
    const parseResult = eventFormSchema.safeParse(parsedBody);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parseResult.error.format() },
        { status: 400 }
      );
    }

    const updated = await db.event.update({
      where: { id: params.id },
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
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await req.json();

    if (![Status.APPROVED, Status.PENDING, Status.REJECTED].includes(status)) {
      return NextResponse.json({ error: "Invalid status " }, { status: 400 });
    }

    const updated = await db.event.update({
      where: { id: params.id },
      data: { status },
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
    console.error("Error updating status:", error);
    return NextResponse.json(
      { error: "Server error updating status for events " },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db.event.delete({ where: { id: params.id } });

    await db.activityLog.create({
      data: {
        type: ActivityType.EVENT,
        action: "DELETE" as ActionType,
        referenced_id: params.id,
        message: `Event ${params.id} was deleted`,
      },
    });
    return NextResponse.json({ message: `Event ${params.id} deleted ` });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
