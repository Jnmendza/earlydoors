/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from "@supabase/supabase-js";

declare module "@supabase/supabase-js" {
  interface User {
    is_super_admin?: boolean;
  }
}
