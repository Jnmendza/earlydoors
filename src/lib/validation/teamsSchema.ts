import { z } from "zod";

export const teamFormSchema = z.object({
  name: z.string(),
  logo_url: z.string(),
  league: z.string(),
  country: z.string(),
});

export type TeamFormData = z.infer<typeof teamFormSchema>;
