import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";
import { clubFormSchema } from "@/lib/validation/clubsSchema";
import { ActivityType, Status } from "@prisma/client";
import { ActionType } from "@/types/types";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const club = await db.club.findUnique({
      where: { id },
    });

    if (!club) {
      return NextResponse.json({ error: "Club not found" }, { status: 404 });
    }

    return NextResponse.json(club);
  } catch (error) {
    console.error("Error fetching club:", error);
    return NextResponse.json(
      { error: "Server error fetching club" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await req.json();
    const parsed = clubFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", isses: parsed.error.format() },
        { status: 400 }
      );
    }

    const updatedClub = await db.club.update({
      where: { id },
      data: body,
    });

    await db.activityLog.create({
      data: {
        type: ActivityType.CLUB,
        action: "UPDATE",
        referenced_id: updatedClub.id,
        message: `Club ${updatedClub.name} was updated`,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          club: updatedClub,
          redirectTo: "/dashboard/clubs",
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating club:", error);
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

    const updated = await db.club.update({
      where: { id },
      data: { status },
    });

    await db.activityLog.create({
      data: {
        type: ActivityType.CLUB,
        action: "UPDATE" as ActionType,
        referenced_id: updated.id,
        message: `Club ${updated.name} status was updated to ${status}`,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating status:", error);
    return NextResponse.json(
      { error: "Server error updating status for clubs " },
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
    await db.club.delete({ where: { id } });
    return NextResponse.json({ message: `Club ${id} deleted ` });
  } catch (error) {
    console.error("Error deleting club:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
