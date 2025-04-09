import { z } from "zod";

export const teamFormSchema = z.object({
  name: z.string().min(1, "Team name is required"),
  logo_url: z
    .string()
    .url("Must be a valid URL, e.g https://example.com/logo.png"),
  league: z.string().min(1, "League is required"),
  country: z.string().min(1, "Country is required"),
});

export type TeamFormData = z.infer<typeof teamFormSchema>;
