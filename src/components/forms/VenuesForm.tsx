"use client";
import { VenueFormData, venueFormSchema } from "@/lib/validation/venuesSchema";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { US_STATES } from "@/constants/us-states";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

type VenuesFormProps = {
  initialData?: VenueFormData;
  venueId?: string;
};

const VenuesForm = ({ initialData, venueId }: VenuesFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<VenueFormData>({
    resolver: zodResolver(venueFormSchema),
    defaultValues: initialData ?? {
      name: "",
      address: "",
      city: "",
      zipcode: "",
      state: "",
      lat: undefined,
      lng: undefined,
      website_url: "",
      google_maps_url: "",
      logo_url: "",
      is_active: false,
      has_garden: false,
      has_big_screen: false,
      has_outdoor_screens: false,
      is_bookable: false,
    },
  });

  const onSubmit = (values: VenueFormData) => {
    setIsLoading(true);

    const promise = async () => {
      const res = await fetch(
        venueId ? `/api/venues/${venueId}` : "/api/venues",
        {
          method: venueId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.message || "Failed to create venue");
      }

      return { name: values.name };
    };

    toast.promise(promise, {
      loading: venueId ? "Updating venue..." : "Creating venue...",
      success: (data) => {
        setIsLoading(false);
        if (!venueId) {
          form.reset({
            name: "",
            address: "",
            city: "",
            zipcode: "",
            state: "",
            lat: undefined,
            lng: undefined,
            website_url: "",
            google_maps_url: "",
            logo_url: "",
            is_active: false,
            has_garden: false,
            has_big_screen: false,
            has_outdoor_screens: false,
            is_bookable: false,
          });
        }
        return `${data.name} was successfully created!`;
      },
      error: (err) => {
        setIsLoading(false);
        return (
          err.message ||
          "An unexpected error occured while attempting to create a venue."
        );
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 w-2/3'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl className='rounded-none'>
                <Input placeholder='name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex space-x-4'>
          <FormField
            control={form.control}
            name='address'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Address</FormLabel>
                <FormControl className='rounded-none'>
                  <Input placeholder='address' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='city'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>City</FormLabel>
                <FormControl className='rounded-none'>
                  <Input placeholder='city' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex space-x-4'>
          <FormField
            control={form.control}
            name='zipcode'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Zipcode</FormLabel>
                <FormControl className='rounded-none'>
                  <Input placeholder='zipcode' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='state'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>State</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className='rounded-none'>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select a state' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>States</SelectLabel>
                      {US_STATES.map(({ label, value }, index) => (
                        <SelectItem key={index} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex space-x-4'>
          <FormField
            control={form.control}
            name='lat'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Latitude</FormLabel>
                <FormControl className='rounded-none'>
                  <Input
                    type='any'
                    min={-90}
                    max={90}
                    placeholder='e.g 32.715736'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='lng'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Longitude</FormLabel>
                <FormControl className='rounded-none'>
                  <Input
                    type='any'
                    min={-180}
                    max={180}
                    placeholder='e.g -117.161087'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex gap-4'>
          <FormField
            control={form.control}
            name='website_url'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Website Url</FormLabel>
                <FormControl className='rounded-none'>
                  <Input
                    type='url'
                    placeholder='https://example.com'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='google_maps_url'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Google Map Url</FormLabel>
                <FormControl className='rounded-none'>
                  <Input
                    type='url'
                    placeholder='https://www.google.com/maps..'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='logo_url'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Logo Url</FormLabel>
                <FormControl className='rounded-none'>
                  <Input
                    type='url'
                    placeholder='https://example.com/logo.png'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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

        {venueId ? (
          <Button
            className='rounded-none cursor-pointer'
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update"}
          </Button>
        ) : (
          <Button
            type='submit'
            className='cursor-pointer rounded-none'
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        )}
      </form>
    </Form>
  );
};

export default VenuesForm;
