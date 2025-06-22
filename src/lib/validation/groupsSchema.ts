import { z } from "zod";

export const groupsFormSchema = z.object({
  name: z.string().min(1, { message: "Group name is required" }),
  club_id: z.string().min(1, { message: "You must select a club" }),
  group_logo_url: z
    .union([
      z.instanceof(File), // For initial form submission
      z.string().url(), // For after upload
      z.null(), // For optional cases
    ])
    .optional(),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  website_url: z
    .string()
    .url({ message: "Website URL must be valid (https://...)" })
    .optional(),
  ig_handle: z
    .string()
    .regex(/^@[\w]+$/, {
      message: "Instagram handle must start with @ and contain no spaces",
    })
    .optional(),
});

export const groupsApiSchema = z.object({
  name: z.string().min(1, { message: "Group name is required" }),
  club_id: z.string().min(1, { message: "You must select a club" }),
  group_logo_url: z.string().url(),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  website_url: z
    .string()
    .url({ message: "Website URL must be valid (https://...)" })
    .optional(),
  ig_handle: z
    .string()
    .regex(/^@[\w]+$/, {
      message: "Instagram handle must start with @ and contain no spaces",
    })
    .optional(),
});

export type GroupsFormSchema = z.infer<typeof groupsFormSchema>;
