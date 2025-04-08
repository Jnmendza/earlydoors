import { z } from "zod";

export const venueFormSchema = z.object({
  name: z.string().min(1),
  address: z.string(),
  city: z.string(),
  zipcode: z.string(),
  state: z.string(),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  website_url: z.string().url(),
  google_map_url: z.string().url(),
  logo_url: z.string().url().optional(),
  is_active: z.boolean(),
  has_garden: z.boolean(),
  has_big_screen: z.boolean(),
  has_outdoor_screens: z.boolean(),
  is_bookable: z.boolean(),
});

export type VenueFormData = z.infer<typeof venueFormSchema>;
