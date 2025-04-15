"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import { toast } from "sonner";

const SupportersGroupForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { fetchClubs, clubs } = useClubStore();

  const form = useForm<GroupsFormSchema>({
    resolver: zodResolver(groupsFormSchema),
    defaultValues: {
      name: "",
      club_id: "",
      group_logo_url: "",
      city: "",
      description: "",
      website_url: "",
      ig_handle: "",
    },
  });

  useEffect(() => {
    fetchClubs();
  }, [fetchClubs]);

  const onSubmit = async (values: GroupsFormSchema) => {
    setIsLoading(true);
    const promise = async () => {
      const res = await fetch("/api/supportersGroups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.message || "Failed to create supporters group");
      }

      return { name: values.name };
    };

    toast.promise(promise, {
      loading: "Creating supporters group...",
      success: (data) => {
        setIsLoading(false);
        form.reset({
          name: "",
          club_id: "",
          group_logo_url: "",
          city: "",
          description: "",
          website_url: "",
          ig_handle: "",
        });
        return `${data.name} was successfully created`;
      },
      error: (err) => {
        setIsLoading(false);
        return (
          err.message ||
          "An unexpected error occurred while attempting to create a supporters group."
        );
      },
    });
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
                          clubId={id}
                          clubLogoUrl={logo_url ?? ""}
                          clubName={name}
                        />
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        <div className='flex space-x-4'>
          <FormField
            control={form.control}
            name='group_logo_url'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Logo Url</FormLabel>
                <FormControl className='rounded-none'>
                  <Input
                    placeholder='https://example.com/logo.png'
                    {...field}
                  />
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

        <Button
          className='rounded-none cursor-pointer'
          type='submit'
          disabled={isLoading}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default SupportersGroupForm;
