import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { TestimonialsGrid } from "@/components/sections/TestimonialsGrid";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { NeonIcon } from "@/components/ui/NeonIcon";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = { title: "Cosmetic Surgery" };

const CERTIFICATES = [
  { icon: "workspace_premium", title: "European Board of Plastic Surgery", desc: "An internationally recognized accreditation for the highest standard of surgical practice." },
  { icon: "verified", title: "ISAPS International Fellowship", desc: "Fellowship membership in advanced surgical and aesthetic techniques." },
  { icon: "local_hospital", title: "Diploma in Burns & Reconstructive Surgery", desc: "Specialized training in tissue reconstruction and complex burn care." },
  { icon: "colorize", title: "Advanced Aesthetic Injectables Certification", desc: "Specialized training in the latest safe Botox and filler protocols." },
  { icon: "groups", title: "Egyptian Society of Plastic Surgery Membership", desc: "Active member of the scientific board of the national plastic surgery society." },
  { icon: "military_tech", title: "Excellence in Body Contouring Award", desc: "Scientific recognition for excellence in safe body-sculpting techniques." },
];

const SPECIALTIES = [
  { icon: "spa", title: "Liposuction & Body Contouring", desc: "Precision body sculpting with faster recovery times." },
  { icon: "face", title: "Rhinoplasty", desc: "Natural balance between form and breathing function." },
  { icon: "face_retouching_natural", title: "Facelift & Neck Lift", desc: "A more youthful look with virtually invisible scarring." },
  { icon: "favorite", title: "Breast Augmentation & Reduction", desc: "Tailored solutions balancing proportion and comfort." },
  { icon: "healing", title: "Burn & Reconstructive Surgery", desc: "Rebuilding damaged tissue with high surgical precision." },
  { icon: "vaccines", title: "Botox & Dermal Fillers", desc: "Non-surgical solutions for immediate, natural-looking results." },
];

const ACHIEVEMENTS = [
  { icon: "timeline", title: "15+ Years of Experience", desc: "Over 4,000 successful cosmetic and reconstructive procedures across a career spanning Egypt and the Gulf region." },
  { icon: "podium", title: "International Conference Speaker", desc: "Keynote speaker at more than 30 scientific conferences on the latest cosmetic surgery techniques." },
  { icon: "science", title: "Peer-Reviewed Research Publications", desc: "Author of more than 12 scientific papers published in specialized plastic surgery journals." },
  { icon: "public", title: "Patients From 20+ Countries", desc: "Growing trust from international patients seeking premium cosmetic care." },
];

const STATS = [
  { icon: "workspace_premium", value: 4000, suffix: "+", label: "Successful Surgeries" },
  { icon: "military_tech", value: 15, suffix: "+", label: "Years of Experience" },
  { icon: "favorite", value: 6000, suffix: "+", label: "Happy Patients" },
  { icon: "groups", value: 30, suffix: "+", label: "International Conferences" },
  { icon: "science", value: 12, suffix: "+", label: "Scientific Publications" },
];

const TESTIMONIALS = [
  { quote: "My facelift result exceeded every expectation — completely natural, with wonderful aftercare.", name: "Sarah Collins", role: "Facelift Patient" },
  { quote: "Dr. Ayman was honest with me from the very first consultation, and my rhinoplasty result looks completely natural.", name: "Michael Reed", role: "Rhinoplasty Patient" },
  { quote: "The clinic team is incredibly professional, and my liposuction procedure was safe with a fast recovery.", name: "Amanda Foster", role: "Liposuction Patient" },
  { quote: "After my accident I was afraid of how the scar would look, but reconstructive surgery gave me my confidence back.", name: "James Whitfield", role: "Reconstructive Surgery Patient" },
  { quote: "My Botox sessions were quick and painless, and the result looks completely natural with no frozen expression.", name: "Jasmine Carter", role: "Injectables Patient" },
  { quote: "A truly refined level of care from day one, with a detailed explanation of every step before my breast augmentation.", name: "Emily Harrison", role: "Breast Augmentation Patient" },
  { quote: "Best decision I've made — Dr. Ayman is incredibly approachable and the result of my rhinoplasty is beautiful.", name: "Olivia Bennett", role: "Rhinoplasty Patient" },
  { quote: "Post-operative follow-up was excellent, and the nursing team was incredibly supportive throughout my recovery.", name: "Daniel Brooks", role: "Tummy Tuck Patient" },
  { quote: "I traveled internationally specifically for treatment here, and the reception and care were more than wonderful.", name: "Layla Haddad", role: "International Patient" },
  { quote: "Exceptional attention to detail — my neck lift result made me look years younger.", name: "Robert Ellis", role: "Neck Lift Patient" },
  { quote: "I was very nervous before the procedure, but the doctor's calm, reassuring approach put me completely at ease.", name: "Grace Turner", role: "Breast Reduction Patient" },
  { quote: "A rare level of professionalism, from the first consultation through to full recovery.", name: "Thomas Wright", role: "Scar Revision Patient" },
];

