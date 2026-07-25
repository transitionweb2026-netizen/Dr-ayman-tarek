import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "@/lib/supabase/database.types";

/**
 * Two unrelated jobs share this file because Next.js only allows one
 * middleware: (1) stamp every request with an `x-pathname` header so the
 * root layout can derive `<html lang/dir>` from the URL server-side (see
 * layout.tsx) — cheap, unconditional, runs for every route; (2) refresh the
 * Supabase session cookie and gate `/admin/*` — real DB-adjacent work, kept
 * behind the existing `/admin` check so public pages don't pay for it. The
 * deeper admin check (does this session belong to an actual admin_profiles
 * row, not just any authenticated user) happens in `/admin/layout.tsx`,
 * which can afford a real DB query; middleware stays cheap.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    const response = NextResponse.next({ request });
    response.headers.set("x-pathname", pathname);
    return response;
  }

  let response = NextResponse.next({ request });
  response.headers.set("x-pathname", pathname);

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }
          response = NextResponse.next({ request });
          response.headers.set("x-pathname", pathname);
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAdminRoute = pathname.startsWith("/admin") && pathname !== "/admin/login";

  if (isAdminRoute && !user) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === "/admin/login" && user) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|xml|txt|json)$).*)"],
};
