import { z } from "zod";

export const clubFormSchema = z.object({
  name: z.string().min(1, "Club name is required"),
  logo_url: z
    .union([
      z.instanceof(File), // For initial form submission
      z.string().url(), // For after upload
      z.null(), // For optional cases
    ])
    .optional(),
  league: z.string().min(1, "League is required"),
  country: z.string().min(1, "Country is required"),
});

export const clubApiSchema = z.object({
  name: z.string().min(1),
  logo_url: z.string().url(), // Only accepts valid URLs
  league: z.string().min(1),
  country: z.string().min(1),
});

export type ClubFormData = z.infer<typeof clubFormSchema>;
