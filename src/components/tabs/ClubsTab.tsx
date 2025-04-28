"use client";
import { useEffect } from "react";
import { useClubStore } from "@/store/club-store";
import { Status } from "@prisma/client";
import ModerationTable from "../ModerationTable";
import { approveStatus, rejectStatus } from "@/actions/status-change";
import { capitalizeFirstLetterOnly, textBadgeColor } from "@/lib/utils";
import { Badge } from "../ui/badge";

const ClubsTab = () => {
  const { clubs, fetchClubs } = useClubStore();

  useEffect(() => {
    fetchClubs();
  }, [fetchClubs]);

  const clubsPending = clubs.filter((e) => e.status === Status.PENDING);

  return (
    <div className='w-full overflow-hidden relative h-auto rounded-2xl p-10 text-xl md:text-4xl font-bold text-black bg-white border-1 border-edorange border-solid space-y-2'>
      <p>Clubs Tab</p>
      <ModerationTable
        data={clubsPending}
        onApprove={(id) => approveStatus(id, "club")}
        onReject={(id) => rejectStatus(id, "club")}
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

export default ClubsTab;
