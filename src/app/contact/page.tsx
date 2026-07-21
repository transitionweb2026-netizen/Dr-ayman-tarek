import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { GlassCard } from "@/components/ui/GlassCard";
import { IconBadge } from "@/components/ui/IconBadge";
import { NeonIcon } from "@/components/ui/NeonIcon";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerChild } from "@/components/motion/Stagger";

export const metadata: Metadata = { title: "Contact" };

const QUICK_INFO = [
  { icon: "call", value: "+20 100 000 0000", label: "Call Us Directly" },
  { icon: "mail", value: "info@drayamantarek.com", label: "Email Us" },
  { icon: "location_on", value: "42 Excellence Avenue, Cairo", label: "Visit the Clinic" },
  { icon: "schedule", value: "Sat - Thu: 9 AM - 7 PM", label: "Working Hours" },
];

const FAQ_ITEMS = [
  { question: "How quickly will I hear back after submitting the form?", answer: "Our patient coordination team responds to all requests within one business day. For urgent matters, please call the clinic directly." },
  { question: "Do you accept walk-in patients?", answer: "We recommend booking ahead to guarantee a consultation slot, but our front desk will always do its best to accommodate walk-ins based on availability." },
  { question: "Can I request a specific appointment time?", answer: "Yes — mention your preferred date and time in the message field and our team will confirm the closest available slot." },
  { question: "What should I do in a neurological emergency?", answer: "Call our 24/7 emergency line immediately, or head to the nearest emergency room if symptoms are severe. Do not wait for an online response." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="Contact Us"
        subtitle="We're here to help you take the first step toward better neurological health."
        align="center"
        height="sm"
      />

      <section className="mx-auto max-w-container-max px-margin-mobile py-section-gap-sm md:px-margin-desktop">
        <GlassCard radius="3xl" interactive={false} className="w-full px-gutter py-10 shadow-glow">
          <Stagger className="grid grid-cols-1 gap-6 text-center sm:grid-cols-2 lg:grid-cols-4" gap={0.08}>
            {QUICK_INFO.map((item) => (
              <StaggerChild key={item.label} className="flex flex-col items-center gap-3">
                <IconBadge icon={item.icon} className="h-14 w-14 rounded-2xl" />
                <p className="text-body-lg font-bold text-white">{item.value}</p>
                <p className="text-small text-on-surface-variant">{item.label}</p>
              </StaggerChild>
            ))}
          </Stagger>
        </GlassCard>
      </section>

      <section className="mx-auto grid max-w-container-max grid-cols-1 items-start gap-10 px-margin-mobile py-section-gap-sm md:px-margin-desktop lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <ContactForm />
        </Reveal>

        <div className="space-y-6">
          <Reveal delay={0.06}>
            <GlassCard radius="2xl" interactive={false} className="overflow-hidden">
              <div className="line-grid relative flex aspect-[4/3] items-center justify-center bg-surface-container">
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/30" />
                <div className="relative flex flex-col items-center">
                  <NeonIcon name="location_on" filled className="animate-pulse-node text-5xl" />
                  <span className="glass mt-2 rounded-full px-4 py-1.5 text-small text-white">
                    42 Excellence Avenue, Cairo, Egypt
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 p-5">
                <p className="text-small text-on-surface-variant">Map preview — interactive map loads on the live site.</p>
                <a href="#" className="flex shrink-0 items-center gap-1 text-small text-primary">
                  <NeonIcon name="open_in_new" className="text-lg" />Directions
                </a>
              </div>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.12}>
            <GlassCard radius="2xl" interactive={false} className="p-7">
              <h3 className="mb-5 text-card-title text-white">Clinic Hours</h3>
              <div className="space-y-3 text-body">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Saturday - Thursday</span>
                  <span className="font-bold text-white">9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Friday</span>
                  <span className="font-bold text-white">Closed</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Critical Care Unit</span>
                  <span className="font-bold text-primary">Open 24/7</span>
                </div>
              </div>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.18}>
            <GlassCard radius="2xl" interactive={false} className="border-error/30 p-7 shadow-[0_0_40px_rgba(255,180,171,0.1)]">
              {/* Intentionally excluded from the neon system: this badge is red/error
                  to signal urgency, matching the card's own error-colored border.
                  Recoloring it neon purple would undercut that "this is urgent"
                  semantic, so it keeps its own color instead. */}
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-error/40 bg-error/10">
                  <span className="material-symbols-outlined fill-icon text-2xl text-error">emergency</span>
                </span>
                <div>
                  <h3 className="mb-1 text-body-lg font-bold text-white">Emergency Contact</h3>
                  <p className="mb-2 text-small text-on-surface-variant">
                    For urgent neurological symptoms, do not wait for a callback — call our emergency line
                    immediately.
                  </p>
                  <a href="tel:+201099999999" className="text-card-title font-bold text-error">
                    +20 109 999 9999
                  </a>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <FaqSection title="Contact Questions" items={FAQ_ITEMS} />

      <FinalCta
        heading="Prefer to Talk It Through First?"
        subtitle="Message us directly on WhatsApp and a member of our team will guide you through the next steps."
      />
    </>
  );
}
