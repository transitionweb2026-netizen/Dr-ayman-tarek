import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { Timeline } from "@/components/sections/Timeline";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { FinalCta } from "@/components/sections/FinalCta";
import { GlassCard } from "@/components/ui/GlassCard";
import { ImageBadge } from "@/components/ui/ImageBadge";
import { NeonIcon } from "@/components/ui/NeonIcon";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerChild } from "@/components/motion/Stagger";

export const metadata: Metadata = { title: "About" };

const MISSION_CARDS = [
  { icon: "flag", image: "/illustrations/about/mission-flag.svg", title: "Our Mission", desc: "To deliver world-class neurosurgical care that combines the latest medical technology with genuine, personalized attention — restoring not just function, but confidence." },
  { icon: "visibility", image: "/illustrations/about/vision-eye.svg", title: "Our Vision", desc: "To be the region's most trusted destination for neurological and spinal care, recognized for outcomes, innovation, and the quality of the patient experience." },
  { icon: "diversity_3", image: "/illustrations/about/philosophy-community.svg", title: "Our Philosophy", desc: "Every patient is a partner in their own care. We believe informed, involved patients recover better — so we explain everything, and we never rush a decision." },
];

const CORE_VALUES = [
  { icon: "verified_user", image: "/illustrations/about/value-integrity.svg", title: "Integrity", desc: "Honest guidance, even when it means recommending against surgery." },
  { icon: "rocket_launch", image: "/illustrations/about/value-innovation.svg", title: "Innovation", desc: "Continuously adopting techniques that improve safety and outcomes." },
  { icon: "favorite", image: "/illustrations/about/value-compassion.svg", title: "Compassion", desc: "Treating the person, not just the scan." },
  { icon: "workspace_premium", image: "/illustrations/about/value-excellence.svg", title: "Excellence", desc: "Holding every procedure to the same exacting standard." },
  { icon: "shield", image: "/illustrations/why-choose/safety-first.svg", title: "Safety", desc: "Rigorous protocols at every stage, from consultation to recovery." },
  { icon: "forum", image: "/illustrations/about/value-transparency.svg", title: "Transparency", desc: "Clear answers about risks, costs, and expected outcomes." },
];

const MILESTONES = [
  { year: "2024", title: "Appointed Chief of Neurosurgery", place: "Elite International Medical Center" },
  { year: "2022", title: "Excellence in Innovation Award", place: "World Federation of Neurosurgical Societies" },
  { year: "2019", title: "Introduced Robotic-Assisted Spine Program", place: "First of its kind in the region" },
  { year: "2018", title: "Surgical Fellowship Program", place: "Royal College of Surgeons" },
  { year: "2014", title: "Specialization PhD Completion", place: "Global Medical University" },
  { year: "2004", title: "Began Neurosurgical Residency", place: "The journey begins" },
];

const CREDENTIALS = [
  { icon: "school", image: "/illustrations/about/credential-phd.svg", title: "PhD in Neurosurgery", desc: "Global Medical University" },
  { icon: "groups", image: "/illustrations/about/credential-wfns.svg", title: "Fellow of WFNS", desc: "World Federation of Neurosurgical Societies" },
  { icon: "psychology", image: "/illustrations/about/credential-board-brain.svg", title: "Board-Certified Neurology Consultant", desc: "National Board of Medical Specialties" },
  { icon: "public", image: "/illustrations/why-choose/international-standards.svg", title: "International Speaker", desc: "30+ global neurosurgical conferences" },
];

