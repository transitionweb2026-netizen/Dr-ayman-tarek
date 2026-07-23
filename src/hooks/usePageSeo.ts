"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { Tables, TablesUpdate } from "@/lib/supabase/database.types";

export type PageRow = Tables<"pages">;
export type PageSeoRow = Tables<"page_seo">;
export interface PageWithSeo extends PageRow {
  page_seo: PageSeoRow | null;
}

const KEY = ["pages_with_seo"];

export function usePagesWithSeo() {
  return useQuery({
    queryKey: KEY,
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("pages").select("*, page_seo(*)").order("slug");
      if (error) throw error;
      return data.map((row) => ({ ...row, page_seo: Array.isArray(row.page_seo) ? row.page_seo[0] ?? null : row.page_seo })) as unknown as PageWithSeo[];
    },
  });
}

export function useUpsertPageSeo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ pageId, patch }: { pageId: string; patch: TablesUpdate<"page_seo"> }) => {
      const supabase = createClient();
      const { data: existing } = await supabase.from("page_seo").select("id").eq("page_id", pageId).maybeSingle();
      if (existing) {
        const { error } = await supabase.from("page_seo").update(patch).eq("page_id", pageId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("page_seo").insert({ ...patch, page_id: pageId });
        if (error) throw error;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  });
}
