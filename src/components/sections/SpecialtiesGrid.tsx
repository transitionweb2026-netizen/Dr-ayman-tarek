import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Stagger, StaggerChild } from "@/components/motion/Stagger";
import { Button } from "@/components/ui/Button";

const SPECIALTIES = [
  { icon: "grain", title: "Brain Tumors", desc: "Advanced micro-surgical resection of complex neuro-oncology cases.", cta: "Consult Expert" },
  { icon: "pin", title: "Spine Surgery", desc: "Minimally invasive spinal fusion and disc replacement therapy.", cta: "Book Case" },
  { icon: "neurology", title: "Neurology", desc: "Diagnosis and management of epilepsy, stroke, and Parkinson's.", cta: "Clinical Visit" },
  { icon: "biotech", title: "Neuro-Endoscopy", desc: "Keyhole surgical techniques for rapid patient recovery.", cta: "Explore Tech" },
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
              <div className="hex-icon mb-5 flex h-[92px] w-[92px] items-center justify-center border border-primary/30 bg-primary/10 shadow-[0_0_25px_rgba(196,61,255,0.15)] transition-all duration-500 group-hover:bg-primary group-hover:text-background group-hover:shadow-[0_0_35px_rgba(196,61,255,0.5)]">
                <span className="material-symbols-outlined text-4xl">{item.icon}</span>
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