const FACILITY_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA10COCVRZUzCR5poskQ_iQU3hcQgw2sADo1ajqYliBOgACwocRoZU3uix5Xve7zyPzkt_E85jdr-kBekmHVNZ4fvQy183PKBufdMAH-66Q7_PSQWyYn_uGqt_rG-RngbcUBOneis0gsVCQqM8cifMFpihIw3kJyxeO1Pzjq9dd71nbuECfqO4nZUVZ44miHviRxUktulScPme416YaPYOZqENDae0l-LYab63hUjlOPRtHhSMHHyvk";

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="About Dr. Ayman Tarek"
        subtitle="Two decades of precision, compassion, and relentless pursuit of better outcomes in neurological care."
      />

      <AboutPreview title="A Career Built on Precision and Purpose" videoCaption="A Message From Dr. Tarek">
        <p className="text-body-lg text-on-surface-variant">
          Dr. Ayman Tarek&apos;s path into neurosurgery began with a simple conviction: that the most complex organ
          in the human body deserves the most meticulous, most human care. Over more than twenty years, that
          conviction has shaped a career defined by technical mastery and an unwavering focus on the person behind
          every diagnosis.
        </p>
        <p className="text-body text-on-surface-variant">
          From his early training in advanced microsurgical techniques to his current role leading a
          multidisciplinary neurosurgical team, Dr. Tarek has treated thousands of patients facing some of the most
          difficult moments of their lives — and has built his practice around giving them clarity, options, and
          genuine hope.
        </p>
      </AboutPreview>

      <section className="mx-auto max-w-container-max px-margin-mobile pt-section-gap-sm md:px-margin-desktop">
        <Stagger className="grid grid-cols-1 gap-gutter md:grid-cols-3" gap={0.1}>
          {MISSION_CARDS.map((card) => (
            <StaggerChild key={card.title}>
              <GlassCard radius="2xl" className="h-full p-8">
                <ImageBadge src={card.image} alt={card.title} className="mb-6 h-16 w-16 rounded-2xl" />
                <h3 className="mb-3 text-card-title text-white">{card.title}</h3>
                <p className="text-body text-on-surface-variant">{card.desc}</p>
              </GlassCard>
            </StaggerChild>
          ))}
        </Stagger>
      </section>

      <FeatureGrid
        title="The Values That Guide Us"
        subtitle="Every decision in this practice, clinical or otherwise, is measured against these six principles."
        features={CORE_VALUES}
        layout="icon-side"
        columns={3}
      />

      <Timeline
        title="Experience & Milestones"
        subtitle="A career shaped by continuous learning and recognition from the global neurosurgical community."
        entries={MILESTONES}
      />

      <FeatureGrid
        title="Credentials & Certifications"
        subtitle="Internationally recognized qualifications that reflect a lifelong commitment to surgical excellence."
        features={CREDENTIALS}
      />

      <StatsStrip />

      <section className="mx-auto grid max-w-container-max grid-cols-1 items-center gap-10 px-margin-mobile py-section-gap-sm md:px-margin-desktop lg:grid-cols-2 lg:gap-14">
        <div className="space-y-6">
          <Reveal>
            <h2 className="text-section-title text-white">A World-Class Facility</h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="text-body-lg text-on-surface-variant">
              Every procedure takes place in a facility purpose-built for neurological care — from intraoperative
              imaging suites to a dedicated neuro-critical care unit staffed around the clock.
            </p>
          </Reveal>
          <Stagger className="space-y-4" gap={0.08}>
            {[
              "State-of-the-art operating suites with intraoperative MRI",
              "Dedicated neuro-critical care and recovery unit",
              "On-site advanced imaging and diagnostics center",
            ].map((item) => (
              <StaggerChild key={item} className="flex items-center gap-3">
                <NeonIcon name="check_circle" filled className="text-xl" />
                <span className="text-body text-on-surface">{item}</span>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
        <Reveal direction="right" className="group relative">
          <div className="absolute -inset-4 rounded-3xl bg-primary/15 blur-3xl transition-all duration-700 group-hover:bg-primary/25" />
          <GlassCard radius="3xl" interactive={false} className="relative aspect-[4/3] overflow-hidden">
            <Image src={FACILITY_IMAGE} alt="Neurosurgical facility" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
          </GlassCard>
        </Reveal>
      </section>

      <FinalCta
        heading="Ready to Meet Dr. Tarek?"
        subtitle="Schedule a consultation and take the first step toward expert, compassionate neurological care."
      />
    </>
  );
}
