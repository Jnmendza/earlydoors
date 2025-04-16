import { z } from "zod";

export const eventFormSchema = z.object({
  name: z.string().min(1, { message: "Event name is required" }),
  description: z.string().optional(),
  date: z.date({ required_error: "Date is required" }),

  start_time: z
    .string()
    .regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:mm)"),

  venue_id: z.string().uuid({ message: "A valid venue must be selected" }),
  club_id: z
    .string()
    .uuid({ message: "A valid club must be selected" })
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
