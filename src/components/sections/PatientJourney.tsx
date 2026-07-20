import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconBadge } from "@/components/ui/IconBadge";
import { Stagger, StaggerChild } from "@/components/motion/Stagger";

const STEPS = [
  { icon: "forum", title: "Consultation", desc: "A thorough discussion of your symptoms, history, and goals." },
  { icon: "quick_reference_all", title: "Diagnosis", desc: "Advanced imaging and testing to pinpoint the exact condition." },
  { icon: "medical_services", title: "Treatment", desc: "A personalized surgical or non-surgical treatment plan." },
  { icon: "favorite", title: "Recovery", desc: "Structured follow-up care to support a full, lasting recovery." },
];

export function PatientJourney() {
  return (
    <section className="mx-auto max-w-container-max px-margin-mobile pb-section-gap-sm md:px-margin-desktop">
      <SectionHeading
        title="Your Treatment Journey"
        subtitle="A clear, guided path from your first consultation to a full recovery."
      />
      <div className="relative">
        <div className="absolute left-[12.5%] right-[12.5%] top-9 hidden h-px bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 lg:block" />
        <Stagger className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-4" gap={0.12}>
          {STEPS.map((step) => (
            <StaggerChild key={step.title} className="relative flex flex-col items-center text-center">
              <IconBadge icon={step.icon} className="relative z-10 mb-5 h-[72px] w-[72px] rounded-full" iconClassName="text-3xl" />
              <h3 className="mb-2 text-card-title text-white">{step.title}</h3>
              <p className="text-small text-on-surface-variant">{step.desc}</p>
            </StaggerChild>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
