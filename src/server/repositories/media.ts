import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Tables } from "@/lib/supabase/database.types";

export type MediaAsset = Tables<"media_assets">;
export type MediaFolder = Tables<"media_folders">;

export async function listMediaAssets() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("media_assets").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function listMediaFolders() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("media_folders").select("*").order("name");
  if (error) throw error;
  return data;
}

export async function getMediaAsset(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("media_assets").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data;
}

/** Public Supabase Storage URLs follow a fixed, predictable shape — no need for a client round-trip just to build one. */
export function mediaPublicUrl(storagePath: string): string {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/media/${storagePath}`;
}
