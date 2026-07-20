import { cn } from "@/lib/utils";

/** Faint dot-grid texture — use sparingly to add depth to otherwise flat sections. */
export function DotGrid({ className }: { className?: string }) {
  return <div className={cn("dot-grid pointer-events-none absolute inset-0 opacity-[0.05]", className)} />;
}

/** Faint line-grid texture, reads as a technical/HUD accent behind imagery. */
export function LineGrid({ className }: { className?: string }) {
  return <div className={cn("line-grid pointer-events-none absolute inset-0", className)} />;
}

/** Thin decorative ring outline — good for framing a floating image or stat block. */
export function DecoRing({ className }: { className?: string }) {
  return <div className={cn("pointer-events-none absolute rounded-full border border-primary/20", className)} />;
}

/** A single soft, glowing dashed arc — subtle sci-fi/medical HUD accent. */
export function DecoArc({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute rounded-full border border-dashed border-primary/25",
        className,
      )}
    />
  );
}
