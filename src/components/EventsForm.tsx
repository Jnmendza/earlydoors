"use client";

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
import { EventFormData } from "@/lib/validation/eventsSchema";
import { useForm } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import { Calendar } from "./ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const EventsForm = () => {
  const form = useForm<EventFormData>({
    defaultValues: {
      name: "",
      description: "",
      start_time: "",
      end_time: "",
      venue_id: "",
      team_id: "",
      has_garden: false,
      has_big_screen: false,
      has_outdoor_screens: false,
      is_bookable: false,
    },
  });

  const onSubmit = () => {
    console.log("On submit clicked");
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-10 w-2/3'>
        {/* Name and Date */}
        <div className='flex justify-between space-x-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='name' {...field} />
                </FormControl>
                <FormDescription>Name your upcoming event</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='start_time'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Start Time</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
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
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
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
                  className='h-[100px]' // Replace with your desired class for styling
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
                  <FormControl className='w-full'>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a football team' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='m@example.com'>m@example.com</SelectItem>
                    <SelectItem value='m@google.com'>m@google.com</SelectItem>
                    <SelectItem value='m@support.com'>m@support.com</SelectItem>
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
                <FormLabel>Venue</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className='w-full'>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a venue for your event' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='m@example.com'>m@example.com</SelectItem>
                    <SelectItem value='m@google.com'>m@google.com</SelectItem>
                    <SelectItem value='m@support.com'>m@support.com</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Filters */}
        <FormLabel>Venue Details</FormLabel>
        <div className='grid grid-cols-2 gap-6 -mt-4'>
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
                    className='h-4 w-4'
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
                    className='h-4 w-4'
                  />
                </FormControl>
                <FormLabel className='!mb-0'>Bookable</FormLabel>
              </FormItem>
            )}
          />
        </div>

        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
};

export default EventsForm;
