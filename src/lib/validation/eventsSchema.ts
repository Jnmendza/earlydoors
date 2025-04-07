import { z } from "zod";

export const eventFormSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  start_time: z.string(),
  end_time: z.string().optional(),
  venue_id: z.string().uuid(),
  team_id: z.string().uuid(),
  has_garden: z.boolean().optional(),
  has_big_screen: z.boolean().optional(),
  has_outdoor_screens: z.boolean().optional(),
  is_bookable: z.boolean().optional(),
});

export type EventFormData = z.infer<typeof eventFormSchema>;
