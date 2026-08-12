import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageBadgeProps {
  src: string;
  alt: string;
  /** Container size + shape classes, e.g. "h-16 w-16 rounded-2xl". Same footprint as IconBadge so swapping one for the other never changes layout. */
  className?: string;
  /** Upper bound on the badge's rendered width, for next/image's responsive srcset. Defaults to the largest badge size actually used (220px). */
  sizes?: string;
}

/**
 * Same glass/neon container as <IconBadge> (.icon-badge-neon: gradient bg,
 * neon border, blur, glow, 300ms transitions), but holding a cover-fit
 * image instead of a glyph. Used where a section wants illustrations
 * instead of icons without touching the surrounding card at all.
 *
 * Every current caller feeds this a CMS-uploaded photo (via MediaPickerField
 * → Supabase Storage), so it's routed through next/image for real resizing —
 * a raw <img> here was shipping full-resolution uploads (200KB+) for a
 * ~220px-or-smaller circular badge. Local SVGs still bypass the optimizer
 * (which refuses them by default and gains nothing from resizing a vector).
 */
export function ImageBadge({ src, alt, className, sizes = "220px" }: ImageBadgeProps) {
  const isSvg = src.split("?")[0].toLowerCase().endsWith(".svg");
  return (
    <span className={cn("icon-badge-neon relative block shrink-0 overflow-hidden", className)}>
      {isSvg ? (
        // eslint-disable-next-line @next/next/no-img-element -- local vector illustration, no optimizer benefit
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover transition-transform duration-300 ease-premium hover:scale-105"
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-300 ease-premium hover:scale-105"
        />
      )}
    </span>
  );
}
