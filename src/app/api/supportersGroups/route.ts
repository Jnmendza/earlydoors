import { getSupporterGroups } from "@/data/groups";
import { db } from "@/lib/db";
import { groupsApiSchema } from "@/lib/validation/groupsSchema";
import { ActionType } from "@/types/types";
import { ActivityType, Status } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const groups = await getSupporterGroups();
    return NextResponse.json(groups);
  } catch (error) {
    console.error("Error fetching supporters groups", error);
    return NextResponse.json(
      { error: "Failed to fetch supporters groups" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = groupsApiSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid fields", details: parsed.error.format() },
        { status: 400 }
      );
    }

    // At this point, logo_url should already be a URL string from Supabase
    if (!parsed.data.group_logo_url) {
      return NextResponse.json(
        { error: "Logo URL is required" },
        { status: 400 }
      );
    }

    // Validate it's a proper URL
    if (
      typeof parsed.data.group_logo_url !== "string" ||
      !parsed.data.group_logo_url.startsWith("https://")
    ) {
      return NextResponse.json(
        { error: "Invalid group logo URL format" },
        { status: 400 }
      );
    }

    const newGroup = await db.supportersGroup.create({
      data: {
        name: parsed.data.name,
        club_id: parsed.data.club_id,
        group_logo_url: parsed.data.group_logo_url,
        city: parsed.data.city,
        state: parsed.data.state,
        description: parsed.data.description,
        website_url: parsed.data.website_url,
        ig_handle: parsed.data.ig_handle,
        status: Status.PENDING,
      },
    });

    await db.activityLog.create({
      data: {
        type: ActivityType.SUPPORTERS_GROUP,
        action: "CREATE" as ActionType,
        referenced_id: newGroup.id,
        message: `Supporters group ${newGroup.name} was created`,
      },
    });
    return NextResponse.json(
      {
        success: true,
        data: {
          group: newGroup,
          redirectTo: "/dashboard/supportersGroups",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating a new supportes group.", error);
    return NextResponse.json(
      { error: "Failed to create a new supporters group" },
      { status: 500 }
    );
  }
}
