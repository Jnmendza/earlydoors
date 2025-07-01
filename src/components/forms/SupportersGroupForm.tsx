"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm, UseFormSetValue } from "react-hook-form";
import {
  groupsFormSchema,
  GroupsFormSchema,
} from "@/lib/validation/groupsSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { US_STATES } from "@/constants/us-states";
import { Textarea } from "../ui/textarea";
import RequiredLabel from "../RequiredLabel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useClubStore } from "@/store/club-store";
import SelectItemWithIcon from "../SelectItemWithIcon";
import Image from "next/image";
import { toast } from "sonner";
import { CiImageOn } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { createFormData, createImagePreview } from "@/lib/form";

type SupportersGroupFormProps = {
  initialData?: GroupsFormSchema;
  groupId?: string;
};

const SupportersGroupForm = ({
  initialData,
  groupId,
}: SupportersGroupFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { fetchClubs, clubs } = useClubStore();

  const form = useForm<GroupsFormSchema>({
    resolver: zodResolver(groupsFormSchema),
    defaultValues: initialData ?? {
      name: "",
      club_id: "",
      group_logo_url: undefined,
      city: "",
      description: "",
      website_url: "",
      ig_handle: "",
    },
  });

  useEffect(() => {
    if (initialData?.group_logo_url) {
      if (typeof initialData.group_logo_url === "string") {
        setImageUrl(initialData.group_logo_url);
      }
      form.setValue("group_logo_url", initialData.group_logo_url);
    }
    fetchClubs();
  }, [initialData, form, fetchClubs]);

  const handleRemoveLogo = (setValue: UseFormSetValue<GroupsFormSchema>) => {
    setValue("group_logo_url", null);
    setImageUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const resetForm = useCallback(() => {
    form.reset({
      name: "",
      club_id: "",
      group_logo_url: undefined,
      city: "",
      description: "",
      website_url: "",
      ig_handle: "",
    });
    setImageUrl("");
  }, [form]);

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setValue: UseFormSetValue<GroupsFormSchema>
  ) => {
    const file = e.target.files?.[0];
    setValue("group_logo_url", file);

    if (file) {
      try {
        const previewUrl = await createImagePreview(file);
        setImageUrl(previewUrl);
      } catch {
        toast.error("Failed to create image preview");
      }
    } else {
      setImageUrl(
        typeof initialData?.group_logo_url === "string"
          ? initialData.group_logo_url
          : ""
      );
    }
  };

  const handleSuccess = useCallback(
    (response: {
      success: boolean;
      data: {
        group: { name: string };
        redirectTo: string;
      };
    }) => {
      toast.success(
        `${response.data.group.name} was successfully ${
          groupId ? "updated" : "created"
        }!`
      );
      if (!groupId) {
        resetForm();
        router.push(response.data.redirectTo);
      } else {
        router.push(response.data.redirectTo);
      }
    },
    [router, groupId, resetForm]
  );

  const onSubmit = async (values: GroupsFormSchema) => {
    setIsLoading(true);
    let finalGroupLogoUrl = values.group_logo_url;

    try {
      if (values.group_logo_url instanceof File) {
        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: createFormData(values.group_logo_url, "groups"),
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
        finalGroupLogoUrl = url;
      } else if (values.group_logo_url === null) {
        finalGroupLogoUrl = "";
      }

      const payload = {
        ...values,
        group_logo_url:
          typeof finalGroupLogoUrl === "string" ? finalGroupLogoUrl : "",
      };

      const response = await fetch(
        groupId ? `/api/supportersGroups/${groupId}` : "/api/supportersGroups",
        {
          method: groupId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          response.status === 409
            ? "Group with this name already exists"
            : error?.message || "Failed to save supporters group"
        );
      }

      const data = await response.json();
      handleSuccess(data);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unexpected error"
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
                <FormLabel>
                  <RequiredLabel label='Name' />
                </FormLabel>
                <FormControl className='rounded-none'>
                  <Input placeholder='name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>

          <FormField
            control={form.control}
            name='group_logo_url'
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
                    {initialData?.group_logo_url && !imageUrl && (
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
            name='club_id'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>
                  <RequiredLabel label='Club' />
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className='rounded-none'>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='select the club you support' />
                    </SelectTrigger>
                  </FormControl>
                  <FormMessage />

                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Club</SelectLabel>
                      {clubs.map(({ id, logo_url, name }, index) => (
                        <SelectItemWithIcon
                          key={index}
                          id={id}
                          logoUrl={logo_url ?? ""}
                          value={name}
                        />
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='city'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>
                  <RequiredLabel label='City' />
                </FormLabel>
                <FormControl className='rounded-none'>
                  <Input placeholder='city' {...field} />
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
                <FormLabel>
                  <RequiredLabel label='State' />
                </FormLabel>
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

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <RequiredLabel label='Description' />
              </FormLabel>
              <FormControl className='rounded-none'>
                <Textarea
                  placeholder='description'
                  {...field}
                  className='h-[100px]'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex space-x-4'>
          <FormField
            control={form.control}
            name='website_url'
            render={({ field }) => (
              <FormItem className='w-full'>
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
            name='ig_handle'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Instagram Handle</FormLabel>
                <FormControl className='rounded-none'>
                  <Input type='text' placeholder='@handle' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {groupId ? (
          <Button
            className='rounded-none cursor-pointer'
            type='submit'
            disabled={isLoading}
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

export default SupportersGroupForm;
