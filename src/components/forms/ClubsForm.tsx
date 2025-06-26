"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useForm, UseFormSetValue } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { ClubFormData, clubFormSchema } from "@/lib/validation/clubsSchema";
import { Input } from "../ui/input";
import { TOP_LEAGUES } from "@/constants/leagues";
import { COUNTRIES } from "@/constants/countries";
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
import Image from "next/image";
import { CiImageOn } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { createFormData, createImagePreview } from "@/lib/form";

type ClubsFormProps = {
  initialData?: ClubFormData;
  clubId?: string;
};

const ClubsForm = ({ initialData, clubId }: ClubsFormProps) => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<ClubFormData>({
    resolver: zodResolver(clubFormSchema),
    defaultValues: initialData ?? {
      name: "",
      logo_url: undefined,
      league: "",
      country: "",
    },
  });

  useEffect(() => {
    if (initialData?.logo_url) {
      if (typeof initialData.logo_url === "string") {
        setImageUrl(initialData.logo_url);
      }
      form.setValue("logo_url", initialData.logo_url);
      // form.reset(initialData);
    }
  }, [initialData, form]);

  const resetForm = useCallback(() => {
    form.reset({
      name: "",
      logo_url: undefined,
      league: "",
      country: "",
    });
    setImageUrl("");
  }, [form]);

  const handleSuccess = useCallback(
    (response: {
      success: boolean;
      data: {
        club: { name: string };
        redirectTo: string;
      };
    }) => {
      toast.success(
        `${response.data.club.name} was successfully ${
          clubId ? "updated" : "created"
        }!`
      );
      if (!clubId) {
        resetForm();
        router.push(response.data.redirectTo);
      } else {
        router.push(response.data.redirectTo);
      }
    },
    [router, clubId, resetForm]
  );

  const onSubmit = async (values: ClubFormData) => {
    setIsLoading(true);
    let finalLogoUrl = values.logo_url;

    try {
      if (values.logo_url instanceof File) {
        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: createFormData(values.logo_url, "clubs"),
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
      };

      const response = await fetch(
        clubId ? `/api/clubs/${clubId}` : "/api/clubs",
        {
          method: clubId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          response.status === 409
            ? "Club with this name already exists"
            : error?.message || "Failed to save club"
        );
      }

      const data = await response.json();
      console.log("RESPONSE DATA", data);
      handleSuccess(data);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unexpected error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveLogo = (setValue: UseFormSetValue<ClubFormData>) => {
    setValue("logo_url", null);
    setImageUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setValue: UseFormSetValue<ClubFormData>
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 w-2/3'>
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
                  <FormLabel>Club Logo</FormLabel>
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
        <div className='flex space-x-4'>
          <FormField
            control={form.control}
            name='league'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>League</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className='rounded-none'>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select a league' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Leagues</SelectLabel>
                      {TOP_LEAGUES.map(({ label, value }, index) => (
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
          <FormField
            control={form.control}
            name='country'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Country</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className='rounded-none'>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select a country' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Country</SelectLabel>
                      {COUNTRIES.map(({ label, value }, index) => (
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
        <Button
          type='submit'
          className='cursor-pointer rounded-none bg-edorange'
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default ClubsForm;
