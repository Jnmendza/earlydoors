"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useGroupStore } from "@/store/group-store";
import { DeleteDialog } from "@/components/DeleteDialog";
import Image from "next/image";
import { cleanInstagramHandle } from "@/lib/utils";

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
            <div className='flex items-center space-x-4'>
              {group.group_logo_url && (
                <Image
                  src={group.group_logo_url}
                  alt='supporters-group-logo'
                  width={50}
                  height={50}
                />
              )}
              <div>
                <h2 className='font-medium'>{group.name}</h2>
                <p className='text-sm'>
                  {group.city} &nbsp;·&nbsp;
                  {group.ig_handle ? (
                    <Link
                      href={`https://www.instagram.com/${cleanInstagramHandle(
                        group.ig_handle
                      )}`}
                      className='text-edorange'
                    >
                      {group.ig_handle}
                    </Link>
                  ) : null}
                </p>
              </div>
            </div>
            <div className='space-x-2'>
              <DeleteDialog
                id={group.id}
                name={group.name}
                type='supportersGroup'
                onDeleteSuccess={fetchGroups}
              />
              <Button variant='outline' asChild>
                <Link href={`/dashboard/supportersGroups/${group.id}/edit`}>
                  Edit
                </Link>
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
