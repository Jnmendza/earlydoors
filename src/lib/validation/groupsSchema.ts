import { z } from "zod";

export const groupsFormSchema = z.object({
  name: z.string(),
  team_id: z.string(),
  group_logo_url: z.string().url().optional(),
  city: z.string(),
  state: z.string(),
  description: z.string(),
  website_url: z.string().url().optional(),
  ig_handle: z
    .string()
    .regex(/^@[\w]+$/)
    .optional(),
});

export type GroupsFormSchema = z.infer<typeof groupsFormSchema>;
