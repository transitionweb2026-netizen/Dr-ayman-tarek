import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerChild } from "@/components/motion/Stagger";

export interface Feature {
  icon: string;
  title: string;
  desc: string;
}

interface FeatureGridProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  features: Feature[];
  layout?: "icon-top" | "icon-side";
  columns?: 3 | 4;
}

const colClass: Record<3 | 4, string> = {
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function FeatureGrid({ eyebrow, title, subtitle, features, layout = "icon-top", columns = 4 }: FeatureGridProps) {
  return (
    <section className="mx-auto max-w-container-max px-margin-mobile pb-section-gap-sm md:px-margin-desktop">
      <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <Stagger className={`grid grid-cols-1 gap-gutter ${colClass[columns]}`}>
        {features.map((feature) => (
          <StaggerChild key={feature.title}>
            {layout === "icon-top" ? (
              <GlassCard radius="2xl" className="flex h-full flex-col items-center p-7 text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10">
                  <span className="material-symbols-outlined text-3xl text-primary">{feature.icon}</span>
                </div>
                <h3 className="mb-2 text-body-lg font-bold text-white">{feature.title}</h3>
                <p className="text-small text-on-surface-variant">{feature.desc}</p>
              </GlassCard>
            ) : (
              <GlassCard radius="xl" className="flex h-full items-start gap-4 p-7">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                  <span className="material-symbols-outlined text-2xl text-primary">{feature.icon}</span>
                </span>
                <div>
                  <h3 className="mb-1 text-body-lg font-bold text-white">{feature.title}</h3>
                  <p className="text-small text-on-surface-variant">{feature.desc}</p>
                </div>
              </GlassCard>
            )}
          </StaggerChild>
        ))}
      </Stagger>
    </section>
  );
}
