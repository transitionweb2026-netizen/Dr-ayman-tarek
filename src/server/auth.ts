import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export interface AdminProfile {
  id: string;
  email: string;
  full_name: string | null;
  role: "admin" | "editor";
  avatar_media_id: string | null;
}

/** Session + admin_profiles membership check. Null if either is missing. */
export async function getAdminProfile(): Promise<AdminProfile | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("admin_profiles")
    .select("id, email, full_name, role, avatar_media_id")
    .eq("id", user.id)
    .maybeSingle();

  return data;
}

/** For use at the top of `/admin/layout.tsx` and every server action. */
export async function requireAdmin(): Promise<AdminProfile> {
  const profile = await getAdminProfile();
  if (!profile) redirect("/admin/login");
  return profile;
}
