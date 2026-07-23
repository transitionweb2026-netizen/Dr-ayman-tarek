"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { Json } from "@/lib/supabase/database.types";

export interface BilingualContent {
  en: Record<string, unknown>;
  ar: Record<string, unknown>;
}

async function getPageId(slug: string): Promise<string> {
  const supabase = createClient();
  const { data, error } = await supabase.from("pages").select("id").eq("slug", slug as never).single();
  if (error) throw error;
  return (data as unknown as { id: string }).id;
}

/** Fetches (and lazily creates, if missing) one page_sections row. Every
 * page-editor section form is built on this one hook. */
export function useSection(pageSlug: string, sectionKey: string) {
  return useQuery({
    queryKey: ["page_sections", pageSlug, sectionKey],
    queryFn: async () => {
      const supabase = createClient();
      const pageId = await getPageId(pageSlug);
      const { data, error } = await supabase.from("page_sections").select("*").eq("page_id", pageId).eq("section_key", sectionKey).maybeSingle();
      if (error) throw error;
      if (data) return data;
      const { data: created, error: createError } = await supabase
        .from("page_sections")
        .insert({ page_id: pageId, section_key: sectionKey, content: { en: {}, ar: {} } as unknown as Json })
        .select()
        .single();
      if (createError) throw createError;
      return created;
    },
  });
}

export function useSaveSection(pageSlug: string, sectionKey: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (content: BilingualContent) => {
      const supabase = createClient();
      const pageId = await getPageId(pageSlug);
      const { data, error } = await supabase
        .from("page_sections")
        .update({ content: content as unknown as Json })
        .eq("page_id", pageId)
        .eq("section_key", sectionKey)
        .select()
        .single();
      if (error) throw error;

      const {
        data: { user },
      } = await supabase.auth.getUser();
      await supabase.from("content_revisions").insert({
        entity_type: "page_sections",
        entity_id: (data as unknown as { id: string }).id,
        snapshot: data as unknown as Json,
        created_by: user?.id ?? null,
      });
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["page_sections", pageSlug, sectionKey] }),
  });
}
