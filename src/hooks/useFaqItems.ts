import { createCrudHooks } from "./createCrudHooks";
import type { Tables } from "@/lib/supabase/database.types";

export const faqHooks = createCrudHooks("faq_items");
export type FaqItem = Tables<"faq_items">;
