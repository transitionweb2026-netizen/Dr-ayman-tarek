import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "./database.types";

/**
 * Server Supabase client for use in Server Components / Route Handlers /
 * Server Actions — anon key + the caller's session cookie, so RLS applies
 * exactly as it would for that same user in the browser.
 *
 * Server Components can't write cookies (Next.js throws), so the `set`/
 * `remove` calls are wrapped in try/catch — session refresh there is a
 * no-op and gets picked up by middleware.ts on the next request instead.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // Called from a Server Component — safe to ignore, middleware
            // refreshes the session cookie on the next navigation instead.
          }
        },
      },
    },
  );
}
