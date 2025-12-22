import { createClient } from "@supabase/supabase-js";
import { requireServerEnv } from "./serverEnv";

const supabaseUrl = "https://qborzulfzciqhjyfxcjz.supabase.co";

export function getSupabaseServer() {
  const serviceRoleKey = requireServerEnv("SUPABASE_SERVICE_ROLE_KEY");
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}


