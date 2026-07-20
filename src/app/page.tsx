import { HomeHero } from "@/components/sections/HomeHero";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { SpecialtiesGrid } from "@/components/sections/SpecialtiesGrid";
import { TestimonialsPanel } from "@/components/sections/TestimonialsPanel";
import { InsightsFaq } from "@/components/sections/InsightsFaq";
import { VideoSeriesPreview } from "@/components/sections/VideoSeriesPreview";
import { FinalCta } from "@/components/sections/FinalCta";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <StatsStrip overlap />
      <AboutPreview
        title="About the Surgeon"
        cta={
          <button className="group flex items-center gap-2 text-small text-primary">
            Download Full Medical Biography
            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
          </button>
        }
      >
        <p className="text-body-lg text-on-surface-variant">
          Dr. Ayman Tarek is a globally recognized neurosurgeon specializing in minimally invasive brain and spine
          procedures. His approach fuses traditional surgical mastery with advanced robotic navigation and
          intraoperative imaging.
        </p>
      </AboutPreview>
      <SpecialtiesGrid />
      <TestimonialsPanel />
      <InsightsFaq />
      <VideoSeriesPreview />
      <FinalCta
        heading="Ready for a Specialist Consultation?"
        subtitle="Don't wait for your symptoms to escalate. Secure an appointment with Dr. Ayman Tarek and begin your journey toward recovery with elite care."
        primaryLabel="Book My Appointment"
      />
    </>
  );
}
