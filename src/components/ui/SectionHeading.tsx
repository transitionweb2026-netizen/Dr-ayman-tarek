import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";

interface SectionHeadingProps {
  /** No longer rendered (the eyebrow badge was removed site-wide) — kept
   * optional so every existing caller passing CMS eyebrow copy still
   * type-checks without touching each section. */
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

/** Consistent section header used across every page: title → subtitle. */
export function SectionHeading({ title, subtitle, align = "center", className }: SectionHeadingProps) {
  const alignClass =
    align === "center" ? "text-center mx-auto items-center" : "text-left items-start rtl:text-right rtl:items-end";

  return (
    <div className={cn("mb-14 flex max-w-2xl flex-col gap-4", alignClass, className)}>
      <Reveal delay={0.06}>
        <h2 className="text-section-title text-white">{title}</h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.12}>
          <p className="text-body text-on-surface-variant">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
