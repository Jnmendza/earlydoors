"use client";
import { useEffect } from "react";
import { Status } from "@prisma/client";
import ModerationTable from "../ModerationTable";
import { approveStatus, rejectStatus } from "@/actions/status-change";
import { useGroupStore } from "@/store/group-store";

const GroupsTab = () => {
  const { groups, fetchGroups } = useGroupStore();

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  const groupsPending = groups.filter((e) => e.status === Status.PENDING);

  return (
    <div className='w-full overflow-hidden relative h-auto rounded-2xl p-10 text-xl md:text-4xl font-bold text-black bg-white border-1 border-edorange border-solid space-y-2'>
      <p>Supporter Groups Tab</p>
      <ModerationTable
        data={groupsPending}
        onApprove={(id) => approveStatus(id, "supportersGroup")}
        onReject={(id) => rejectStatus(id, "supportersGroup")}
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

export default GroupsTab;
