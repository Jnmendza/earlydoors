"use client";
import { useEffect } from "react";
import { Status } from "@prisma/client";
import ModerationTable from "../ModerationTable";
import { approveStatus, rejectStatus } from "@/actions/status-change";
import { useVenueStore } from "@/store/venue-store";
import { capitalizeFirstLetterOnly, textBadgeColor } from "@/lib/utils";
import { Badge } from "../ui/badge";

const VenuesTab = () => {
  const { venues, fetchVenues, approveVenue, rejectVenue } = useVenueStore();

  useEffect(() => {
    fetchVenues();
  }, [fetchVenues]);

  const handleApprove = async (id: string) => {
    try {
      await approveStatus(id, "venue");
      approveVenue(id);
    } catch (error) {
      console.error("Approval failed:", error);
      fetchVenues();
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectStatus(id, "venue");
      rejectVenue(id);
    } catch (error) {
      console.error("Rejected failed:", error);
      fetchVenues();
    }
  };

  const clubsPending = venues.filter((e) => e.status === Status.PENDING);

  return (
    <div className='w-full overflow-hidden relative h-auto rounded-2xl p-10 text-xl md:text-4xl font-bold text-black bg-white border-1 border-edorange border-solid space-y-2'>
      <p>Venues Tab</p>
      <ModerationTable
        data={clubsPending}
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

export default VenuesTab;
