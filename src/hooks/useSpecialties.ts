import { createCrudHooks } from "./createCrudHooks";
import type { Tables } from "@/lib/supabase/database.types";

export const specialtyHooks = createCrudHooks("specialties");
export type SpecialtyRow = Tables<"specialties">;
