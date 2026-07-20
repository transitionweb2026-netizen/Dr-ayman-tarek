"use client";

import { useState } from "react";
import Image from "next/image";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NeonIcon } from "@/components/ui/NeonIcon";
import { Stagger, StaggerChild } from "@/components/motion/Stagger";
import { SERVICES, type Service } from "@/data/services";

function ServiceCard({ service, onSelect }: { service: Service; onSelect: () => void }) {
  return (
    <GlassCard as="article" radius="2xl" className="group flex h-full flex-col overflow-hidden text-left">
      <button onClick={onSelect} className="flex h-full flex-col text-left">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="mb-2 text-card-title text-white">{service.title}</h3>
          <p className="mb-4 flex-1 text-body text-on-surface-variant">{service.shortDescription}</p>
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

export function ServicesGrid() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = SERVICES.find((s) => s.id === activeId) ?? null;

  return (
    <section className="mx-auto max-w-container-max px-margin-mobile pt-section-gap-sm pb-section-gap-sm md:px-margin-desktop" id="services">
      <SectionHeading
        eyebrow="What We Offer"
        title="Our Services"
        subtitle="Comprehensive neurosurgical and neurological care, delivered with precision, safety, and a patient-first approach. Select a service to learn more."
      />
      <Stagger className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((service) => (
          <StaggerChild key={service.id}>
            <ServiceCard service={service} onSelect={() => setActiveId(service.id)} />
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

              <div>
                <h4 className="mb-3 text-card-title text-white">Key Benefits</h4>
                <ul className="space-y-2">
                  {active.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <NeonIcon name="check_circle" filled className="mt-0.5 shrink-0 text-lg" />
                      <span className="text-body text-on-surface-variant">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-3 text-card-title text-white">Treatment Process</h4>
                <ol className="space-y-2">
                  {active.process.map((step, index) => (
                    <li key={step} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/15 text-xs font-bold text-primary">
                        {index + 1}
                      </span>
                      <span className="text-body text-on-surface-variant">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

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
