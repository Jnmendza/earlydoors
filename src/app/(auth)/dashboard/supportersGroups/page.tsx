"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useGroupStore } from "@/store/group-store";

export default function SupportersGroupsPage() {
  const { groups, fetchGroups, isLoading, error } = useGroupStore();

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);
  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>All Supporters Groups</h1>
        <Button asChild>
          <Link href='/dashboard/events/create'>+ Create New Group</Link>
        </Button>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p className='text-red-500'>{error}</p>}
      {!isLoading && groups?.length === 0 && <p>No events found.</p>}

      <ul className='space-y-4'>
        {groups?.map((group) => (
          <li
            key={group.id}
            className='border p-4 rounded flex justify-between items-center'
          >
            <div>
              <h2 className='font-medium'>{group.name}</h2>
            </div>
            <div className='space-x-2'>
              <Button variant='outline' asChild>
                <Link href={`/dashboard/supportersGroups/${group.id}/edit`}>
                  Edit
                </Link>
              </Button>
              {/* Add a delete button or modal here later */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
