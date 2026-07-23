import { createCrudHooks } from "./createCrudHooks";
import type { Tables } from "@/lib/supabase/database.types";

export const videoHooks = createCrudHooks("videos");
export type VideoRow = Tables<"videos">;
