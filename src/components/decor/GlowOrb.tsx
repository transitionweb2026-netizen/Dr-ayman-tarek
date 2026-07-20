import { cn } from "@/lib/utils";

interface GlowOrbProps {
  className?: string;
  color?: "primary" | "tertiary";
}

/** Large blurred ambient light source — the base layer of depth on every section. */
export function GlowOrb({ className, color = "primary" }: GlowOrbProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute rounded-full blur-[90px]",
        color === "primary" ? "bg-primary/20" : "bg-tertiary/15",
        className,
      )}
    />
  );
}
