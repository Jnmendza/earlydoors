"use client";
import { VenueFormData, venueFormSchema } from "@/lib/validation/venuesSchema";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { useForm, UseFormSetValue } from "react-hook-form";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LuLoaderCircle } from "react-icons/lu";
import { createFormData, createImagePreview } from "@/lib/form";
import MultiSelect from "./MultiSelect";
import { useClubStore } from "@/store/club-store";

type VenuesFormProps = {
  initialData?: VenueFormData;
  venueId?: string;
};

const VenuesForm = ({ initialData, venueId }: VenuesFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [selectedClubIds, setSelectedClubIds] = useState<string[]>(
    initialData?.club_affiliates ?? []
  );
  const [clubAffiliatesTouched, setClubAffiliatesTouched] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { clubs, fetchClubs } = useClubStore();
  console.log(selectedClubIds);
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
      club_affiliates: [],
    },
  });

  useEffect(() => {
    if (initialData?.logo_url) {
      if (typeof initialData.logo_url === "string") {
        setImageUrl(initialData.logo_url);
      }
      form.setValue("logo_url", initialData.logo_url);
    }
    if (initialData?.club_affiliates) {
      if (initialData.club_affiliates.length > 0) {
        setSelectedClubIds(initialData.club_affiliates);
      }
      form.setValue("club_affiliates", initialData.club_affiliates);
    }
    fetchClubs();
  }, [initialData, form, fetchClubs]);

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setValue: UseFormSetValue<VenueFormData>
  ) => {
    const file = e.target.files?.[0];
    setValue("logo_url", file);

    if (file) {
      try {
        const previewUrl = await createImagePreview(file);
        setImageUrl(previewUrl);
      } catch {
        toast.error("Failed to create image preview");
      }
    } else {
      setImageUrl(
        typeof initialData?.logo_url === "string" ? initialData.logo_url : ""
      );
    }
  };

  const handleRemoveLogo = (setValue: UseFormSetValue<VenueFormData>) => {
    setValue("logo_url", null);
    setImageUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const resetForm = useCallback(() => {
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
  }, [form]);

  const handleSuccess = useCallback(
    (response: {
      success: boolean;
      data: {
        venue: { name: string };
        redirectTo: string;
      };
    }) => {
      toast.success(
        `${response.data.venue.name} was successfully ${
          venueId ? "updated" : "created"
        }!`
      );
      if (!venueId) {
        resetForm();
        router.push(response.data.redirectTo);
      } else {
        router.push(response.data.redirectTo);
      }
    },
    [router, venueId, resetForm]
  );

  // Form control for the controlled component MultiSelect
  form.setValue("club_affiliates", selectedClubIds);

  const onSubmit = async (values: VenueFormData) => {
    setIsLoading(true);
    let finalLogoUrl = values.logo_url;

    try {
      if (values.logo_url instanceof File) {
        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: createFormData(values.logo_url, "venues"),
        });

        if (!uploadResponse.ok) {
          const error = await uploadResponse.json();
          throw new Error(
            uploadResponse.status === 413
              ? "Image too large (max 5MB)"
              : error.error || "Image upload failed"
          );
        }

        const { url } = await uploadResponse.json();
        finalLogoUrl = url;
      } else if (values.logo_url === null) {
        finalLogoUrl = "";
      }

      const payload = {
        ...values,
        logo_url: typeof finalLogoUrl === "string" ? finalLogoUrl : "",
        club_affiliates: clubAffiliatesTouched ? selectedClubIds : undefined,
      };

      const response = await fetch(
        venueId ? `/api/venues/${venueId}` : "/api/venues",
        {
          method: venueId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          response.status === 409
            ? "Venue with this name already exists"
            : error?.message || "Failed to save venue"
        );
      }

      const data = await response.json();
      handleSuccess(data);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
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
                  <div className='relative w-24 h-24 flex items-center justify-center border rounded-md overflow-hidden bg-gray-50'>
                    {imageUrl ? (
                      <>
                        <Image
                          src={imageUrl}
                          alt='Current venue logo'
                          className='w-full h-full object-contain'
                          width={96}
                          height={96}
                        />
                        <button
                          type='button'
                          className='absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'
                          onClick={() => handleRemoveLogo(form.setValue)}
                        >
                          ×
                        </button>
                      </>
                    ) : (
                      <CiImageOn className='w-10 h-10 text-gray-400' />
                    )}
                  </div>

                  <div className='flex-1 space-y-2'>
                    <FormLabel>Venue Logo</FormLabel>
                    <div className='flex items-center gap-2'>
                      <FormControl className='rounded-none'>
                        <Input
                          type='file'
                          accept='image/*'
                          onChange={(e) => handleFileChange(e, form.setValue)}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={fileInputRef}
                          className='w-full'
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                    {initialData?.logo_url && !imageUrl && (
                      <p className='text-sm text-muted-foreground'>
                        Current logo will be removed on save
                      </p>
                    )}
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

        <div>
          <FormLabel className='mb-2'>Club Affiliates</FormLabel>
          <MultiSelect
            type='club affiliates'
            options={clubs}
            selectedOptions={selectedClubIds}
            onChange={setSelectedClubIds}
            onTouched={() => setClubAffiliatesTouched(true)}
          />
        </div>

        <Button
          type='submit'
          className='rounded-none cursor-pointer bg-edorange'
          disabled={isLoading}
        >
          {isLoading ? (
            <div className='flex items-center gap-2'>
              <LuLoaderCircle className='h-4 w-4 animate-spin' />
              {venueId ? "Updating..." : "Creating..."}
            </div>
          ) : venueId ? (
            "Update"
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default VenuesForm;
