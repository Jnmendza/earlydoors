import { getSupporterGroups } from "@/data/groups";
import { db } from "@/lib/db";
import { ActionType } from "@/types/types";
import { ActivityType, Status, SupportersGroup } from "@prisma/client";
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
    const body: SupportersGroup = await req.json();

    const supportersGroup = await db.supportersGroup.create({
      data: {
        name: body.name,
        club_id: body.club_id,
        group_logo_url: body.group_logo_url,
        city: body.city,
        state: body.state,
        description: body.description,
        website_url: body.website_url,
        ig_handle: body.ig_handle,
        status: Status.PENDING,
      },
    });

    await db.activityLog.create({
      data: {
        type: ActivityType.SUPPORTERS_GROUP,
        action: "CREATE" as ActionType,
        referenced_id: supportersGroup.id,
        message: `Supporters group ${supportersGroup.name} was created`,
      },
    });
    return NextResponse.json(supportersGroup, { status: 201 });
  } catch (error) {
    console.error("Error creating a new supportes group.", error);
    return NextResponse.json(
      { error: "Failed to create a new supporters group" },
      { status: 500 }
    );
  }
}
