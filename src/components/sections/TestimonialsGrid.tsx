import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerChild } from "@/components/motion/Stagger";

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

function Stars() {
  return (
    <div className="mb-3 flex justify-center gap-0.5 text-[#FFB020] drop-shadow-[0_0_6px_rgba(255,176,32,0.5)]">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="material-symbols-outlined fill-icon text-base">
          star
        </span>
      ))}
    </div>
  );
}

/** Flat grid of testimonial mini-cards — used where a large volume of reviews needs a compact layout. */
export function TestimonialsGrid({ title, testimonials }: { title: string; testimonials: Testimonial[] }) {
  return (
    <section className="mx-auto max-w-container-max px-margin-mobile pt-section-gap-sm pb-section-gap-sm md:px-margin-desktop">
      <SectionHeading title={title} />
      <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6" gap={0.05}>
        {testimonials.map((t) => (
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
    </section>
  );
}
