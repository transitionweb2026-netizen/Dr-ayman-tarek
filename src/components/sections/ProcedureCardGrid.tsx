"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerChild } from "@/components/motion/Stagger";

export interface ProcedureCardItem {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  recovery: string;
  duration: string;
}

function ProcedureCard({ item, onSelect }: { item: ProcedureCardItem; onSelect: () => void }) {
  return (
    <GlassCard as="article" radius="2xl" className="group flex flex-col overflow-hidden text-left">
      <button onClick={onSelect} className="flex flex-col text-left">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
        </div>
        <div className="flex flex-col p-6">
          <h3 className="mb-2 text-card-title text-white">{item.title}</h3>
          <p className="mb-4 text-body text-on-surface-variant">{item.shortDescription}</p>
          {/* Keeps its own invert-on-hover (icon flips to dark once the badge
              hover-fills solid) so color is inherited, not forced by NeonIcon —
              same reasoning as the specialties hex badges. */}
          <span className="flex h-10 w-10 items-center justify-center self-start rounded-full border border-neon-border bg-neon-container text-neon shadow-neon-rest transition-all duration-300 ease-premium group-hover:translate-x-1 group-hover:scale-[1.08] group-hover:bg-neon group-hover:text-background group-hover:shadow-neon-hover">
            <span className="material-symbols-outlined text-xl [filter:drop-shadow(0_0_4px_rgba(192,38,255,.55))] group-hover:![filter:none]">
              arrow_outward
            </span>
          </span>
        </div>
      </button>
    </GlassCard>
  );
}

interface ProcedureCardGridProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  items: ProcedureCardItem[];
  /** Anchor id on the section (ServicesGrid uses "services"). */
  sectionId?: string;
  /** Extra breathing room above the grid — ServicesGrid needs it directly under the hero; sections following another content block don't. */
  topPadding?: boolean;
}

/**
 * The single premium card-grid + detail-modal used everywhere a clickable
 * procedure/specialty list appears (Services, Technical Specialties, …).
 * Card and modal markup live here once — every consumer just supplies data.
 */
export function ProcedureCardGrid({ eyebrow, title, subtitle, items, sectionId, topPadding = false }: ProcedureCardGridProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = items.find((item) => item.id === activeId) ?? null;

  return (
    <section
      className={cn(
        "mx-auto max-w-container-max px-margin-mobile pb-section-gap-sm md:px-margin-desktop",
        topPadding && "pt-section-gap-sm",
      )}
      id={sectionId}
    >
      <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <Stagger className="grid grid-cols-1 items-start gap-gutter sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <StaggerChild key={item.id}>
            <ProcedureCard item={item} onSelect={() => setActiveId(item.id)} />
          </StaggerChild>
        ))}
      </Stagger>

      <Modal open={!!active} onClose={() => setActiveId(null)}>
        {active && (
          <>
            <div className="relative h-56 w-full md:h-64">
              <Image src={active.image} alt={active.title} fill className="object-cover" />
            </div>
            <div className="space-y-6 p-8">
              <h3 className="text-section-title text-white">{active.title}</h3>
              <p className="text-body-lg text-on-surface-variant">{active.description}</p>

              <div className="grid grid-cols-2 gap-4">
                <div className="glass rounded-xl border-primary/10 p-4">
                  <p className="mb-1 text-small text-on-surface-variant">Recovery</p>
                  <p className="text-body font-bold text-white">{active.recovery}</p>
                </div>
                <div className="glass rounded-xl border-primary/10 p-4">
                  <p className="mb-1 text-small text-on-surface-variant">Duration</p>
                  <p className="text-body font-bold text-white">{active.duration}</p>
                </div>
              </div>

              <Button className="w-full">Book Appointment</Button>
            </div>
          </>
        )}
      </Modal>
    </section>
  );
}
