import { EventFormData } from "@/lib/validation/eventsSchema";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useEvents = () => {
  const { data, error, mutate, isLoading } = useSWR("/api/events", fetcher);

  const createEvent = async (data: EventFormData) => {
    const res = await fetch("/api/events", {
      method: "POST",
      body: JSON.stringify(data),
    });
    mutate();
    return res.json();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateEvent = async (id: string, data: any) => {
    const res = await fetch(`/api/events/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    mutate();
    return res.json();
  };

  const deleteEvent = async (id: string) => {
    await fetch(`/api/events/${id}`, { method: "DELETE" });
    mutate();
  };

  return {
    events: data,
    isLoading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
  };
};
