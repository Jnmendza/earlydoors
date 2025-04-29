"use client";
import React, { useEffect } from "react";
import ActivityLog from "./ActivityLog";
import { useActivityStore } from "@/store/activity-store";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const ActivityLogsContainer = () => {
  const { logs, fetchLogs } = useActivityStore();

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className='overflow-y-scroll'>
        {logs.map(({ action, created_at, message, type }, index) => (
          <ActivityLog
            key={index}
            index={index}
            action={action}
            created_at={created_at}
            message={message}
            type={type}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default ActivityLogsContainer;
