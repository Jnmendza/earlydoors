"use client";
import { useEventStore } from "@/store/event-store";
import { useVenueStore } from "@/store/venue-store";
import { useClubStore } from "@/store/club-store";
import { useGroupStore } from "@/store/group-store";
import { Status } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const PendingApprovals = () => {
  const { events } = useEventStore();
  const { venues } = useVenueStore();
  const { clubs } = useClubStore();
  const { groups } = useGroupStore();

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
