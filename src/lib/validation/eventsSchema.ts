import { z } from "zod";

export const eventFormSchema = z.object({
  name: z.string().min(1, { message: "Event name is required" }),
  description: z.string().optional(),
  start_time: z
    .string()
    .datetime({ message: "Start time must be a valid datetime" }),
  end_time: z
    .string()
    .datetime({ message: "End time must be a valid datetime string" })
    .optional(),
  venue_id: z.string().uuid({ message: "A valid venue must be selected" }),
  team_id: z
    .string()
    .uuid({ message: "A valid team must be selected" })
    .optional(),
  has_garden: z.boolean({
    required_error: "Please indicate if the venue has a garden",
  }),
  has_big_screen: z.boolean({
    required_error: "Please indicate if the venue has a big screen",
  }),
  has_outdoor_screens: z.boolean({
    required_error: "Please indicate if the venue has outdoor screens",
  }),
  is_bookable: z.boolean({
    required_error: "Please specify if the venue is bookable",
  }),
});

export type EventFormData = z.infer<typeof eventFormSchema>;
