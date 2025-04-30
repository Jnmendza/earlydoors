import { Badge } from "./ui/badge";
import React, { ReactNode } from "react";
import { ActivityType } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import { capitalizeFirstLetterOnly, textBadgeColor } from "@/lib/utils";
import {
  Pencil,
  CirclePlus,
  Trash,
  OctagonMinus,
  ThumbsUp,
} from "lucide-react";
interface ActivityLogProps {
  action: string;
  created_at: Date;
  message: string;
  type: ActivityType;
  index: number;
}

const actionIcons: Record<string, { icon: ReactNode; color: string }> = {
  UPDATE: { icon: <Pencil size={16} />, color: "text-blue-600" },
  DELETE: { icon: <Trash size={16} />, color: "text-red-600" },
  CREATE: { icon: <CirclePlus size={16} />, color: "text-green-600" },
  REJECT: { icon: <OctagonMinus size={16} />, color: "text-red-600" },
  APPROVE: { icon: <ThumbsUp size={16} />, color: "text-green-600" },
};

const ActivityLog = ({
  action,
  created_at,
  message,
  type,
  index,
}: ActivityLogProps) => {
  const normalized = action.toUpperCase();
  const style = actionIcons[normalized] ?? null;

  return (
    <div
      className={`${
        index !== 4 && "border-b-2"
      } flex items-start space-x-3 p-2 mt-4`}
    >
      {style && (
        <div className={`rounded-full p-1 ${style.color}`}>{style.icon}</div>
      )}
      <div className='w-full'>
        <p className='font-semibold text-sm text-ellipsis'>{message}</p>
        <div className='flex items-center justify-between mt-2'>
          <p className='text-xs text-muted-foreground'>
            {formatDistanceToNow(new Date(created_at))} ago
          </p>
          <Badge className={`${textBadgeColor(type)}`}>
            {capitalizeFirstLetterOnly(type)}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;
