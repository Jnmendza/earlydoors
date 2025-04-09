import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  const event = await db.event.update({
    where: { id: params.id },
    data: {
      name: body.name,
      description: body.description,
      start_time: new Date(body.start_time),
      end_time: body.end_time ? new Date(body.end_time) : null,
      venue_id: body.venue_id,
      team_id: body.team_id,
      has_garden: body.has_garden,
      has_big_screen: body.has_big_screen,
      has_outdoor_screens: body.has_outdoor_screens,
      is_bookable: body.is_bookable,
    },
  });

  return NextResponse.json(event);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await db.event.delete({ where: { id: params.id } });
  return NextResponse.json({ message: "Event deleted" });
}
