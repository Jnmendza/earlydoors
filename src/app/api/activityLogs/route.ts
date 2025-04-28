import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const logs = await db.activityLog.findMany({
      orderBy: { created_at: "desc" },
      take: 5,
    });
    return NextResponse.json(logs);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch activity logs" },
      { status: 500 }
    );
  }
}
