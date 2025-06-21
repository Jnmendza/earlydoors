"use client";
import { useEventStore } from "@/store/event-store";
import { useVenueStore } from "@/store/venue-store";
import { useClubStore } from "@/store/club-store";
import { useGroupStore } from "@/store/group-store";
import { Status } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useEffect } from "react";
import Link from "next/link";

const PendingApprovals = () => {
  const { events, fetchEvents } = useEventStore();
  const { venues, fetchVenues } = useVenueStore();
  const { clubs, fetchClubs } = useClubStore();
  const { groups, fetchGroups } = useGroupStore();

  useEffect(() => {
    fetchEvents();
    fetchVenues();
    fetchClubs();
    fetchGroups();
  }, [fetchEvents, fetchVenues, fetchClubs, fetchGroups]);

  const pendingEvents = events.filter(
    (e) => e.status === Status.PENDING
  ).length;
  const pendingVenues = venues.filter(
    (v) => v.status === Status.PENDING
  ).length;
  const pendingClubs = clubs.filter((c) => c.status === Status.PENDING).length;
  const pendingGroups = groups.filter(
    (g) => g.status === Status.PENDING
  ).length;

  const items = [
    { label: "Events", count: pendingEvents, color: "bg-blue-500" },
    { label: "Venues", count: pendingVenues, color: "bg-green-500" },
    { label: "Clubs", count: pendingClubs, color: "bg-yellow-500" },
    { label: "Groups", count: pendingGroups, color: "bg-purple-500" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Approvals</CardTitle>
        <CardDescription className='text-sm text-gray-500'>
          <Link href={"/dashboard/moderation"}>
            * Approve items in Moderation
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent className='flex-1 grid grid-cols-2 grid-rows-2 gap-4'>
        {items.map((item, index) => (
          <div
            key={index}
            className={`${item.color} rounded-lg flex flex-col justify-center items-center text-white p-6`}
          >
            <div className='text-4xl font-bold'>{item.count}</div>
            <div className='text-lg'>{item.label}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PendingApprovals;
