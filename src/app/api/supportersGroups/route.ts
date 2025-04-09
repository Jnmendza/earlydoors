import { getSupporterGroups } from "@/data/groups";
import { NextResponse } from "next/server";

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
