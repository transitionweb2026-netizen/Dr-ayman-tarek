import { cn } from "@/lib/utils";
import { NeonIcon } from "@/components/ui/NeonIcon";

interface IconBadgeProps {
  icon: string;
  filled?: boolean;
  neon?: boolean;
  /** Container size + shape classes, e.g. "w-16 h-16 rounded-2xl". Preserves each call site's original dimensions. */
  className?: string;
  /** Icon glyph size, e.g. "text-3xl". */
  iconClassName?: string;
}

/**
 * Glassmorphic neon icon container (see .icon-badge-neon in globals.css):
 * gradient background, neon border, backdrop blur, soft glow at rest,
 * stronger multi-layer glow + slight lift on hover. Used for every
 * icon-in-a-badge across the site — feature cards, stats, timeline,
 * socials, HUD accents. Size/shape is entirely controlled by `className`
 * so this never changes an existing layout's dimensions.
 */
export function IconBadge({ icon, filled, neon = true, className, iconClassName = "text-2xl" }: IconBadgeProps) {
  return (
    <span className={cn("icon-badge-neon flex shrink-0 items-center justify-center", className)}>
      <NeonIcon name={icon} filled={filled} neon={neon} className={iconClassName} />
    </span>
  );
}
