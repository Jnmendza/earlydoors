"use client";

import Link from "next/link";
import { useEventStore } from "@/store/event-store"; // adjust if needed
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { formatDateReadable, formatTimeTo12Hour } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function EventsCreatePage() {
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    events,
    fetchEvents,
    isLoading: eventsLoading,
    error,
  } = useEventStore();

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const onDelete = async (eventId: string, eventName: string) => {
    setLoading(true);

    const promise = async () => {
      const res = await fetch(`/api/events/${eventId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.message || "Failed to delete event");
      }

      await fetchEvents();
      setIsOpen(false);

      return { name: eventName };
    };

    toast.promise(promise, {
      loading: "Deleting event...",
      success: (data) => {
        setLoading(false);
        setInput("");
        return `${data.name} was successfully deleted`;
      },
      error: (err) => {
        setLoading(false);
        return (
          err.message ||
          "An unexpected error occurred while attempting to delete an event."
        );
      },
    });
  };

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>All Events</h1>
        <Button asChild>
          <Link href='/dashboard/events/create'>+ Create New Event</Link>
        </Button>
      </div>

      {error && <p className='text-red-500'>{error}</p>}
      {!eventsLoading && events?.length === 0 && <p>No events found.</p>}

      {eventsLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className='space-y-4'>
          {events?.map((event) => {
            const isMatch = input.trim() === event.name;
            return (
              <li
                key={event.id}
                className='border p-4 rounded flex justify-between items-center'
              >
                <div>
                  <h2 className='font-medium'>{event.name}</h2>
                  <p className='text-sm text-gray-500'>
                    {formatDateReadable(event.date)} @{" "}
                    {formatTimeTo12Hour(event.start_time)}
                  </p>
                </div>
                <div className='space-x-2'>
                  <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                      <Button variant='destructive' className='cursor-pointer'>
                        Delete
                      </Button>
                    </DialogTrigger>
                    <DialogContent className='sm:max-w-[425px]'>
                      <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. Please type in the name
                          of the event to complete the deletion.
                        </DialogDescription>
                      </DialogHeader>
                      <Label>
                        Please enter{" "}
                        <Badge className='font-sans'>{event.name}</Badge>
                      </Label>
                      <Input
                        type='text'
                        id='verify'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                      />
                      <DialogFooter>
                        <Button
                          type='submit'
                          variant='destructive'
                          disabled={!isMatch || loading}
                          className='cursor-pointer'
                          onClick={() => onDelete(event.id, event.name)}
                        >
                          Yes, I am sure i want delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Button variant='outline' asChild>
                    <Link href={`/dashboard/events/${event.id}/edit`}>
                      Edit
                    </Link>
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
