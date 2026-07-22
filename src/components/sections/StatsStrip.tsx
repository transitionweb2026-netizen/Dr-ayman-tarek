"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { Counter } from "@/components/ui/Counter";
import { IconBadge } from "@/components/ui/IconBadge";
import { Stagger, StaggerChild } from "@/components/motion/Stagger";
import { useLanguage } from "@/i18n/LanguageProvider";

export interface Stat {
  icon: string;
  value: number;
  suffix: string;
  label: string;
}

/** Keeps every stat count on one even row at desktop instead of letting an odd count (e.g. 5) wrap a lone item onto its own row. */
const gridColsClass: Record<number, string> = {
  4: "md:grid-cols-4",
  5: "sm:grid-cols-3 md:grid-cols-5",
};

/**
 * Fully independent stats section — reused on Home, About, and Dr. Ayman
 * Tarek. Owns its own vertical spacing (py-section-gap-sm) so it never
 * depends on a neighboring section's padding or a negative-margin overlap
 * to sit at the right distance from whatever comes before/after it.
 *
 * With no `stats` prop, falls back to the Home page's default set, resolved
 * from the active language automatically.
 */
export function StatsStrip({ stats }: { stats?: Stat[] }) {
  const { t } = useLanguage();
  const resolvedStats: Stat[] = stats ?? [
    { icon: "workspace_premium", value: 20, suffix: "+", label: t("home.stats.yearsExpertise") },
    { icon: "medical_services", value: 8000, suffix: "+", label: t("home.stats.surgeriesDone") },
    { icon: "favorite", value: 98, suffix: "%", label: t("home.stats.successRate") },
    { icon: "support_agent", value: 24, suffix: "/7", label: t("home.stats.criticalCare") },
  ];

  return (
    <section className="mx-auto max-w-container-max px-margin-mobile py-section-gap-sm md:px-margin-desktop">
      <GlassCard radius="3xl" interactive={false} className="w-full px-gutter py-10 shadow-glow">
        <Stagger
          className={`grid grid-cols-2 gap-6 text-center ${gridColsClass[resolvedStats.length] ?? "md:grid-cols-4"}`}
          gap={0.08}
        >
          {resolvedStats.map((stat) => (
            <StaggerChild key={stat.label} className="flex flex-col items-center gap-3">
              <IconBadge icon={stat.icon} className="h-14 w-14 rounded-2xl" iconClassName="text-3xl" />
              <p dir="ltr" className="text-[26px] font-bold leading-none text-white sm:text-[32px] lg:text-[36px]">
                <Counter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-micro uppercase tracking-widest text-on-surface-variant">{stat.label}</p>
            </StaggerChild>
          ))}
        </Stagger>
      </GlassCard>
    </section>
  );
}
