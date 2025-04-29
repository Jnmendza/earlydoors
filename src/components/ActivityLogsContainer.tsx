"use client";
import React, { useEffect } from "react";
import ActivityLog from "./ActivityLog";
import { useActivityStore } from "@/store/activity-store";

const ActivityLogsContainer = () => {
  const { logs, fetchLogs } = useActivityStore();

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return (
    <div className='flex-1 overflow-auto rounded-xl bg-muted/50'>
      <div className='p-2'>
        {logs.map(({ action, created_at, message, type }, index) => (
          <ActivityLog
            key={index}
            action={action}
            created_at={created_at}
            message={message}
            type={type}
          />
        ))}
      </div>
    </div>
  );
};

export default ActivityLogsContainer;
