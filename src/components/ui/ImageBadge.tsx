import { cn } from "@/lib/utils";

interface ImageBadgeProps {
  src: string;
  alt: string;
  /** Container size + shape classes, e.g. "h-16 w-16 rounded-2xl". Same footprint as IconBadge so swapping one for the other never changes layout. */
  className?: string;
}

/**
 * Same glass/neon container as <IconBadge> (.icon-badge-neon: gradient bg,
 * neon border, blur, glow, 300ms transitions), but holding a cover-fit
 * image instead of a glyph. Used where a section wants illustrations
 * instead of icons without touching the surrounding card at all.
 *
 * Plain <img>, not next/image: these are small local SVG illustrations —
 * next/image's optimizer refuses local SVGs by default (dangerouslyAllowSVG),
 * and there's no real optimization win for vector assets this size anyway.
 */
export function ImageBadge({ src, alt, className }: ImageBadgeProps) {
  return (
    <span className={cn("icon-badge-neon relative block shrink-0 overflow-hidden", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-300 ease-premium hover:scale-105"
      />
    </span>
  );
}
