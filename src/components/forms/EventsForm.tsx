"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { EventFormData, eventFormSchema } from "@/lib/validation/eventsSchema";
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import RequiredLabel from "../RequiredLabel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useClubStore } from "@/store/club-store";
import { useVenueStore } from "@/store/venue-store";
import SelectItemWithIcon from "../SelectItemWithIcon";
import { toast } from "sonner";
import { useEventStore } from "@/store/event-store";
import { useGroupStore } from "@/store/group-store";
import { hrs, mins } from "@/lib/dateUtils";
import { Separator } from "../ui/separator";

type EventsFormProps = {
  initialData?: EventFormData;
  eventId?: string;
};

const EventsForm = ({ initialData, eventId }: EventsFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { fetchClubs, clubs } = useClubStore();
  const { fetchVenues, venues } = useVenueStore();
  const { updateEvent, addEvent } = useEventStore();
  const { groups, fetchGroups } = useGroupStore();
  const router = useRouter();

  useEffect(() => {
    fetchClubs();
    fetchVenues();
    fetchGroups();
  }, [fetchClubs, fetchVenues, fetchGroups]);

  const form = useForm<EventFormData>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialData ?? {
      name: "",
      description: "",
      date: undefined,
      venue_id: "",
      club_id: "",
      supporters_group_id: "",
      has_garden: false,
      has_big_screen: false,
      has_outdoor_screens: false,
      is_bookable: false,
    },
  });

  // Compares new data with initial data
  const {
    formState: { isDirty },
  } = form;

  // Split initial date into date, hour, and minute for preselection
  const initialDate = initialData?.date
    ? new Date(initialData.date)
    : undefined;
  const initialHour = initialDate
    ? initialDate.getHours().toString().padStart(2, "0")
    : hrs[0];
  const initialMinute = initialDate
    ? initialDate.getMinutes().toString().padStart(2, "0")
    : mins[0];

  const onSubmit = async (values: EventFormData) => {
    setIsLoading(true);
    const cleanValues = {
      ...values,
      date: values.date
        ? format(new Date(values.date), "yyyy-MM-dd")
        : undefined, // Extract date only (e.g., "2025-06-30")
      start_time: values.date
        ? format(new Date(values.date), "HH:mm")
        : undefined, // Extract time only (e.g., "15:30")
    };

    const promise = async () => {
      const res = await fetch(
        eventId ? `/api/events/${eventId}` : "/api/events",
        {
          method: eventId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cleanValues),
        }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.message || "Failed to create event");
      }

      const updatedEvent = await res.json();

      if (eventId) {
        updateEvent(updatedEvent);
      } else {
        addEvent(updatedEvent);
      }

      return { name: updateEvent.name };
    };

    toast.promise(promise, {
      loading: eventId ? "Updating event..." : "Creating event...",
      success: (data) => {
        setIsLoading(false);
        if (!eventId) {
          form.reset({
            name: "",
            description: "",
            date: undefined,
            venue_id: "",
            club_id: "",
            has_garden: undefined,
            has_big_screen: undefined,
            has_outdoor_screens: undefined,
            is_bookable: undefined,
          });
        } else {
          router.push("/dashboard/events");
        }
        return `${data.name} was successfully ${
          eventId ? "updated" : "created"
        }!`;
      },
      error: (err) => {
        setIsLoading(false);
        return (
          err.message ||
          "An unexpected error occurred while attempting to create an event."
        );
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) =>
          console.log("Validation errors", errors)
        )}
        className='space-y-6 w-2/3'
      >
        <FormField
          control={form.control}
          name='date'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>
                <RequiredLabel label='Date and Time' />
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground rounded-none"
                      )}
                    >
                      {field.value ? (
                        format(new Date(field.value), "PPP HH:mm")
                      ) : (
                        <span>Pick a date and time</span>
                      )}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <div className='p-3 flex'>
                    <Calendar
                      mode='single'
                      className='bg-white border-2 border-gray'
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(selectedDate) => {
                        const currentDate = field.value
                          ? new Date(field.value)
                          : new Date();
                        const newDate = selectedDate || currentDate;
                        newDate.setHours(
                          Number(initialHour),
                          Number(initialMinute)
                        );
                        field.onChange(newDate);
                      }}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                        date >
                          new Date(
                            new Date().setMonth(new Date().getMonth() + 8)
                          )
                      }
                      initialFocus
                    />
                    <div className='flex flex-col bg-white space-x-2 mt-2 py-2 border-t-2 border-r-2 border-b-2 border-gray'>
                      <FormLabel className='p-2 mx-auto'>
                        Select a time
                      </FormLabel>
                      <Separator orientation='horizontal' />
                      <div className='flex flex-col space-y-4 mt-4 p-4'>
                        <div className='flex flex-col w-full'>
                          <FormLabel className='ml-2 mb-2'>Hour</FormLabel>
                          <Select
                            onValueChange={(hour) => {
                              const currentDate = field.value
                                ? new Date(field.value)
                                : new Date();
                              currentDate.setHours(Number(hour));
                              field.onChange(currentDate);
                            }}
                            defaultValue={initialHour}
                          >
                            <SelectTrigger className='w-full rounded-none bg-white'>
                              <SelectValue placeholder='Hour' />
                            </SelectTrigger>
                            <SelectContent>
                              {hrs.map((hour) => (
                                <SelectItem key={hour} value={hour}>
                                  {hour}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className='flex flex-col w-full bg-white'>
                          <FormLabel className='ml-2 mb-2'>Mins</FormLabel>
                          <Select
                            onValueChange={(minute) => {
                              const currentDate = field.value
                                ? new Date(field.value)
                                : new Date();
                              currentDate.setMinutes(Number(minute));
                              field.onChange(currentDate);
                            }}
                            defaultValue={initialMinute}
                          >
                            <SelectTrigger className='w-full rounded-none bg-white'>
                              <SelectValue placeholder='Minute' />
                            </SelectTrigger>
                            <SelectContent>
                              {mins.map((minute) => (
                                <SelectItem key={minute} value={minute}>
                                  {minute}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-between space-x-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>
                  <RequiredLabel label='Event Name' />
                </FormLabel>
                <FormControl className='rounded-none'>
                  <Input placeholder='name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='supporters_group_id'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Host Group</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className='w-full rounded-none'>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a group for your event' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {groups.map(({ id, name, group_logo_url }, index) => (
                      <SelectItemWithIcon
                        key={index}
                        id={id}
                        logoUrl={group_logo_url ?? ""}
                        value={name}
                      />
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        {/* Description */}
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='description'
                  {...field}
                  className='h-[100px] rounded-none' // Replace with your desired class for styling
                />
              </FormControl>
              <FormDescription>
                Provide a detailed description of your event
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Club and Venue */}
        <div className='flex justify-start space-x-10'>
          <FormField
            control={form.control}
            name='club_id'
            render={({ field }) => (
              <FormItem className='w-1/2'>
                <FormLabel>Club</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className='w-full rounded-none'>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a football club' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {clubs.map(({ id, logo_url, name }, index) => (
                      <SelectItemWithIcon
                        key={index}
                        id={id}
                        logoUrl={logo_url ?? ""}
                        value={name}
                      />
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='venue_id'
            render={({ field }) => (
              <FormItem className='w-1/2'>
                <FormLabel>
                  <RequiredLabel label='Venue' />
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className='w-full rounded-none'>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a venue for your event' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {venues.map((venue, index) => (
                      <SelectItem key={index} value={venue.id}>
                        {venue.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Filters */}
        <FormLabel>Venue Details</FormLabel>
        <div className='grid grid-cols-2 gap-4 -mt-3 w-2/3'>
          <FormField
            control={form.control}
            name='has_garden'
            render={({ field }) => (
              <FormItem className='flex items-center space-x-3 space-y-0'>
                <FormControl>
                  <input
                    type='checkbox'
                    checked={field.value}
                    onChange={field.onChange}
                    className='h-4 w-4 rounded-none'
                  />
                </FormControl>
                <FormLabel className='!mb-0'>Has Garden</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='has_big_screen'
            render={({ field }) => (
              <FormItem className='flex items-center space-x-3 space-y-0'>
                <FormControl>
                  <input
                    type='checkbox'
                    checked={field.value}
                    onChange={field.onChange}
                    className='h-4 w-4'
                  />
                </FormControl>
                <FormLabel className='!mb-0'>Has Big Screen</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='has_outdoor_screens'
            render={({ field }) => (
              <FormItem className='flex items-center space-x-3 space-y-0'>
                <FormControl>
                  <input
                    type='checkbox'
                    checked={field.value}
                    onChange={field.onChange}
                    className='h-4 w-4'
                  />
                </FormControl>
                <FormLabel className='!mb-0'>Outdoor Screens</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='is_bookable'
            render={({ field }) => (
              <FormItem className='flex items-center space-x-3 space-y-0'>
                <FormControl>
                  <input
                    type='checkbox'
                    checked={field.value}
                    onChange={field.onChange}
                    className='h-4 w-4 rounded-none'
                  />
                </FormControl>
                <FormLabel className='!mb-0'>Bookable</FormLabel>
              </FormItem>
            )}
          />
        </div>
        {eventId ? (
          <Button
            className='rounded-none cursor-pointer bg-edorange'
            type='submit'
            disabled={isLoading || !isDirty}
          >
            {isLoading ? "Updating..." : "Update"}
          </Button>
        ) : (
          <Button
            className='rounded-none cursor-pointer bg-edorange'
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        )}
      </form>
    </Form>
  );
};

export default EventsForm;
