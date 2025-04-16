import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { groupsFormSchema } from "@/lib/validation/groupsSchema";

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
