"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/database.types";

export interface ContentRevision {
  id: string;
  entity_type: string;
  entity_id: string;
  snapshot: Record<string, unknown>;
  created_by: string | null;
  created_at: string;
}

export function useRevisions(entityType: string, entityId: string | undefined) {
  return useQuery({
    queryKey: ["content_revisions", entityType, entityId],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("content_revisions")
        .select("*")
        .eq("entity_type", entityType)
        .eq("entity_id", entityId as string)
        .order("created_at", { ascending: false })
        .limit(20);
      if (error) throw error;
      return data as unknown as ContentRevision[];
    },
    enabled: Boolean(entityId),
  });
}

/** Restores a snapshot by writing it back as the current row (a normal
 * update — the pre-restore state itself just becomes a new revision, so
 * restoring is itself never destructive). `table` must be a real table
 * name; the snapshot's own id/created_at/updated_at are stripped since
 * those columns shouldn't be overwritten by history. */
export function useRestoreRevision(table: keyof Database["public"]["Tables"], entityType: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ entityId, snapshot }: { entityId: string; snapshot: Record<string, unknown> }) => {
      const supabase = createClient();
      const patch = { ...snapshot };
      delete patch.id;
      delete patch.created_at;
      delete patch.updated_at;
      const { error } = await supabase.from(table).update(patch as never).eq("id" as never, entityId as never);
      if (error) throw error;
    },
    onSuccess: (_d, vars) => {
      qc.invalidateQueries({ queryKey: [table as string] });
      qc.invalidateQueries({ queryKey: ["content_revisions", entityType, vars.entityId] });
    },
  });
}
