import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Stagger, StaggerChild } from "@/components/motion/Stagger";
import { Button } from "@/components/ui/Button";

const SPECIALTIES = [
  { icon: "grain", image: "/illustrations/home/specialty-brain-tumors.svg", title: "Brain Tumors", desc: "Advanced micro-surgical resection of complex neuro-oncology cases.", cta: "Consult Expert" },
  { icon: "pin", image: "/illustrations/home/specialty-spine-surgery.svg", title: "Spine Surgery", desc: "Minimally invasive spinal fusion and disc replacement therapy.", cta: "Book Case" },
  { icon: "neurology", image: "/illustrations/why-choose/personalized-treatment.svg", title: "Neurology", desc: "Diagnosis and management of epilepsy, stroke, and Parkinson's.", cta: "Clinical Visit" },
  { icon: "biotech", image: "/illustrations/home/specialty-neuro-endoscopy.svg", title: "Neuro-Endoscopy", desc: "Keyhole surgical techniques for rapid patient recovery.", cta: "Explore Tech" },
];

export function SpecialtiesGrid() {
  return (
    <section className="mx-auto max-w-container-max px-margin-mobile py-section-gap-sm md:px-margin-desktop">
      <SectionHeading
        eyebrow="Areas of Focus"
        title="Precision Specialties"
        subtitle="Providing comprehensive neurological interventions using state-of-the-art diagnostic and surgical technology."
      />
      <Stagger className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-4">
        {SPECIALTIES.map((item) => (
          <StaggerChild key={item.title}>
            <GlassCard radius="2xl" className="group flex h-full flex-col items-center p-7 text-center">
              {/* This hex badge keeps its own signature interaction (icon inverts to
                  dark on a solid-purple hex when hovered) rather than adopting the
                  generic neon-glass container — so color here is inherited from the
                  parent (text-neon at rest, text-background on hover) instead of the
                  NeonIcon component, which would hard-code a color and break the
                  inversion. The neon glow bloom is still applied, just via a
                  drop-shadow that doesn't touch color. */}
              <div className="hex-icon mb-5 flex h-[92px] w-[92px] items-center justify-center border border-neon-border bg-neon-container text-neon shadow-neon-rest transition-all duration-300 ease-premium group-hover:scale-[1.08] group-hover:bg-neon group-hover:text-background group-hover:shadow-neon-hover">
                {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                ) : (
                  <span className="material-symbols-outlined text-4xl [filter:drop-shadow(0_0_4px_rgba(192,38,255,.55))_drop-shadow(0_0_10px_rgba(168,85,247,.35))] group-hover:![filter:none]">
                    {item.icon}
                  </span>
                )}
              </div>
              <h3 className="mb-3 text-card-title text-white">{item.title}</h3>
              <p className="mb-6 text-body text-on-surface-variant">{item.desc}</p>
              <Button variant="outline" size="md" className="mt-auto">
                {item.cta}
              </Button>
            </GlassCard>
          </StaggerChild>
        ))}
      </Stagger>
    </section>
  );
}
