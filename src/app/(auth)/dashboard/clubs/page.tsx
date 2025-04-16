"use client";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { DeleteDialog } from "@/components/DeleteDialog";
import { useClubStore } from "@/store/club-store";
import { useEffect } from "react";

export default function ClubsCreatePage() {
  const { clubs, fetchClubs } = useClubStore();

  useEffect(() => {
    fetchClubs();
  }, [fetchClubs]);

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>All Clubs</h1>
        <Button asChild>
          <Link href='/dashboard/clubs/create'>+ Create A New Club</Link>
        </Button>
      </div>
      <ul className='space-y-4'>
        {clubs.map((club) => (
          <li
            key={club.id}
            className='border p-4 rounded-md flex justify-between items-center'
          >
            <div>
              <p className='text-lg font-semibold'>{club.name}</p>
              <p className='text-sm text-gray-500'>
                League: {club.league} | Country: {club.country}
              </p>
              <p className='text-sm text-gray-400'>
                Created: {format(new Date(club.created_at), "PPP")}
              </p>
            </div>

            <div className='space-x-2'>
              <DeleteDialog
                id={club.id}
                name={club.name}
                type='club'
                onDeleteSuccess={fetchClubs}
              />
              <Button variant='outline' asChild>
                <Link href={`/dashboard/clubs/${club.id}/edit`}>Edit</Link>
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
