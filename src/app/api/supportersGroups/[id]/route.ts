import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { groupsFormSchema } from "@/lib/validation/groupsSchema";
import { ActivityType, Status } from "@prisma/client";
import { ActionType } from "@/types/types";
import { uploadImageToStorage } from "@/actions/upload-img-to-storage";
import { imageCleanUp } from "@/utils/storage";

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

    // Get existing group to compare
    const existingGroup = await db.supportersGroup.findUnique({
      where: { id },
    });

    if (!existingGroup) {
      return NextResponse.json(
        { error: "Supporters group not found" },
        { status: 404 }
      );
    }

    let logoUrlToSave: string | null | undefined = null;

    if (parseResult.data.group_logo_url instanceof File) {
      const imgUrlResult = await uploadImageToStorage({
        file: parseResult.data.group_logo_url,
        folder: "groups",
      });

      if (!imgUrlResult.success) {
        return NextResponse.json(
          { error: imgUrlResult.error },
          { status: 500 }
        );
      }
      logoUrlToSave = imgUrlResult.url;
    } else if (
      typeof parseResult.data.group_logo_url === "string" ||
      parseResult.data.group_logo_url === null
    ) {
      logoUrlToSave = parseResult.data.group_logo_url;
    }

    const updatedGroup = await db.supportersGroup.update({
      where: { id },
      data: {
        name: parseResult.data.name,
        group_logo_url: logoUrlToSave,
        club_id: parseResult.data.club_id,
        city: parseResult.data.city,
        state: parseResult.data.state,
        description: parseResult.data.description,
        website_url: parseResult.data.website_url,
        ig_handle: parseResult.data.ig_handle,
      },
    });

    await db.activityLog.create({
      data: {
        type: ActivityType.SUPPORTERS_GROUP,
        action: "UPDATE" as ActionType,
        referenced_id: updatedGroup.id,
        message: `Supporters group ${updatedGroup.name} was updated`,
      },
    });

    if (
      existingGroup.group_logo_url &&
      logoUrlToSave !== existingGroup.group_logo_url
    ) {
      const deleteResult = await imageCleanUp(existingGroup.group_logo_url);
      if (!deleteResult.success) {
        console.error("Failed to delete old groups image:", deleteResult.error);
      }
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          group: updatedGroup,
          redirectTo: "/dashboard/supportersGroups",
        },
      },
      { status: 200 }
    );
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
