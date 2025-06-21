import { z } from "zod";

export const venueFormSchema = z.object({
  name: z.string().min(1, { message: "Venue name is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  zipcode: z.string().min(1, { message: "Zipcode is required" }),
  state: z.string().min(1, { message: "State is required" }),
  website_url: z
    .string()
    .url({ message: "Must be a valid website URL (https://...)" }),
  google_maps_url: z
    .string()
    .url({ message: "Must be a valid Google Maps URL (https://...)" }),
  logo_url: z
    .union([
      z.instanceof(File), // For initial form submission
      z.string().url(), // For after upload
      z.null(), // For optional cases
    ])
    .optional(),
  is_active: z.boolean(),
  has_garden: z.boolean(),
  has_big_screen: z.boolean(),
  has_outdoor_screens: z.boolean(),
  is_bookable: z.boolean(),
});

export type VenueFormData = z.infer<typeof venueFormSchema>;
