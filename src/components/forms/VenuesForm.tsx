"use client";
import { VenueFormData } from "@/lib/validation/venuesSchema";
import React from "react";
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

const VenuesForm = () => {
  const form = useForm<VenueFormData>({
    defaultValues: {
      name: "",
      address: "",
      city: "",
      zipcode: "",
      state: "",
      lat: 0.0,
      lng: 0.0,
      website_url: "",
      google_map_url: "",
      logo_url: "",
      is_active: false,
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
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 w-2/3'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
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
                <FormControl>
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
                <FormControl>
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
                <FormControl>
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
                  <FormControl>
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
                <FormControl>
                  <Input
                    type='number'
                    min={-90}
                    max={90}
                    placeholder='lat'
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
                <FormControl>
                  <Input
                    type='number'
                    min={-180}
                    max={180}
                    placeholder='lat'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex space-x-4'>
          <FormField
            control={form.control}
            name='website_url'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website Url</FormLabel>
                <FormControl>
                  <Input type='url' placeholder='website url' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='google_map_url'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Google Map Url</FormLabel>
                <FormControl>
                  <Input type='url' placeholder='google map url' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='logo_url'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo Url</FormLabel>
                <FormControl>
                  <Input type='url' placeholder='logo url' {...field} />
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

        <Button type='submit' className='cursor-pointer'>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default VenuesForm;
