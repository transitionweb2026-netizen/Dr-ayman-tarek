"use client";

import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { NeonIcon } from "@/components/ui/NeonIcon";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { SiteSettingsData, NavLinkData } from "@/server/repositories/settings";

const SOCIAL_ICONS: Record<string, string> = {
  facebook: "face_nod",
  instagram: "camera",
  whatsapp: "group",
};

/** Shared footer, identical across every page. Brand, description,
 * copyright, and both link groups are CMS-managed (Site Settings). */
export function Footer({
  settings,
  expertiseLinks,
  journeyLinks,
}: {
  settings: SiteSettingsData;
  expertiseLinks: NavLinkData[];
  journeyLinks: NavLinkData[];
}) {
  const { t, language } = useLanguage();
  const brandName = language === "ar" ? settings.doctorNameAr : settings.doctorNameEn;
  const description = language === "ar" ? settings.footerDescriptionAr : settings.footerDescriptionEn;
  const copyright = language === "ar" ? settings.footerCopyrightAr : settings.footerCopyrightEn;

  return (
    <footer className="w-full border-t border-outline-variant/30 bg-surface-container-lowest pb-10 pt-section-gap">
      <div className="mx-auto grid max-w-container-max grid-cols-1 gap-gutter px-margin-mobile md:grid-cols-4 md:px-margin-desktop">
        <Reveal className="space-y-6">
          <div className="flex items-center gap-3">
            {settings.logoUrl ? (
              <Image src={settings.logoUrl} alt={brandName} width={30} height={30} className="h-[30px] w-[30px] rounded-lg object-contain" />
            ) : (
              <NeonIcon name="neurology" className="text-2xl" />
            )}
            <span className="text-card-title font-bold text-primary">{brandName}</span>
          </div>
          <p className="text-body text-on-surface-variant">{description}</p>
          <div className="flex gap-4">
            {settings.socialLinks.map((link) => (
              <a key={link.platform} href={link.url} className="icon-badge-neon flex h-12 w-12 items-center justify-center rounded-full">
                <NeonIcon name={SOCIAL_ICONS[link.platform] || "public"} className="text-xl" />
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h4 className="mb-6 text-micro uppercase tracking-widest text-white">{t("footer.expertise.title")}</h4>
          <ul className="space-y-3">
            {expertiseLinks.map((link) => (
              <li key={link.href + link.labelEn}>
                <a
                  href={link.href}
                  className="block text-body text-on-surface-variant transition-transform hover:translate-x-1 hover:text-secondary rtl:hover:-translate-x-1"
                >
                  {language === "ar" ? link.labelAr : link.labelEn}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <h4 className="mb-6 text-micro uppercase tracking-widest text-white">{t("footer.patientJourney.title")}</h4>
          <ul className="space-y-3">
            {journeyLinks.map((link) => (
              <li key={link.href + link.labelEn}>
                <a
                  href={link.href}
                  className="block text-body text-on-surface-variant transition-transform hover:translate-x-1 hover:text-secondary rtl:hover:-translate-x-1"
                >
                  {language === "ar" ? link.labelAr : link.labelEn}
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
        <p className="text-body text-on-surface-variant">{copyright}</p>
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
