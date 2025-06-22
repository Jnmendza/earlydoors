import { db } from "@/lib/db";
import { getClubs } from "@/data/club";
import { ActionType } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";
import { ActivityType, Status } from "@prisma/client";
import { clubApiSchema } from "@/lib/validation/clubsSchema";

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
    const body = await req.json();
    const parsed = clubApiSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid fields", details: parsed.error.errors },
        { status: 400 }
      );
    }

    // At this point, logo_url should already be a URL string from Supabase
    if (!parsed.data.logo_url) {
      return NextResponse.json(
        { error: "Logo URL is required" },
        { status: 400 }
      );
    }

    // Validate it's a proper URL
    if (
      typeof parsed.data.logo_url !== "string" ||
      !parsed.data.logo_url.startsWith("https://")
    ) {
      return NextResponse.json(
        { error: "Invalid logo URL format" },
        { status: 400 }
      );
    }

    const newClub = await db.club.create({
      data: {
        name: parsed.data.name,
        logo_url: parsed.data.logo_url,
        league: parsed.data.league,
        country: parsed.data.country,
        status: Status.PENDING,
      },
    });

    await db.activityLog.create({
      data: {
        type: ActivityType.CLUB,
        action: "CREATE" as ActionType,
        referenced_id: newClub.id,
        message: `Club ${newClub.name} was created`,
      },
    });
    return NextResponse.json(
      {
        success: true,
        data: {
          club: newClub,
          redirectTo: "/dashboard/clubs",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating a new club", error);
    return NextResponse.json(
      { error: "Failed to create a new club" },
      { status: 500 }
    );
  }
}
