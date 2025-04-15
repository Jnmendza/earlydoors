import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db"; // your prisma instance
import { eventFormSchema } from "@/lib/validation/eventsSchema";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const event = await db.event.findUnique({
      where: { id: params.id },
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const parsedBody = {
      ...body,
      date: new Date(body.date),
    };
    const parseResult = eventFormSchema.safeParse(parsedBody);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parseResult.error.format() },
        { status: 400 }
      );
    }

    const updated = await db.event.update({
      where: { id: params.id },
      data: parseResult.data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db.event.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Event deleted" });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
