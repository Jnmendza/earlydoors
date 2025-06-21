import { uploadImageToStorage } from "@/actions/upload-img-to-storage";
import { db } from "@/lib/db";
import { deleteVenueImage, extractLatLng } from "@/utils/storage";
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

    // Get existing venue to compare
    const existingVenue = await db.venue.findUnique({
      where: { id },
    });

    if (!existingVenue) {
      return NextResponse.json({ error: "Venue not found" }, { status: 404 });
    }

    // Handle coordinates
    const latLng = extractLatLng(parsed.data.google_maps_url);
    if (!latLng) {
      return NextResponse.json(
        { error: "Invalid Google Maps URL" },
        { status: 400 }
      );
    }

    // Handle logo_url: if it's a File, upload it, otherwise use as is
    let logoUrlToSave: string | null | undefined = null;

    if (parsed.data.logo_url instanceof File) {
      const imgUrlResult = await uploadImageToStorage({
        file: parsed.data.logo_url,
        folder: "venues",
      });

      if (!imgUrlResult.success) {
        return NextResponse.json(
          { error: imgUrlResult.error },
          { status: 500 }
        );
      }
      logoUrlToSave = imgUrlResult.url;
    } else if (
      typeof parsed.data.logo_url === "string" ||
      parsed.data.logo_url == null
    ) {
      logoUrlToSave = parsed.data.logo_url;
    }

    // Update venue
    const venue = await db.venue.update({
      where: { id },
      data: {
        name: parsed.data.name,
        address: parsed.data.address,
        city: parsed.data.city,
        zipcode: parsed.data.zipcode,
        state: parsed.data.state,
        lat: latLng.lat,
        lng: latLng.lng,
        website_url: parsed.data.website_url,
        google_maps_url: parsed.data.google_maps_url,
        logo_url: logoUrlToSave,
        has_garden: parsed.data.has_garden,
        has_big_screen: parsed.data.has_big_screen,
        has_outdoor_screens: parsed.data.has_outdoor_screens,
        is_bookable: parsed.data.is_bookable,
      },
    });

    if (existingVenue.logo_url && logoUrlToSave !== existingVenue.logo_url) {
      const deleteResult = await deleteVenueImage(existingVenue.logo_url);
      if (!deleteResult.success) {
        console.error("Failed to delete old venue image:", deleteResult.error);
        // Consider adding to a cleanup queue for later retry
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Venue updated successfully",
        venue,
        redirectTo: "/dashboard/venues",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating venue:", error);
    return NextResponse.json(
      { error: "Failed to update venue" },
      { status: 500 }
    );
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
