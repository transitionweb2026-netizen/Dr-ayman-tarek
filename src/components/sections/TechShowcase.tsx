import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerChild } from "@/components/motion/Stagger";
import { Button } from "@/components/ui/Button";
import { IconBadge } from "@/components/ui/IconBadge";

const TECHNOLOGIES = [
  { icon: "biotech", title: "Advanced Microsurgery", desc: "Sub-millimeter precision under high-magnification optics." },
  { icon: "camera", title: "Endoscopic Neurosurgery", desc: "Keyhole access for reduced trauma and faster healing." },
  { icon: "explore", title: "Neuronavigation", desc: "Real-time 3D guidance during complex procedures." },
  { icon: "smart_toy", title: "AI Assisted Diagnosis", desc: "Machine-learning-supported imaging analysis." },
  { icon: "view_in_ar", title: "3D Surgical Planning", desc: "Patient-specific virtual modeling before every operation." },
  { icon: "monitor_heart", title: "Intraoperative Monitoring", desc: "Continuous neurophysiological monitoring for maximum safety." },
];

const SHOWCASE_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA10COCVRZUzCR5poskQ_iQU3hcQgw2sADo1ajqYliBOgACwocRoZU3uix5Xve7zyPzkt_E85jdr-kBekmHVNZ4fvQy183PKBufdMAH-66Q7_PSQWyYn_uGqt_rG-RngbcUBOneis0gsVCQqM8cifMFpihIw3kJyxeO1Pzjq9dd71nbuECfqO4nZUVZ44miHviRxUktulScPme416YaPYOZqENDae0l-LYab63hUjlOPRtHhSMHHyvk";

export function TechShowcase() {
  return (
    <section className="mx-auto max-w-container-max px-margin-mobile pb-section-gap-sm md:px-margin-desktop">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.9fr_1fr_0.9fr]">
        <Stagger className="order-2 space-y-5 lg:order-1" gap={0.08}>
          {TECHNOLOGIES.map((tech) => (
            <StaggerChild key={tech.title} className="flex items-start gap-4">
              <IconBadge icon={tech.icon} className="h-11 w-11 rounded-full" iconClassName="text-xl" />
              <div>
                <h4 className="text-body-lg font-bold text-white">{tech.title}</h4>
                <p className="text-small text-on-surface-variant">{tech.desc}</p>
              </div>
            </StaggerChild>
          ))}
        </Stagger>

        <Reveal scale className="relative order-1 flex items-center justify-center lg:order-2">
          <div className="absolute inset-6 rounded-full bg-primary/25 blur-[80px]" />
          <div className="relative aspect-square w-full max-w-[420px] animate-float-y overflow-hidden rounded-[36px] glass border-primary/20 shadow-glow-lg">
            <Image src={SHOWCASE_IMAGE} alt="Advanced neurosurgical technology" fill className="object-cover" />
          </div>
        </Reveal>

        <div className="order-3 space-y-6 text-center lg:text-left">
          <Reveal>
            <h2 className="text-section-title text-white">Latest Technologies We Use</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-body text-on-surface-variant">
              Every procedure is supported by a fully integrated technology stack — from AI-assisted diagnosis to
              robotic-guided precision in the operating room — designed to maximize safety and minimize recovery
              time.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <Button>Book Appointment</Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
