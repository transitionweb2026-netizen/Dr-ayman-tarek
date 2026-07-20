import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { TechShowcase } from "@/components/sections/TechShowcase";
import { PatientJourney } from "@/components/sections/PatientJourney";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = { title: "Services" };

const WHY_CHOOSE = [
  { icon: "tune", title: "Personalized Treatment", desc: "Care plans built entirely around each patient's diagnosis and goals." },
  { icon: "workspace_premium", title: "Experienced Surgeon", desc: "Over 20 years of specialized neurosurgical practice." },
  { icon: "precision_manufacturing", title: "Advanced Technology", desc: "Robotic navigation, AI diagnostics, and intraoperative imaging." },
  { icon: "public", title: "International Standards", desc: "Protocols aligned with globally recognized surgical societies." },
  { icon: "domain", title: "Modern Facilities", desc: "State-of-the-art operating suites and diagnostic centers." },
  { icon: "bolt", title: "Fast Recovery", desc: "Minimally invasive techniques that shorten downtime." },
  { icon: "volunteer_activism", title: "Patient-Centered Care", desc: "Transparent communication at every step of the journey." },
];

const FAQ_ITEMS = [
  { question: "How do I know if I need to see a neurosurgeon?", answer: "If you're experiencing persistent headaches, chronic back or neck pain, numbness, or neurological symptoms that haven't improved with conservative treatment, a specialist consultation can help identify the underlying cause and the right next step." },
  { question: "Are minimally invasive procedures as effective as open surgery?", answer: "In most eligible cases, yes. Minimally invasive and endoscopic techniques achieve comparable surgical outcomes to open surgery, with the added benefit of smaller incisions, less blood loss, and a faster return to daily activities." },
  { question: "What should I bring to my first consultation?", answer: "Please bring any prior imaging (MRI/CT scans), a list of current medications, relevant medical records, and your insurance information so we can give you the most accurate assessment." },
  { question: "How long is the typical recovery period?", answer: "Recovery time varies significantly by procedure — from a few days for minimally invasive treatments to several weeks for complex reconstructive surgery. Your surgeon will outline a specific recovery timeline during your consultation." },
  { question: "Do you offer remote or second-opinion consultations?", answer: "Yes. We offer virtual second-opinion consultations for patients who have already been diagnosed elsewhere and would like an independent review of their imaging and treatment plan." },
  { question: "Is financing or insurance support available?", answer: "Our patient coordination team works directly with most major insurance providers and can also discuss flexible payment options during your first visit." },
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
      <PatientJourney />
      <FaqSection title="Frequently Asked Questions" items={FAQ_ITEMS} />
      <FinalCta
        heading="Ready to Take the First Step Toward Better Health?"
        subtitle="Schedule a consultation with Dr. Ayman Tarek and get a clear, expert plan built around your diagnosis."
      />
    </>
  );
}
