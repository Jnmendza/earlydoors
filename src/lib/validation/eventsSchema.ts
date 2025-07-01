import { z } from "zod";

export const eventFormSchema = z.object({
  name: z.string().min(1, { message: "Event name is required" }),
  description: z.string().optional(),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in yyyy-MM-dd format"),

  venue_id: z.string().uuid({ message: "A valid venue must be selected" }),
  club_id: z
    .string()
    .uuid({ message: "A valid club must be selected" })
    .optional(),
  supporters_group_id: z
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

export const apiEventSchema = z.object({
  name: z.string().min(1, "Event name is required"),
  description: z.string().optional(),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in yyyy-MM-dd format"),
  start_time: z
    .string()
    .regex(
      /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/,
      "Start time must be in HH:mm format"
    ),
  venue_id: z.string().uuid("A valid venue must be selected"),
  club_id: z.string().uuid("A valid club must be selected").optional(),
  supporters_group_id: z
    .string()
    .uuid("A valid club must be selected")
    .optional(),
  has_garden: z.boolean(),
  has_big_screen: z.boolean(),
  has_outdoor_screens: z.boolean(),
  is_bookable: z.boolean(),
});

export type EventFormData = z.infer<typeof eventFormSchema>;
