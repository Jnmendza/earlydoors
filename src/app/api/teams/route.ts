import { getTeams } from "@/data/team";
import { teamFormSchema } from "@/lib/validation/teamsSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const teams = await getTeams();
    return NextResponse.json(teams);
  } catch (error) {
    console.error("Error fetching teams", error);
    return NextResponse.json(
      { error: "Failed to fetch teams" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const requestData = await req.json();

    const parseResult = teamFormSchema.safeParse(requestData);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid fields", details: parseResult.error.errors },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error creating a new team", error);
    return NextResponse.json(
      { error: "Failed to create a new team" },
      { status: 500 }
    );
  }
}
