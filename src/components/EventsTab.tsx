"use client";
import { useEventStore } from "@/store/event-store";
import { Status } from "@prisma/client";
import { useEffect } from "react";
import ModerationTable from "./ModerationTable";
import { approveEvent, rejectEvent } from "@/actions/events";

const EventsTab = () => {
  const { events, fetchEvents } = useEventStore();

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const eventsPending = events.filter((e) => e.status === Status.PENDING);

  return (
    <div className='w-full overflow-hidden relative h-auto rounded-2xl p-10 text-xl md:text-4xl font-bold text-black bg-white border-1 border-edorange border-solid space-y-2'>
      <p>Events Tab</p>
      <ModerationTable
        data={eventsPending}
        onApprove={(id) => approveEvent(id)}
        onReject={(id) => rejectEvent(id)}
        columns={[
          {
            header: "Name",
            accessor: (row) => row.name,
          },
          {
            header: "Created At",
            accessor: (row) =>
              new Date(row.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
          },
          { header: "Status", accessor: (row) => row.status },
        ]}
      />
    </div>
  );
};

export default EventsTab;
