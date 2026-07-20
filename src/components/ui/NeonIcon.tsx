import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";

interface NeonIconProps {
  /** Material Symbols glyph name, e.g. "shield". */
  name: string;
  /** Sizing/utility classes (e.g. "text-3xl"). Container/layout classes belong on a wrapper, not here. */
  className?: string;
  filled?: boolean;
  /**
   * Icons with their own semantic color (rating stars, WhatsApp brand
   * green, the emergency-contact error red) should keep that color
   * instead of being forced neon purple — set false for those and the
   * caller supplies its own color class.
   */
  neon?: boolean;
  style?: CSSProperties;
}

/**
 * The single glyph-level primitive behind every Material Symbols icon on
 * the site. Applies the neon glow system (see .icon-neon in globals.css):
 * bright purple, soft outer bloom + inner glow, GPU-friendly scale+filter
 * transition, stronger glow on hover. Icons never blur — drop-shadow
 * traces the glyph outline rather than blurring the glyph itself.
 */
export function NeonIcon({ name, className, filled, neon = true, style }: NeonIconProps) {
  return (
    <span
      className={cn("material-symbols-outlined", neon && "icon-neon", filled && "fill-icon", className)}
      style={style}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
