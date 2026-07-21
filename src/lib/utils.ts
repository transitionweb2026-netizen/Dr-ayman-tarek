import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names, resolving conflicting Tailwind utilities
 * (e.g. a size prop's "px-9" vs. an override className's "px-12") so the
 * later one always wins instead of depending on generated CSS order. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
