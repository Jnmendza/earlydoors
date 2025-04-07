"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventFormSchema, EventFormData } from "@/lib/validation/eventsSchema";
import { useEvents } from "@/hooks/use-events";

type Props = {
  defaultValues?: EventFormData;
  eventId?: string;
  onSuccess?: () => void;
};

const EventsForm = ({ defaultValues, eventId, onSuccess }: Props) => {
  const { createEvent, updateEvent } = useEvents();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: EventFormData) => {
    if (eventId) {
      await updateEvent(eventId, data);
    } else {
      await createEvent(data);
    }
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <input {...register("name")} placeholder='Event Name' />
      <input {...register("description")} placeholder='Description' />
      <input {...register("start_time")} type='datetime-local' />
      <input {...register("end_time")} type='datetime-local' />
      <input {...register("venue_id")} placeholder='Venue ID' />
      <input {...register("team_id")} placeholder='Team ID' />
      <label>
        <input type='checkbox' {...register("has_garden")} /> Garden
      </label>
      <label>
        <input type='checkbox' {...register("has_big_screen")} /> Big Screen
      </label>
      <label>
        <input type='checkbox' {...register("has_outdoor_screens")} /> Outdoor
        Screens
      </label>
      <label>
        <input type='checkbox' {...register("is_bookable")} /> Bookable
      </label>

      <button type='submit' className='bg-edgreen text-white px-4 py-2 rounded'>
        {eventId ? "Update Event" : "Create Event"}
      </button>

      {Object.values(errors).length > 0 && (
        <div className='text-red-500'>
          {Object.values(errors).map((err, i) => (
            <p key={i}>{(err as { message: string }).message}</p>
          ))}
        </div>
      )}
    </form>
  );
};

export default EventsForm;
