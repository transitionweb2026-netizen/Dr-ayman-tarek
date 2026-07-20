import Image from "next/image";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerChild } from "@/components/motion/Stagger";

export interface Specialty {
  title: string;
  desc: string;
  image: string;
}

interface TechnicalSpecialtiesProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  specialties: Specialty[];
}

/** Same premium image-card treatment as ServiceCard (ServicesGrid) — image top, gradient fade, title + description. */
function SpecialtyCard({ specialty }: { specialty: Specialty }) {
  return (
    <GlassCard radius="2xl" className="group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={specialty.image}
          alt={specialty.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-card-title text-white">{specialty.title}</h3>
        <p className="text-body text-on-surface-variant">{specialty.desc}</p>
      </div>
    </GlassCard>
  );
}

export function TechnicalSpecialties({ eyebrow, title, subtitle, specialties }: TechnicalSpecialtiesProps) {
  return (
    <section className="mx-auto max-w-container-max px-margin-mobile pb-section-gap-sm md:px-margin-desktop">
      <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <Stagger className="grid grid-cols-1 items-start gap-gutter sm:grid-cols-2 lg:grid-cols-3">
        {specialties.map((specialty) => (
          <StaggerChild key={specialty.title}>
            <SpecialtyCard specialty={specialty} />
          </StaggerChild>
        ))}
      </Stagger>
    </section>
  );
}
