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
}

const actionIcons: Record<string, ReactNode> = {
  UPDATE: <Pencil size={16} className='text-blue-600' />,
  DELETE: <Trash size={16} className='text-red-600' />,
  CREATE: <CirclePlus size={16} className='text-green-600' />,
  REJECT: <OctagonMinus size={16} className='text-red-600' />,
  APPROVE: <ThumbsUp size={16} className='text-green-600' />,
};

const ActivityLog = ({
  action,
  created_at,
  message,
  type,
}: ActivityLogProps) => {
  const normalized = action.toUpperCase();
  const icon = actionIcons[normalized] ?? null;
  return (
    <div className='flex items-start space-x-3 p-2 border-b-2 mt-4'>
      {icon}
      <div>
        <p className='font-semibold text-sm'>{message}</p>
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
