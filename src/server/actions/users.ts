"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/server/auth";
import { createAdminClient } from "@/lib/supabase/admin";

export async function inviteAdmin(email: string, fullName: string, role: "admin" | "editor") {
  await requireAdmin();
  const adminClient = createAdminClient();

  const { data, error } = await adminClient.auth.admin.inviteUserByEmail(email);
  if (error) throw new Error(error.message);

  const { error: profileError } = await adminClient
    .from("admin_profiles")
    .insert({ id: data.user.id, email, full_name: fullName || null, role });
  if (profileError) throw new Error(profileError.message);

  revalidatePath("/admin/users");
}

export async function removeAdmin(userId: string) {
  const me = await requireAdmin();
  if (me.id === userId) throw new Error("You can't remove your own account.");

  const adminClient = createAdminClient();
  await adminClient.from("admin_profiles").delete().eq("id", userId);
  const { error } = await adminClient.auth.admin.deleteUser(userId);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/users");
}

export async function updateAdminRole(userId: string, role: "admin" | "editor") {
  await requireAdmin();
  const adminClient = createAdminClient();
  const { error } = await adminClient.from("admin_profiles").update({ role }).eq("id", userId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/users");
}
