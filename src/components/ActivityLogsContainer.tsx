"use client";
import React, { useEffect } from "react";
import ActivityLog from "./ActivityLog";
import { useActivityStore } from "@/store/activity-store";

const ActivityLogsContainer = () => {
  const { logs, fetchLogs } = useActivityStore();
  console.log("logs", logs); // action, create_at, id, message, referenced_id, type

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return (
    <div className='aspect-video rounded-xl overflow-auto bg-muted/50'>
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
