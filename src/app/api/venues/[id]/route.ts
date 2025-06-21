import { uploadImageToStorage } from "@/actions/upload-img-to-storage";
import { db } from "@/lib/db";
import { extractLatLng } from "@/lib/utils";
import { venueFormSchema } from "@/lib/validation/venuesSchema";
import { ActionType } from "@/types/types";
import { ActivityType, Status } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const venue = await db.venue.findUnique({
      where: { id },
    });

    if (!venue) {
      return NextResponse.json({ error: "Venue not found" }, { status: 404 });
    }

    return NextResponse.json(venue);
  } catch (error) {
    console.error("Error fetching venue:", error);
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
    const parsed = venueFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.format() },
        { status: 400 }
      );
    }

    const latLng = extractLatLng(parsed.data.google_maps_url);

    if (!latLng) {
      return NextResponse.json(
        { error: "Invalid Google Maps URL" },
        { status: 400 }
      );
    }
    const { logo_url, ...restData } = parsed.data;

    if (!logo_url) {
      return NextResponse.json(
        { error: "Logo file is required" },
        { status: 400 }
      );
    }

    // Upload to subabase storage if logo_url is a file
    const imgUrlResult = await uploadImageToStorage({
      file: logo_url,
      folder: "venues",
    });

    if (!imgUrlResult.success) {
      return NextResponse.json({ error: imgUrlResult.error }, { status: 500 });
    }

    const updatedVenue = await db.venue.update({
      where: { id },
      data: {
        ...restData,
        lat: Number(latLng?.lat),
        lng: Number(latLng?.lng),
        logo_url: imgUrlResult.url,
      },
    });

    await db.activityLog.create({
      data: {
        type: ActivityType.VENUE,
        action: "UPDATE",
        referenced_id: updatedVenue.id,
        message: `Venue ${updatedVenue.name} was updated`,
      },
    });

    return NextResponse.json(updatedVenue);
  } catch (error) {
    console.error("Error updating venue:", error);
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

    const updated = await db.venue.update({
      where: { id },
      data: { status },
    });

    await db.activityLog.create({
      data: {
        type: ActivityType.VENUE,
        action: "UPDATE" as ActionType,
        referenced_id: updated.id,
        message: `Venue ${updated.name} status was updated to ${status}`,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating status:", error);
    return NextResponse.json(
      { error: "Server error updating status for venues " },
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
    await db.venue.delete({ where: { id } });

    await db.activityLog.create({
      data: {
        type: ActivityType.VENUE,
        action: "DELETE" as ActionType,
        referenced_id: id,
        message: `Venue ${id} was deleted`,
      },
    });
    return NextResponse.json({ message: `Venue ${id} deleted ` });
  } catch (error) {
    console.error("Error deleting venue:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
