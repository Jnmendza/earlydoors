import { getClubs } from "@/data/club";
import { clubFormSchema } from "@/lib/validation/clubsSchema";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Status } from "@prisma/client";

export async function GET() {
  try {
    const clubs = await getClubs();
    return NextResponse.json(clubs);
  } catch (error) {
    console.error("Error fetching clubs", error);
    return NextResponse.json(
      { error: "Failed to fetch clubs" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const requestData = await req.json();

    const parseResult = clubFormSchema.safeParse(requestData);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid fields", details: parseResult.error.errors },
        { status: 400 }
      );
    }

    const { name, logo_url, league, country } = parseResult.data;

    const newClub = await db.club.create({
      data: {
        name,
        logo_url,
        league,
        country,
        status: Status.PENDING,
      },
    });
    return NextResponse.json(newClub, { status: 201 });
  } catch (error) {
    console.error("Error creating a new club", error);
    return NextResponse.json(
      { error: "Failed to create a new club" },
      { status: 500 }
    );
  }
}
