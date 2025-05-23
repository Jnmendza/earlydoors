"use client";
import { useEffect } from "react";
import { Status } from "@prisma/client";
import ModerationTable from "../ModerationTable";
import { approveStatus, rejectStatus } from "@/actions/status-change";
import { useGroupStore } from "@/store/group-store";
import { capitalizeFirstLetterOnly, textBadgeColor } from "@/lib/utils";
import { Badge } from "../ui/badge";

const GroupsTab = () => {
  const { groups, fetchGroups, rejectGroup, approveGroup } = useGroupStore();

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  const handleApprove = async (id: string) => {
    try {
      await approveStatus(id, "venue");
      approveGroup(id);
    } catch (error) {
      console.error("Approval failed:", error);
      fetchGroups();
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectStatus(id, "venue");
      rejectGroup(id);
    } catch (error) {
      console.error("Rejected failed:", error);
      fetchGroups();
    }
  };

  const groupsPending = groups.filter((e) => e.status === Status.PENDING);

  return (
    <div className='w-full overflow-hidden relative h-auto rounded-2xl p-10 text-xl md:text-4xl font-bold text-black bg-white border-1 border-edorange border-solid space-y-2'>
      <p>Supporter Groups Tab</p>
      <ModerationTable
        data={groupsPending}
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

export default GroupsTab;
