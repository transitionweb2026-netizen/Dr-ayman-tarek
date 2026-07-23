"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { createCrudHooks } from "./createCrudHooks";
import type { Tables, TablesInsert } from "@/lib/supabase/database.types";

export const serviceHooks = createCrudHooks("services");
export type ServiceRow = Tables<"services">;
export type ServiceBenefit = Tables<"service_benefits">;
export type ServiceProcessStep = Tables<"service_process_steps">;

/** Benefits/process steps are child tables (own display_order, FK to the
 * service) rather than jsonb arrays — loaded/saved alongside the parent
 * service row since they're always edited together. */
export function useServiceChildren(serviceId: string | undefined) {
  return useQuery({
    queryKey: ["services", serviceId, "children"],
    queryFn: async () => {
      const supabase = createClient();
      const [benefits, steps] = await Promise.all([
        supabase.from("service_benefits").select("*").eq("service_id", serviceId as string).order("display_order"),
        supabase.from("service_process_steps").select("*").eq("service_id", serviceId as string).order("display_order"),
      ]);
      if (benefits.error) throw benefits.error;
      if (steps.error) throw steps.error;
      return { benefits: benefits.data, steps: steps.data };
    },
    enabled: Boolean(serviceId),
  });
}

interface SaveChildrenInput {
  serviceId: string;
  benefits: { text_en: string; text_ar: string }[];
  steps: { text_en: string; text_ar: string }[];
}

/** Replaces all benefit/step rows for a service — simpler and safer than
 * diffing inserts/updates/deletes for a small (<10 row) reorderable list. */
export function useSaveServiceChildren() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ serviceId, benefits, steps }: SaveChildrenInput) => {
      const supabase = createClient();
      await supabase.from("service_benefits").delete().eq("service_id", serviceId);
      await supabase.from("service_process_steps").delete().eq("service_id", serviceId);
      if (benefits.length > 0) {
        const rows: TablesInsert<"service_benefits">[] = benefits.map((b, i) => ({ service_id: serviceId, text_en: b.text_en, text_ar: b.text_ar, display_order: i }));
        const { error } = await supabase.from("service_benefits").insert(rows);
        if (error) throw error;
      }
      if (steps.length > 0) {
        const rows: TablesInsert<"service_process_steps">[] = steps.map((s, i) => ({ service_id: serviceId, text_en: s.text_en, text_ar: s.text_ar, display_order: i }));
        const { error } = await supabase.from("service_process_steps").insert(rows);
        if (error) throw error;
      }
    },
    onSuccess: (_data, vars) => qc.invalidateQueries({ queryKey: ["services", vars.serviceId, "children"] }),
  });
}
