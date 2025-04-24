"use client";
import React, { useEffect } from "react";
import { useActivityStore } from "@/store/activity-store";

const ActivityLog = () => {
  const { logs, fetchLogs } = useActivityStore();
  console.log("logs", logs);
  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);
  return <div>ActivityLog</div>;
};

export default ActivityLog;
