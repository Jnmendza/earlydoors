import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { groupsFormSchema } from "@/lib/validation/groupsSchema";
import { ActivityType, Status } from "@prisma/client";
import { ActionType } from "@/types/types";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const group = await db.supportersGroup.findUnique({
      where: { id },
      include: { club: true },
    });

    if (!group) {
      return NextResponse.json(
        { error: "Supporters group not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(group);
  } catch (error) {
    console.error("Error fetching group:", error);
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
    const parseResult = groupsFormSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parseResult.error.format() },
        { status: 400 }
      );
    }

    const updated = await db.supportersGroup.update({
      where: { id },
      data: parseResult.data,
    });

    await db.activityLog.create({
      data: {
        type: ActivityType.SUPPORTERS_GROUP,
        action: "UPDATE" as ActionType,
        referenced_id: updated.id,
        message: `Supporters group ${updated.name} was updated`,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating group:", error);
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

    const updated = await db.supportersGroup.update({
      where: { id },
      data: { status },
    });

    await db.activityLog.create({
      data: {
        type: ActivityType.SUPPORTERS_GROUP,
        action: "UPDATE" as ActionType,
        referenced_id: updated.id,
        message: `Supporters group ${updated.name} status was updated to ${status}`,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating status:", error);
    return NextResponse.json(
      { error: "Server error updating status for groups " },
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
    await db.supportersGroup.delete({ where: { id } });

    await db.activityLog.create({
      data: {
        type: ActivityType.SUPPORTERS_GROUP,
        action: "DELETE" as ActionType,
        referenced_id: id,
        message: `Supporters group ${id} was deleted`,
      },
    });
    return NextResponse.json({ message: `Group ${id} deleted ` });
  } catch (error) {
    console.error("Error deleting group:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
