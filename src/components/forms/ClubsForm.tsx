"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
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

const ClubsForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<ClubFormData>({
    resolver: zodResolver(clubFormSchema),
    defaultValues: {
      name: "",
      logo_url: "",
      league: "",
      country: "",
    },
  });

  const onSubmit = (values: ClubFormData) => {
    setIsLoading(true);

    const promise = async () => {
      const res = await fetch("/api/clubs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.message || "Failed to create a club");
      }

      return { name: values.name };
    };

    toast.promise(promise, {
      loading: "Creating club...",
      success: (data) => {
        setIsLoading(false);
        form.reset({
          country: "",
        });
        return `${data.name} was successfully created!`;
      },
      error: (err) => {
        setIsLoading(false);
        return (
          err.message ||
          "An unexpected error occured while attempting to create a new club."
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
              <FormLabel>Club Logo Url</FormLabel>
              <FormControl className='rounded-none'>
                <Input placeholder='https://example.com/logo.png' {...field} />
              </FormControl>
              <FormMessage />
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
          className='cursor-pointer rounded-none'
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default ClubsForm;
