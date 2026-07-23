"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/database.types";

type TableName = keyof Database["public"]["Tables"];

/**
 * One factory behind every simple collection's admin hooks (Services,
 * Specialties, Videos, FAQ, Testimonials) — list/get/create/update/delete/
 * reorder against a single table, fully typed per call site via the table
 * name generic. Avoids re-deriving the same five react-query mutations five
 * times; entities with real relations (Blog's tags/gallery, Media's
 * storage step) still get their own hook file instead of forcing the fit.
 */
export function createCrudHooks<T extends TableName>(table: T, orderBy = "display_order") {
  type Row = Database["public"]["Tables"][T]["Row"];
  type Insert = Database["public"]["Tables"][T]["Insert"];
  type Update = Database["public"]["Tables"][T]["Update"];
  const KEY = [table as string];

  function useList() {
    return useQuery({
      queryKey: KEY,
      queryFn: async () => {
        const supabase = createClient();
        const { data, error } = await supabase.from(table).select("*").order(orderBy, { ascending: true });
        if (error) throw error;
        return data as unknown as Row[];
      },
    });
  }

  function useGet(id: string | undefined) {
    return useQuery({
      queryKey: [...KEY, id],
      queryFn: async () => {
        const supabase = createClient();
        const { data, error } = await supabase.from(table).select("*").eq("id" as never, id as never).maybeSingle();
        if (error) throw error;
        return data as unknown as Row | null;
      },
      enabled: Boolean(id),
    });
  }

  async function snapshotRevision(entityId: string, snapshot: unknown) {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    await supabase.from("content_revisions").insert({
      entity_type: table as string,
      entity_id: entityId,
      snapshot: snapshot as never,
      created_by: user?.id ?? null,
    });
  }

  function useCreate() {
    const qc = useQueryClient();
    return useMutation({
      mutationFn: async (values: Insert) => {
        const supabase = createClient();
        const { data, error } = await supabase.from(table).insert(values as never).select().single();
        if (error) throw error;
        const row = data as unknown as Row;
        await snapshotRevision((row as unknown as { id: string }).id, row);
        return row;
      },
      onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
    });
  }

  function useUpdate() {
    const qc = useQueryClient();
    return useMutation({
      mutationFn: async ({ id, values }: { id: string; values: Update }) => {
        const supabase = createClient();
        const { data, error } = await supabase.from(table).update(values as never).eq("id" as never, id as never).select().single();
        if (error) throw error;
        await snapshotRevision(id, data);
      },
      onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
    });
  }

  function useDelete() {
    const qc = useQueryClient();
    return useMutation({
      mutationFn: async (id: string) => {
        const supabase = createClient();
        const { error } = await supabase.from(table).delete().eq("id" as never, id as never);
        if (error) throw error;
      },
      onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
    });
  }

  function useReorder() {
    const qc = useQueryClient();
    return useMutation({
      mutationFn: async (items: Row[]) => {
        const supabase = createClient();
        await Promise.all(
          items.map((item, index) =>
            supabase
              .from(table)
              .update({ display_order: index } as never)
              .eq("id" as never, (item as unknown as { id: string }).id as never),
          ),
        );
      },
      onMutate: async (items) => {
        await qc.cancelQueries({ queryKey: KEY });
        const previous = qc.getQueryData<Row[]>(KEY);
        qc.setQueryData(KEY, items);
        return { previous };
      },
      onError: (_err, _items, context) => {
        if (context?.previous) qc.setQueryData(KEY, context.previous);
      },
      onSettled: () => qc.invalidateQueries({ queryKey: KEY }),
    });
  }

  return { useList, useGet, useCreate, useUpdate, useDelete, useReorder };
}
