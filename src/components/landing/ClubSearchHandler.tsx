"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useVenueStore } from "@/store/venue-store";

export default function ClubSearchHandler() {
  const searchParams = useSearchParams();
  const { setClubId } = useVenueStore();

  useEffect(() => {
    const clubId = searchParams.get("clubId");
    setClubId(clubId ?? null);
  }, [searchParams, setClubId]);

  return null;
}
