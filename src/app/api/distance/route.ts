import { API_KEYS } from "@/constants/api";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const origins = searchParams.get("origins");
  const destinations = searchParams.get("destinations");
  const units = searchParams.get("units") || "imperial";

  if (!origins || !destinations) {
    return new Response(
      JSON.stringify({ error: "Missing required parameters" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const googleUrl = new URL(
      "https://maps.googleapis.com/maps/api/distancematrix/json"
    );
    googleUrl.searchParams.append("origins", origins);
    googleUrl.searchParams.append("destinations", destinations);
    googleUrl.searchParams.append("units", units);
    googleUrl.searchParams.append("key", API_KEYS.GOOGLE_MAPS);

    const response = await fetch(googleUrl.toString());
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(
      JSON.stringify({ error: "Failed to fetch distance data" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
