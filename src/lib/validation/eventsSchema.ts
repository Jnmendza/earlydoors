import { z } from "zod";

export const eventFormSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  start_time: z.string().datetime(),
  end_time: z.string().datetime().optional(),
  venue_id: z.string().uuid(),
  team_id: z.string().uuid().optional(),
  has_garden: z.boolean(),
  has_big_screen: z.boolean(),
  has_outdoor_screens: z.boolean(),
  is_bookable: z.boolean(),
});

export type EventFormData = z.infer<typeof eventFormSchema>;
