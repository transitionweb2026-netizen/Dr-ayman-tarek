"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { NeonIcon } from "@/components/ui/NeonIcon";
import { useLanguage } from "@/i18n/LanguageProvider";

const expertiseKeys = ["neurosurgery", "neurology", "spineCare", "neuroOncology"] as const;
const journeyLinks = [
  { key: "firstVisit", href: "#" },
  { key: "research", href: "#" },
  { key: "recovery", href: "#" },
  { key: "insurance", href: "#" },
] as const;

/** Shared footer, identical across every page. */
export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full border-t border-outline-variant/30 bg-surface-container-lowest pb-10 pt-section-gap">
      <div className="mx-auto grid max-w-container-max grid-cols-1 gap-gutter px-margin-mobile md:grid-cols-4 md:px-margin-desktop">
        <Reveal className="space-y-6">
          <div className="flex items-center gap-3">
            <NeonIcon name="neurology" className="text-2xl" />
            <span className="text-card-title font-bold text-primary">{t("meta.brand")}</span>
          </div>
          <p className="text-body text-on-surface-variant">{t("footer.description")}</p>
          <div className="flex gap-4">
            {["face_nod", "camera", "group"].map((icon) => (
              <a key={icon} href="#" className="icon-badge-neon flex h-12 w-12 items-center justify-center rounded-full">
                <NeonIcon name={icon} className="text-xl" />
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h4 className="mb-6 text-micro uppercase tracking-widest text-white">{t("footer.expertise.title")}</h4>
          <ul className="space-y-3">
            {expertiseKeys.map((key) => (
              <li key={key}>
                <a
                  href="#"
                  className="block text-body text-on-surface-variant transition-transform hover:translate-x-1 hover:text-secondary rtl:hover:-translate-x-1"
                >
                  {t(`footer.expertise.${key}`)}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <h4 className="mb-6 text-micro uppercase tracking-widest text-white">{t("footer.patientJourney.title")}</h4>
          <ul className="space-y-3">
            {journeyLinks.map((link) => (
              <li key={link.key}>
                <a
                  href={link.href}
                  className="block text-body text-on-surface-variant transition-transform hover:translate-x-1 hover:text-secondary rtl:hover:-translate-x-1"
                >
                  {t(`footer.patientJourney.${link.key}`)}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.15}>
          <h4 className="mb-6 text-micro uppercase tracking-widest text-white">{t("footer.newsletter.title")}</h4>
          <p className="mb-4 text-body text-on-surface-variant">{t("footer.newsletter.subtitle")}</p>
          <div className="relative">
            <input
              type="email"
              placeholder={t("footer.newsletter.placeholder")}
              className="w-full rounded-full border border-outline-variant/30 bg-surface-container px-6 py-4 text-white placeholder-on-surface-variant/40 outline-none transition-shadow focus:border-primary focus:shadow-glow"
            />
            <button
              aria-label={t("footer.newsletter.subscribeAria")}
              className="absolute right-1 top-1 flex h-12 w-12 items-center justify-center rounded-full btn-primary rtl:right-auto rtl:left-1"
            >
              <span className="material-symbols-outlined text-sm text-white rtl:-scale-x-100">send</span>
            </button>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 flex max-w-container-max flex-col items-center justify-between gap-6 border-t border-outline-variant/10 px-margin-mobile pt-8 md:flex-row md:px-margin-desktop">
        <p className="text-body text-on-surface-variant">{t("footer.copyright")}</p>
        <div className="flex gap-8">
          <Link href="#" className="text-small text-on-surface-variant hover:text-primary">
            {t("footer.privacyPolicy")}
          </Link>
          <Link href="#" className="text-small text-on-surface-variant hover:text-primary">
            {t("footer.termsOfService")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
