"use client";
import { useEffect, useState } from "react";
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
import { useTeamStore } from "@/store/team-store";
import { useVenueStore } from "@/store/venue-store";
import SelectItemWithIcon from "../SelectItemWithIcon";
import { toast } from "sonner";

const EventsForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { fetchTeams, teams } = useTeamStore();
  const { fetchVenues, venues } = useVenueStore();

  useEffect(() => {
    fetchTeams();
    fetchVenues();
  }, [fetchTeams, fetchVenues]);

  const form = useForm<EventFormData>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      name: "",
      description: "",
      start_time: "",
      date: undefined,
      venue_id: "",
      team_id: "",
      has_garden: false,
      has_big_screen: false,
      has_outdoor_screens: false,
      is_bookable: false,
    },
  });

  const onSubmit = async (values: EventFormData) => {
    setIsLoading(true);
    const cleanValues = {
      ...values,
      date: values.date.toISOString(), // 🔥 convert to ISO string
    };

    const promise = async () => {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanValues),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.message || "Failed to create event");
      }

      return { name: values.name };
    };

    toast.promise(promise, {
      loading: "Creating event...",
      success: (data) => {
        setIsLoading(false);
        return `${data.name} was successfully created!`;
      },
      error: (err) => {
        setIsLoading(false);
        return err.message || "An unexpected error occurred";
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
        <div className='flex justify-between space-x-4'>
          <FormField
            control={form.control}
            name='date'
            render={({ field }) => (
              <FormItem className='flex flex-col w-full'>
                <FormLabel>
                  <RequiredLabel label='Date' />
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
                          format(new Date(field.value), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      className='bg-white border-2 border-gray'
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={field.onChange}
                      disabled={
                        (date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0)) || // ✅ block past dates
                          date >
                            new Date(
                              new Date().setMonth(new Date().getMonth() + 8)
                            ) // ⛔️ 8 months into the future
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='start_time'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>
                  <RequiredLabel label='Start Time (HH:mm)' />
                </FormLabel>
                <FormControl className='rounded-none'>
                  <Input placeholder='eg. 15:30' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
              <FormDescription>Name your upcoming event</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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
        {/* Team and Venue */}
        <div className='flex justify-start space-x-10'>
          <FormField
            control={form.control}
            name='team_id'
            render={({ field }) => (
              <FormItem className='w-1/2'>
                <FormLabel>Team</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className='w-full rounded-none'>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a football team' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {teams.map(({ id, logo_url, name }, index) => (
                      <SelectItemWithIcon
                        key={index}
                        teamId={id}
                        teamLogoUrl={logo_url}
                        teamName={name}
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

        <Button
          className='rounded-none cursor-pointer'
          type='submit'
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default EventsForm;
