"use client";
import { useEventStore } from "@/store/event-store";
import { Status } from "@prisma/client";
import { useEffect } from "react";
import ModerationTable from "../ModerationTable";
import { approveStatus, rejectStatus } from "@/actions/status-change";
import { capitalizeFirstLetterOnly, textBadgeColor } from "@/lib/utils";
import { Badge } from "../ui/badge";

const EventsTab = () => {
  const { events, fetchEvents, approveEvent, rejectEvent } = useEventStore();

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleApprove = async (id: string) => {
    try {
      await approveStatus(id, "venue");
      approveEvent(id);
    } catch (error) {
      console.error("Approval failed:", error);
      fetchEvents();
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectStatus(id, "venue");
      rejectEvent(id);
    } catch (error) {
      console.error("Rejected failed:", error);
      fetchEvents();
    }
  };

  const eventsPending = events.filter((e) => e.status === Status.PENDING);

  return (
    <div className='w-full overflow-hidden relative min-h-52 h-auto rounded-2xl p-10 text-xl md:text-4xl font-bold text-black bg-white border-1 border-edorange border-solid space-y-2'>
      <p>Events Tab</p>
      <ModerationTable
        data={eventsPending}
        onApprove={handleApprove}
        onReject={handleReject}
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
          {
            header: "Status",
            accessor: (row) => (
              <Badge className={textBadgeColor(row.status || "N/A")}>
                {capitalizeFirstLetterOnly(row.status || "N/A")}
              </Badge>
            ),
          },
        ]}
      />
    </div>
  );
};

export default EventsTab;
