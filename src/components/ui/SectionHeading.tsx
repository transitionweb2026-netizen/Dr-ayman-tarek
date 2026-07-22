import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

/** Consistent section header used across every page: eyebrow → title → subtitle. */
export function SectionHeading({ eyebrow, title, subtitle, align = "center", className }: SectionHeadingProps) {
  const alignClass =
    align === "center" ? "text-center mx-auto items-center" : "text-left items-start rtl:text-right rtl:items-end";

  return (
    <div className={cn("mb-14 flex max-w-2xl flex-col gap-4", alignClass, className)}>
      {eyebrow && (
        <Reveal direction="down" duration={0.5}>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
      )}
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
