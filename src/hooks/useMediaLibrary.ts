"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { uploadMediaAsset, deleteMediaAsset } from "@/lib/supabase/storage";
import type { Tables, TablesUpdate } from "@/lib/supabase/database.types";

export type MediaAsset = Tables<"media_assets">;

const KEY = ["media-assets"];

export function useMediaAssets() {
  return useQuery({
    queryKey: KEY,
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("media_assets").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as MediaAsset[];
    },
  });
}

export function useUploadMedia() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => uploadMediaAsset(file),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  });
}

export function useDeleteMedia() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, storagePath }: { id: string; storagePath: string }) => deleteMediaAsset(id, storagePath),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  });
}

export function useUpdateMedia() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: TablesUpdate<"media_assets"> }) => {
      const supabase = createClient();
      const { error } = await supabase.from("media_assets").update(patch).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  });
}
