import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { NeonIcon } from "@/components/ui/NeonIcon";

const expertiseLinks = ["Neurosurgery", "Neurology", "Spine Care", "Neuro-Oncology"];
const journeyLinks = [
  { label: "First Visit Guide", href: "#" },
  { label: "Clinical Research", href: "#" },
  { label: "Recovery Resources", href: "#" },
  { label: "Insurance & Billing", href: "#" },
];

/** Shared footer, identical across every page. */
export function Footer() {
  return (
    <footer className="w-full border-t border-outline-variant/30 bg-surface-container-lowest pb-10 pt-section-gap">
      <div className="mx-auto grid max-w-container-max grid-cols-1 gap-gutter px-margin-mobile md:grid-cols-4 md:px-margin-desktop">
        <Reveal className="space-y-6">
          <div className="flex items-center gap-3">
            <NeonIcon name="neurology" className="text-2xl" />
            <span className="text-card-title font-bold text-primary">Dr. Ayman Tarek</span>
          </div>
          <p className="text-body text-on-surface-variant">
            Setting the global standard in neurological surgery and clinical diagnostics through precision,
            passion, and technological innovation.
          </p>
          <div className="flex gap-4">
            {["face_nod", "camera", "group"].map((icon) => (
              <a key={icon} href="#" className="icon-badge-neon flex h-10 w-10 items-center justify-center rounded-full">
                <NeonIcon name={icon} className="text-xl" />
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h4 className="mb-6 text-micro uppercase tracking-widest text-white">Expertise</h4>
          <ul className="space-y-3">
            {expertiseLinks.map((label) => (
              <li key={label}>
                <a
                  href="#"
                  className="block text-body text-on-surface-variant transition-transform hover:translate-x-1 hover:text-secondary"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <h4 className="mb-6 text-micro uppercase tracking-widest text-white">Patient Journey</h4>
          <ul className="space-y-3">
            {journeyLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="block text-body text-on-surface-variant transition-transform hover:translate-x-1 hover:text-secondary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.15}>
          <h4 className="mb-6 text-micro uppercase tracking-widest text-white">Newsletter</h4>
          <p className="mb-4 text-body text-on-surface-variant">
            Get the latest medical breakthroughs delivered to your inbox.
          </p>
          <div className="relative">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full rounded-full border border-outline-variant/30 bg-surface-container px-6 py-3 text-white placeholder-on-surface-variant/40 outline-none transition-shadow focus:border-primary focus:shadow-glow"
            />
            <button className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full btn-primary">
              <span className="material-symbols-outlined text-sm text-white">send</span>
            </button>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 flex max-w-container-max flex-col items-center justify-between gap-6 border-t border-outline-variant/10 px-margin-mobile pt-8 md:flex-row md:px-margin-desktop">
        <p className="text-body text-on-surface-variant">© 2024 Dr. Ayman Tarek. Global Excellence in Neurosurgery.</p>
        <div className="flex gap-8">
          <Link href="#" className="text-small text-on-surface-variant hover:text-primary">
            Privacy Policy
          </Link>
          <Link href="#" className="text-small text-on-surface-variant hover:text-primary">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
