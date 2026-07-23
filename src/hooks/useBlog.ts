"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { createCrudHooks } from "./createCrudHooks";
import type { Tables, TablesInsert } from "@/lib/supabase/database.types";

export const blogHooks = createCrudHooks("blog_posts", "published_at");
export type BlogPost = Tables<"blog_posts">;
export type BlogTag = Tables<"blog_tags">;
export type BlogGalleryItem = Tables<"blog_post_gallery">;

export function useAllTags() {
  return useQuery({
    queryKey: ["blog_tags"],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("blog_tags").select("*").order("name_en");
      if (error) throw error;
      return data;
    },
  });
}

export function usePostTags(postId: string | undefined) {
  return useQuery({
    queryKey: ["blog_posts", postId, "tags"],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("blog_post_tags").select("tag_id, blog_tags(*)").eq("blog_post_id", postId as string);
      if (error) throw error;
      return data.map((row) => row.blog_tags).filter(Boolean) as unknown as BlogTag[];
    },
    enabled: Boolean(postId),
  });
}

export function usePostGallery(postId: string | undefined) {
  return useQuery({
    queryKey: ["blog_posts", postId, "gallery"],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("blog_post_gallery").select("*, media_assets(*)").eq("blog_post_id", postId as string).order("display_order");
      if (error) throw error;
      return data;
    },
    enabled: Boolean(postId),
  });
}

/** Find-or-create each tag by English name, then replace this post's tag relations. */
export function useSavePostTags() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ postId, tagNames }: { postId: string; tagNames: { name_en: string; name_ar: string }[] }) => {
      const supabase = createClient();
      const tagIds: string[] = [];
      for (const t of tagNames) {
        const { data: existing } = await supabase.from("blog_tags").select("id").eq("name_en", t.name_en).maybeSingle();
        if (existing) {
          tagIds.push(existing.id);
        } else {
          const { data: created, error } = await supabase.from("blog_tags").insert({ name_en: t.name_en, name_ar: t.name_ar || t.name_en }).select("id").single();
          if (error) throw error;
          tagIds.push(created.id);
        }
      }
      await supabase.from("blog_post_tags").delete().eq("blog_post_id", postId);
      if (tagIds.length > 0) {
        const rows: TablesInsert<"blog_post_tags">[] = tagIds.map((tag_id) => ({ blog_post_id: postId, tag_id }));
        const { error } = await supabase.from("blog_post_tags").insert(rows);
        if (error) throw error;
      }
    },
    onSuccess: (_d, vars) => qc.invalidateQueries({ queryKey: ["blog_posts", vars.postId, "tags"] }),
  });
}

export function useSavePostGallery() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ postId, mediaIds }: { postId: string; mediaIds: string[] }) => {
      const supabase = createClient();
      await supabase.from("blog_post_gallery").delete().eq("blog_post_id", postId);
      if (mediaIds.length > 0) {
        const rows: TablesInsert<"blog_post_gallery">[] = mediaIds.map((media_id, i) => ({ blog_post_id: postId, media_id, display_order: i }));
        const { error } = await supabase.from("blog_post_gallery").insert(rows);
        if (error) throw error;
      }
    },
    onSuccess: (_d, vars) => qc.invalidateQueries({ queryKey: ["blog_posts", vars.postId, "gallery"] }),
  });
}
