"use client";
import React from "react";
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

const TEAMS = [
  {
    id: "12f2bcc5-dfe6-4322-adee-143392f5ae32",
    name: "San Diego FC",
    logo_url:
      "https://upload.wikimedia.org/wikipedia/en/6/6f/San_Diego_FC_logo.svg",
    league: "MLS",
    country: "USA",
  },
  {
    id: "1d9c9f7d-2aa3-4be8-a271-21f742df5c11",
    name: "Manchester United",
    logo_url:
      "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
    league: "EPL",
    country: "England",
  },
];

const SupportersGroupForm = () => {
  const form = useForm<GroupsFormSchema>({
    resolver: zodResolver(groupsFormSchema),
    defaultValues: {
      name: "",
      team_id: "",
      group_logo_url: "",
      city: "",
      description: "",
      website_url: "",
      ig_handle: "",
    },
  });

  const onSubmit = (values: GroupsFormSchema) => {
    console.log("On submit clicked", values);
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
            name='team_id'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>
                  <RequiredLabel label='Team' />
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className='rounded-none'>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='select the team you support' />
                    </SelectTrigger>
                  </FormControl>
                  <FormMessage />

                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Team</SelectLabel>
                      {TEAMS.map((team, index) => (
                        <SelectItem key={index} value={team.id}>
                          {team.name}
                        </SelectItem>
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
                  className='h-[100px]' // Replace with your desired class for styling
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

        <Button className='rounded-none' type='submit'>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default SupportersGroupForm;
