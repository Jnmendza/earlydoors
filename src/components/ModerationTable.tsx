"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CircleCheck, CirclePlus } from "lucide-react";
import { Button } from "./ui/button";

type ModerationTableProps<T> = {
  data: T[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  columns: {
    header: string;
    accessor: (row: T) => React.ReactNode;
  }[];
};

// name, create_at, status

const ModerationTable = <T extends { id: string }>({
  data,
  onApprove,
  onReject,
  columns,
}: ModerationTableProps<T>) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col, i) => (
            <TableHead key={i}>{col.header}</TableHead>
          ))}
          <TableHead className='text-right'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.id}>
            {columns.map((col, i) => (
              <TableCell key={i}>{col.accessor(row)}</TableCell>
            ))}
            <TableCell className='flex justify-end gap-2'>
              <Button
                onClick={() => onReject(row.id)}
                size='sm'
                variant='outline'
                className='cursor-pointer z-100'
              >
                <CirclePlus
                  className='text-red-700 rotate-45'
                  strokeWidth={3}
                />
              </Button>
              <Button
                onClick={() => onApprove(row.id)}
                size='sm'
                className='cursor-pointer z-100'
              >
                <CircleCheck className='text-green-700 ' strokeWidth={3} />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ModerationTable;