export default function DrAymanTarekPage() {
  return (
    <>
      <PageHero
        eyebrow="Excellence in Precision Cosmetic Surgery"
        title={
          <>
            Natural Beauty.
            <br />
            Precisely Crafted.
          </>
        }
        subtitle="Dr. Ayman Tarek, Consultant Plastic, Cosmetic & Reconstructive Surgeon, blends surgical precision with an artistic eye to deliver safe, natural results built entirely around you."
        image={null}
        ctaLabel="Book Now"
        height="md"
      />

      <AboutPreview
        title="About Dr. Ayman Tarek"
        videoCaption="Doctor Introduction Video"
        videoImage="https://lh3.googleusercontent.com/aida-public/AB6AXuDT02aCXBfYCWE8rbwfhuNv_I8eAL7C0AlQUQu0RKPoG3OhOWu6zfPyjGgq6Qkpe2JmNyY7TwRfJL6EBx4DbAF4W2hmpO-4Ry2B7rM4AjafcZGL2IeszWF0bwHj5d_PD_XKC75OpP0uK1lA7CfiRyYNqh3dbKtKci2TnVpbQke6eRod8-2rocqS6KQ8U-UHLgPOjFc8QUlrxDDOZSwI70YJB9TE252FVlkjWd77tdI5MWTU1lFV_yb9"
      >
        <p className="text-body-lg text-on-surface-variant">
          Dr. Ayman Tarek is a Consultant Plastic, Cosmetic &amp; Reconstructive Surgeon with more than 15 years of
          experience. His approach combines internationally recognized surgical techniques with meticulous
          attention to detail, tailored to each patient&apos;s unique goals.
        </p>
        <p className="text-body text-on-surface-variant">
          He holds several internationally accredited fellowships and has presented at dozens of scientific
          conferences worldwide, with an unwavering commitment to safety and quality at every stage of the patient
          journey.
        </p>
      </AboutPreview>

      <FeatureGrid
        title="Certificates & Accreditations"
        subtitle="International certifications and fellowships reflecting Dr. Ayman Tarek's commitment to the highest surgical and scientific standards."
        features={CERTIFICATES}
        columns={3}
      />

      <FeatureGrid
        title="Technical Specialties"
        subtitle="A comprehensive range of cosmetic and reconstructive procedures using the latest precision techniques."
        features={SPECIALTIES}
        layout="icon-side"
        columns={3}
      />

      <FeatureGrid
        title="Professional Achievements"
        subtitle="A career defined by scientific and clinical excellence, both locally and internationally."
        features={ACHIEVEMENTS}
      />

      <StatsStrip stats={STATS} />

      <TestimonialsGrid title="Patient Testimonials" testimonials={TESTIMONIALS} />

      {/* Bespoke 3-column final CTA: icon / headline+CTAs / clinic info */}
      <section className="mx-auto mb-20 max-w-container-max px-margin-mobile md:px-margin-desktop">
        <GlassCard
          radius="3xl"
          interactive={false}
          className="grid grid-cols-1 items-center gap-10 overflow-hidden border-primary/15 p-margin-mobile text-center shadow-glow-lg md:grid-cols-[1fr_1.4fr_1fr] md:p-section-gap"
        >
          <Reveal scale className="flex items-center justify-center">
            <div className="icon-badge-neon mx-auto flex aspect-square w-full max-w-[220px] items-center justify-center rounded-full">
              <NeonIcon name="face_retouching_natural" className="animate-pulse text-[100px]" />
            </div>
          </Reveal>

          <div className="space-y-6">
            <Reveal>
              <h2 className="text-[42px] font-bold leading-tight text-white">
                Ready to Begin Your Transformation?
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="text-body-lg text-on-surface-variant">
                Book your consultation today with Dr. Ayman Tarek, and take the first step toward a natural, safe
                result.
              </p>
            </Reveal>
            <Reveal delay={0.12} className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="px-10 py-4 shadow-2xl">
                Book a Consultation
              </Button>
            </Reveal>
            <Reveal delay={0.18}>
              <Button
                variant="whatsapp"
                className="px-8 py-3"
                icon={
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.79.47 3.47 1.29 4.94L2 22l5.29-1.39a9.87 9.87 0 004.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.02c-.24.68-1.4 1.3-1.93 1.38-.49.08-1.11.11-1.79-.11-.41-.13-.94-.3-1.62-.6-2.85-1.23-4.71-4.1-4.85-4.29-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09 1-2.37.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.58.81 2 .88 2.14.07.14.11.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.71 1.17 1.52 1.9 1.05.94 1.93 1.23 2.21 1.37.28.14.44.12.61-.07.16-.19.7-.81.89-1.09.19-.28.38-.23.63-.14.26.09 1.65.78 1.93.92.28.14.47.21.54.33.07.12.07.68-.17 1.36z" />
                  </svg>
                }
              >
                Chat on WhatsApp
              </Button>
            </Reveal>
          </div>

          <Reveal delay={0.1} direction="right" className="space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center gap-3 md:justify-start">
              <NeonIcon name="location_on" className="shrink-0 text-2xl" />
              <div>
                <p className="text-body font-bold text-white">123 Victory Street, Nasr City, Cairo</p>
                <p className="text-small text-on-surface-variant">Clinic Address</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 md:justify-start">
              <NeonIcon name="schedule" className="shrink-0 text-2xl" />
              <div>
                <p className="text-body font-bold text-white">Sat - Thu: 10 AM - 8 PM</p>
                <p className="text-small text-on-surface-variant">Working Hours</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 md:justify-start">
              <NeonIcon name="call" className="shrink-0 text-2xl" />
              <div>
                <p className="text-body font-bold text-white">+20 100 000 0000</p>
                <p className="text-small text-on-surface-variant">Booking &amp; Inquiries</p>
              </div>
            </div>
          </Reveal>
        </GlassCard>
      </section>
    </>
  );
}
