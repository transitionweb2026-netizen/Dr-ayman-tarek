import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerChild } from "@/components/motion/Stagger";

export interface TimelineEntry {
  year: string;
  title: string;
  place: string;
}

export function Timeline({
  eyebrow,
  title,
  subtitle,
  entries,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  entries: TimelineEntry[];
}) {
  return (
    <section className="mx-auto max-w-container-max px-margin-mobile pb-section-gap-sm md:px-margin-desktop">
      <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <GlassCard radius="2xl" interactive={false} className="mx-auto max-w-3xl p-6 shadow-glow md:p-10">
        <Stagger className="relative space-y-8 before:absolute before:bottom-2 before:left-2 before:top-2 before:w-px before:bg-primary/20" gap={0.1}>
          {entries.map((entry, i) => (
            <StaggerChild key={entry.year} className="relative pl-8" style={{ opacity: 1 - i * 0.08 }}>
              <span
                className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-4 border-background bg-primary"
                style={{ opacity: 1 - i * 0.15 }}
              />
              <p className="text-small text-primary">{entry.year}</p>
              <h4 className="text-body font-bold text-white">{entry.title}</h4>
              <p className="text-small text-on-surface-variant">{entry.place}</p>
            </StaggerChild>
          ))}
        </Stagger>
      </GlassCard>
    </section>
  );
}
