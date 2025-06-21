import { createClient } from "@supabase/supabase-js";

export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // process.env.NEXT_PUBLIC_SERVICE_ROLE_KEY! // Use Service Role Key for admin privileges
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // Use Service Role Key for admin privileges
  );
}
