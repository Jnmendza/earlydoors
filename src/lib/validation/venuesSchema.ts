import { z } from "zod";

export const venueFormSchema = z.object({
  name: z.string().min(1, { message: "Venue name is required" }),

  address: z.string().min(1, { message: "Address is required" }),

  city: z.string().min(1, { message: "City is required" }),

  zipcode: z.string().min(1, { message: "Zipcode is required" }),

  state: z.string().min(1, { message: "State is required" }),

  lat: z
    .number({ invalid_type_error: "Latitude must be a number" })
    .min(-90, { message: "Latitude must be between -90 and 90" })
    .max(90, { message: "Latitude must be between -90 and 90" }),

  lng: z
    .number({ invalid_type_error: "Longitude must be a number" })
    .min(-180, { message: "Longitude must be between -180 and 180" })
    .max(180, { message: "Longitude must be between -180 and 180" }),

  website_url: z
    .string()
    .url({ message: "Must be a valid website URL (https://...)" }),

  google_map_url: z
    .string()
    .url({ message: "Must be a valid Google Maps URL (https://...)" }),

  logo_url: z
    .string()
    .url({ message: "Logo URL must be valid (https://...)" })
    .optional(),

  is_active: z.boolean(),
  has_garden: z.boolean(),
  has_big_screen: z.boolean(),
  has_outdoor_screens: z.boolean(),
  is_bookable: z.boolean(),
});

export type VenueFormData = z.infer<typeof venueFormSchema>;
