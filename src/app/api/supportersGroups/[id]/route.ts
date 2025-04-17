import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { groupsFormSchema } from "@/lib/validation/groupsSchema";
import { Status } from "@prisma/client";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const group = await db.supportersGroup.findUnique({
      where: { id: params.id },
      include: { Club: true },
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
  { params }: { params: { id: string } }
) {
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
      where: { id: params.id },
      data: parseResult.data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating group:", error);
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

    const updated = await db.supportersGroup.update({
      where: { id: params.id },
      data: { status },
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
  { params }: { params: { id: string } }
) {
  try {
    await db.supportersGroup.delete({ where: { id: params.id } });
    return NextResponse.json({ message: `Group ${params.id} deleted ` });
  } catch (error) {
    console.error("Error deleting group:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
