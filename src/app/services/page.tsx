import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { TechShowcase } from "@/components/sections/TechShowcase";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = { title: "Services" };

const WHY_CHOOSE = [
  { icon: "tune", image: "/illustrations/why-choose/personalized-treatment.svg", title: "Personalized Treatment", desc: "Care plans built entirely around each patient's diagnosis and goals." },
  { icon: "workspace_premium", image: "/illustrations/why-choose/experienced-surgeon.svg", title: "Experienced Surgeon", desc: "Over 20 years of specialized neurosurgical practice." },
  { icon: "precision_manufacturing", image: "/illustrations/why-choose/advanced-technology.svg", title: "Advanced Technology", desc: "Robotic navigation, AI diagnostics, and intraoperative imaging." },
  { icon: "public", image: "/illustrations/why-choose/international-standards.svg", title: "International Standards", desc: "Protocols aligned with globally recognized surgical societies." },
  { icon: "domain", image: "/illustrations/why-choose/modern-facilities.svg", title: "Modern Facilities", desc: "State-of-the-art operating suites and diagnostic centers." },
  { icon: "bolt", image: "/illustrations/why-choose/fast-recovery.svg", title: "Fast Recovery", desc: "Minimally invasive techniques that shorten downtime." },
  { icon: "volunteer_activism", image: "/illustrations/why-choose/patient-centered-care.svg", title: "Patient-Centered Care", desc: "Transparent communication at every step of the journey." },
  { icon: "shield", image: "/illustrations/why-choose/safety-first.svg", title: "Safety First", desc: "Rigorous safety protocols, continuous monitoring, and uncompromising patient protection throughout every stage of treatment." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Offer"
        title="Services"
        subtitle="Professional Neurosurgical Care & Advanced Medical Solutions"
        ctaLabel="Book Now"
      />
      <ServicesGrid />
      <FeatureGrid eyebrow="Why Us" title="Why Choose Our Services" subtitle="Every treatment plan is built on precision, safety, and genuine care for the patient behind the diagnosis." features={WHY_CHOOSE} />
      <TechShowcase />
      <FinalCta
        heading="Ready to Take the First Step Toward Better Health?"
        subtitle="Schedule a consultation with Dr. Ayman Tarek and get a clear, expert plan built around your diagnosis."
      />
    </>
  );
}
