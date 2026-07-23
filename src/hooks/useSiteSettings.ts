"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { createCrudHooks } from "./createCrudHooks";
import type { Tables, TablesUpdate } from "@/lib/supabase/database.types";

export type SiteSettings = Tables<"site_settings">;

const KEY = ["site_settings"];

/** Singleton row (id=1) — no list/create/delete, just fetch-and-update. */
export function useSiteSettings() {
  return useQuery({
    queryKey: KEY,
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).single();
      if (error) throw error;
      return data;
    },
  });
}

export function useUpdateSiteSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (patch: TablesUpdate<"site_settings">) => {
      const supabase = createClient();
      const { error } = await supabase.from("site_settings").update(patch).eq("id", 1);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  });
}

export const navLinkHooks = createCrudHooks("nav_links");
export type NavLinkRow = Tables<"nav_links">;
