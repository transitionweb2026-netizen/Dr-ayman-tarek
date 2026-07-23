import { createCrudHooks } from "./createCrudHooks";
import type { Tables } from "@/lib/supabase/database.types";

export const testimonialHooks = createCrudHooks("testimonials");
export type TestimonialRow = Tables<"testimonials">;
