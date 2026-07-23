import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

/**
 * SERVICE ROLE client — bypasses Row Level Security entirely. Never import
 * this outside `src/server/**`. Used only where RLS genuinely can't do the
 * job: inviting/creating auth users (Users admin module) and the one-off
 * seed script. Every normal read/write goes through the RLS-governed
 * server.ts/client.ts clients instead.
 */
export function createAdminClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}
