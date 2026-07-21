"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { NeonIcon } from "@/components/ui/NeonIcon";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerChild } from "@/components/motion/Stagger";

const TESTIMONIALS = [
  {
    quote:
      "Dr. Tarek performed a complex spinal fusion on me last year. The precision of the surgery and the level of care during recovery was unlike anything I've experienced. Truly elite.",
    name: "Alexander Henderson",
    role: "Spinal Fusion Patient",
  },
  {
    quote:
      "I was terrified about my brain tumor diagnosis. Dr. Ayman explained everything with such calm expertise. The surgery was a complete success. I owe him my life.",
    name: "Elena Rodriguez",
    role: "Neuro-Oncology Survivor",
  },
  {
    quote:
      "Modern, high-tech, and humane. The facility and the medical team led by Dr. Tarek are simply world-class. Best neurological care in the region.",
    name: "Michael Chen",
    role: "Neurology Patient",
  },
];

const MILESTONES = [
  { year: "2024", title: "Appointed Chief of Neurosurgery", place: "Elite International Medical Center" },
  { year: "2022", title: "Excellence in Innovation Award", place: "World Federation of Neurosurgical Societies" },
  { year: "2018", title: "Surgical Fellowship Program", place: "Royal College of Surgeons" },
  { year: "2014", title: "Specialization PhD Completion", place: "Global Medical University" },
];

function Stars() {
  return (
    <div className="mb-3 flex justify-center gap-0.5 text-[#FFB020] drop-shadow-[0_0_6px_rgba(255,176,32,0.5)]">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="material-symbols-outlined fill-icon">
          star
        </span>
      ))}
    </div>
  );
}

export function TestimonialsPanel() {
  return (
    <section className="mx-auto max-w-container-max px-margin-mobile pb-section-gap-sm md:px-margin-desktop">
      <div className="grid grid-cols-1 gap-gutter lg:grid-cols-[11fr_9fr]">
        {/* Patient reviews */}
        <GlassCard radius="2xl" interactive={false} className="flex flex-col p-6 md:p-7">
          <Reveal>
            <h2 className="mb-6 text-center text-card-title text-white">Patient Testimonials</h2>
          </Reveal>
          <Stagger className="grid flex-1 auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.1}>
            {TESTIMONIALS.map((t) => (
              <StaggerChild key={t.name}>
                <GlassCard radius="xl" className="flex h-full flex-col p-4 text-center">
                  <Stars />
                  <p className="line-clamp-4 flex-1 text-sm italic leading-relaxed text-on-surface-variant">
                    &quot;{t.quote}&quot;
                  </p>
                  <div className="mt-auto border-t border-white/5 pt-3">
                    <p className="text-small text-white">{t.name}</p>
                    <p className="text-small text-on-surface-variant">{t.role}</p>
                  </div>
                </GlassCard>
              </StaggerChild>
            ))}
          </Stagger>
          <Button variant="outline" size="md" className="mx-auto mt-6">
            View All Testimonials
          </Button>
        </GlassCard>

        {/* Career milestones */}
        <GlassCard radius="2xl" interactive={false} className="flex flex-col p-6 shadow-glow md:p-7">
          <Reveal>
            <h3 className="mb-6 text-center text-card-title text-white">Career Milestones</h3>
          </Reveal>
          <div className="flex flex-1 flex-col items-center gap-5 sm:flex-row">
            <Stagger className="w-full flex-1 space-y-4" gap={0.08}>
              {MILESTONES.map((m, i) => (
                <StaggerChild key={m.year} className="flex items-start gap-3">
                  <NeonIcon
                    name="check_circle"
                    filled
                    className="mt-0.5 shrink-0 text-xl"
                    style={{ opacity: 1 - i * 0.15 }}
                  />
                  <div>
                    <h4 className="text-body font-bold leading-snug text-white">{m.title}</h4>
                    <p className="text-small text-on-surface-variant">
                      {m.place} • {m.year}
                    </p>
                  </div>
                </StaggerChild>
              ))}
            </Stagger>

            <div className="relative flex w-full shrink-0 items-center justify-center sm:w-[42%]">
              <div className="absolute inset-6 rounded-full bg-primary/25 blur-3xl" />
              <svg className="relative w-full max-w-[250px]" viewBox="0 0 240 250">
                <defs>
                  <linearGradient id="brainGrad2" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="#ff4fa3" />
                    <stop offset="100%" stopColor="#9d4dff" />
                  </linearGradient>
                </defs>
                <g fill="none" opacity={0.9} stroke="url(#brainGrad2)" strokeWidth={1.4}>
                  <path d="M60 90 C40 60 55 25 95 20 C110 5 140 5 155 20 C190 25 205 55 190 85 C205 100 200 130 175 140 C170 160 145 170 120 160 C100 172 75 165 65 148 C40 145 30 115 45 100 C40 96 45 90 60 90 Z" />
                  <path d="M120 25 C120 60 120 130 118 158" strokeOpacity={0.5} />
                  <path d="M75 40 C90 55 90 80 75 95" strokeOpacity={0.4} />
                  <path d="M165 40 C150 55 150 80 165 95" strokeOpacity={0.4} />
                  <path d="M60 110 C85 120 95 140 85 150" strokeOpacity={0.4} />
                  <path d="M180 110 C155 120 145 140 155 150" strokeOpacity={0.4} />
                </g>
                <g opacity={0.8} stroke="url(#brainGrad2)">
                  <line strokeWidth={1.5} x1={120} x2={120} y1={168} y2={222} />
                  <ellipse cx={120} cy={228} fill="rgba(196,61,255,0.25)" rx={52} ry={8} stroke="none" />
                  <ellipse cx={120} cy={228} fill="none" rx={80} ry={13} strokeWidth={1} />
                  <ellipse cx={120} cy={228} fill="none" opacity={0.5} rx={100} ry={17} strokeWidth={0.8} />
                </g>
                <g fill="#ff9ed4">
                  <circle className="animate-pulse-node" cx={60} cy={90} r={2.5} />
                  <circle className="animate-pulse-node" cx={155} cy={20} r={2.5} style={{ animationDelay: "0.6s" }} />
                  <circle className="animate-pulse-node" cx={175} cy={140} r={2.5} style={{ animationDelay: "1.2s" }} />
                  <circle className="animate-pulse-node" cx={65} cy={148} r={2.5} style={{ animationDelay: "1.8s" }} />
                  <circle cx={120} cy={92} r={3} fill="#fff" />
                </g>
              </svg>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
