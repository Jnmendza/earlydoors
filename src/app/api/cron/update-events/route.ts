import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const now = new Date();
    const updated = await db.event.updateMany({
      where: {
        date: { lt: now },
        status: { not: "COMPLETED" },
      },
      data: { status: "COMPLETED" },
    });
    return NextResponse.json({ updated: updated.count });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Cron job failed" }, { status: 500 });
  }
}
