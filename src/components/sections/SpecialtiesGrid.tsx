"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Stagger, StaggerChild } from "@/components/motion/Stagger";
import { Button } from "@/components/ui/Button";

export interface SpecialtyPreviewItem {
  icon: string;
  title: string;
  desc: string;
  cta: string;
}

export interface SpecialtiesGridContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: SpecialtyPreviewItem[];
}

// Fixed 1:1 with the 4 always-present items (brainTumors, spineSurgery,
// neurology, neuroEndoscopy) by position — these are bespoke illustrations,
// not admin-uploaded media, so kept as a positional lookup rather than a
// 5th repeater field.
const ITEM_IMAGES = [
  "/illustrations/home/specialty-brain-tumors.svg",
  "/illustrations/home/specialty-spine-surgery.svg",
  "/illustrations/why-choose/personalized-treatment.svg",
  "/illustrations/home/specialty-neuro-endoscopy.svg",
];

export function SpecialtiesGrid({ content }: { content: Partial<SpecialtiesGridContent> }) {
  const items = content.items || [];

  return (
    <section className="mx-auto max-w-container-max px-margin-mobile py-section-gap-sm md:px-margin-desktop">
      <SectionHeading eyebrow={content.eyebrow || ""} title={content.title || ""} subtitle={content.subtitle || ""} />
      <Stagger className="grid grid-cols-1 items-start gap-gutter sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => {
          const image = ITEM_IMAGES[index];
          return (
            <StaggerChild key={item.title}>
              <GlassCard radius="2xl" className="group flex flex-col items-center p-7 text-center">
                {/* This hex badge keeps its own signature interaction (icon inverts to
                    dark on a solid-purple hex when hovered) rather than adopting the
                    generic neon-glass container — so color here is inherited from the
                    parent (text-neon at rest, text-background on hover) instead of the
                    NeonIcon component, which would hard-code a color and break the
                    inversion. The neon glow bloom is still applied, just via a
                    drop-shadow that doesn't touch color. */}
                <div className="hex-icon mb-5 flex h-[92px] w-[92px] items-center justify-center border border-neon-border bg-neon-container text-neon shadow-neon-rest transition-all duration-300 ease-premium group-hover:scale-[1.08] group-hover:bg-neon group-hover:text-background group-hover:shadow-neon-hover">
                  {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={image} alt={item.title} className="h-full w-full object-cover" />
                  ) : (
                    <span className="material-symbols-outlined text-4xl [filter:drop-shadow(0_0_4px_rgba(192,38,255,.55))_drop-shadow(0_0_10px_rgba(168,85,247,.35))] group-hover:![filter:none]">
                      {item.icon}
                    </span>
                  )}
                </div>
                <h3 className="mb-3 text-card-title text-white">{item.title}</h3>
                <p className="mb-6 text-body text-on-surface-variant">{item.desc}</p>
                <Button variant="outline" size="md">
                  {item.cta}
                </Button>
              </GlassCard>
            </StaggerChild>
          );
        })}
      </Stagger>
    </section>
  );
}
