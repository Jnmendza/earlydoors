import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";
import { clubFormSchema } from "@/lib/validation/clubsSchema";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const club = await db.club.findUnique({
      where: { id: params.id },
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
  { params }: { params: { id: string } }
) {
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
      where: { id: params.id },
      data: body,
    });

    return NextResponse.json(updatedClub);
  } catch (error) {
    console.error("Error updating club:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
