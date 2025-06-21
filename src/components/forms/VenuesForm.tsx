"use client";
import { VenueFormData, venueFormSchema } from "@/lib/validation/venuesSchema";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { US_STATES } from "@/constants/us-states";
import { CiImageOn } from "react-icons/ci";
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
import Image from "next/image";
import { toast } from "sonner";

type VenuesFormProps = {
  initialData?: VenueFormData;
  venueId?: string;
};

const VenuesForm = ({ initialData, venueId }: VenuesFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  console.log("Upload Progress", uploadProgress);
  const form = useForm<VenueFormData>({
    resolver: zodResolver(venueFormSchema),
    defaultValues: initialData ?? {
      name: "",
      address: "",
      city: "",
      zipcode: "",
      state: "",
      website_url: "",
      google_maps_url: "",
      logo_url: undefined,
      is_active: false,
      has_garden: false,
      has_big_screen: false,
      has_outdoor_screens: false,
      is_bookable: false,
    },
  });

  const onSubmit = async (values: VenueFormData) => {
    setIsLoading(true);
    let finalLogoUrl = initialData?.logo_url;

    try {
      // 1. Handle image upload if new file was selected
      if (values.logo_url instanceof File) {
        const formData = new FormData();
        formData.append("file", values.logo_url);
        formData.append("folder", "venues");

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) {
          const error = await uploadResponse.json();
          throw new Error(error.error || "Image upload failed");
        }

        const { url } = await uploadResponse.json();
        finalLogoUrl = url;
        setImageUrl(url);
      }

      // 2. Submit venue data with the final image URL
      const response = await fetch(
        venueId ? `/api/venues/${venueId}` : "/api/venues",
        {
          method: venueId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...values,
            logo_url: finalLogoUrl,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to save venue");
      }

      const data = await response.json();
      toast.success(
        `${data.name} was successfully ${venueId ? "updated" : "created"}!`
      );

      if (!venueId) {
        form.reset({
          name: "",
          address: "",
          city: "",
          zipcode: "",
          state: "",
          website_url: "",
          google_maps_url: "",
          logo_url: undefined,
          is_active: false,
          has_garden: false,
          has_big_screen: false,
          has_outdoor_screens: false,
          is_bookable: false,
        });
        setImageUrl("");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 w-2/3'>
        <div className='flex space-x-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Name</FormLabel>
                <FormControl className='rounded-none'>
                  <Input placeholder='name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='logo_url'
            render={({ field }) => (
              <FormItem className='w-full'>
                <div className='flex items-end gap-4'>
                  {/* Image preview container */}
                  <div className='w-12 h-12 flex items-center justify-center border rounded-md overflow-hidden bg-gray-50'>
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt='venue-logo'
                        className='w-full h-full object-contain'
                        width={12}
                        height={12}
                      />
                    ) : (
                      <CiImageOn className='w-10 h-10 text-gray-400' />
                    )}
                  </div>

                  {/* Input container */}
                  <div className='flex-1 space-y-2'>
                    <FormLabel>Venue Logo</FormLabel>
                    <FormControl className='rounded-none'>
                      <Input
                        type='file'
                        accept='image/*'
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          field.onChange(file);
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              setImageUrl(event.target?.result as string);
                            };
                            reader.readAsDataURL(file);
                          } else {
                            setImageUrl("");
                          }
                        }}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </div>
              </FormItem>
            )}
          />
        </div>
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
          {/* <FormField
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
          /> */}
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
