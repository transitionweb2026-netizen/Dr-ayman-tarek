"use client";

import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { NeonIcon } from "@/components/ui/NeonIcon";
import { socialGlyphFor } from "@/components/ui/SocialGlyph";
import { useLanguage } from "@/i18n/LanguageProvider";
import { localizedHref } from "@/lib/localizedHref";
import { CLINIC_LOCATIONS, CLINIC_EMAIL } from "@/lib/clinicContactInfo";
import type { SiteSettingsData, NavLinkData } from "@/server/repositories/settings";

/** An admin can leave a nav link's href blank/"#" before its destination is
 * ready — render a disabled "coming soon" state instead of a link to
 * nowhere, same rule as everywhere else on the site. */
function FooterNavLink({ href, label, comingSoonLabel }: { href: string; label: string; comingSoonLabel: string }) {
  const hasRealDestination = href.trim() !== "" && href.trim() !== "#";
  if (!hasRealDestination) {
    return (
      <span aria-disabled="true" className="flex cursor-not-allowed items-center gap-2 text-body text-on-surface-variant/50">
        {label}
        <span className="rounded-full border border-outline-variant/30 px-2 py-0.5 text-[10px] uppercase tracking-wide">
          {comingSoonLabel}
        </span>
      </span>
    );
  }
  return (
    <Link
      href={href}
      className="block text-body text-on-surface-variant transition-transform hover:translate-x-1 hover:text-secondary rtl:hover:-translate-x-1"
    >
      {label}
    </Link>
  );
}

/** Shared footer, identical across every page. Brand, description,
 * copyright, and both link groups are CMS-managed (Site Settings). */
export function Footer({
  settings,
  navLinks,
}: {
  settings: SiteSettingsData;
  navLinks: NavLinkData[];
}) {
  const { t, language } = useLanguage();
  const brandName = language === "ar" ? settings.doctorNameAr : settings.doctorNameEn;
  const description = language === "ar" ? settings.footerDescriptionAr : settings.footerDescriptionEn;
  const copyright = language === "ar" ? settings.footerCopyrightAr : settings.footerCopyrightEn;

  return (
    <footer className="w-full border-t border-outline-variant/30 bg-surface-container-lowest pb-10 pt-section-gap">
      {/* Premium branding row — separate from the brand column below (own
          logo slot, settings.footerBadgeUrl, distinct from settings.logoUrl).
          Hidden entirely until that image is uploaded, so nothing changes
          here until then. */}
      {settings.footerBadgeUrl && (
        <div className="mx-auto mb-10 max-w-container-max px-margin-mobile md:px-margin-desktop">
          <Reveal className="flex items-center gap-4 pb-6">
            <div className="relative h-14 w-14 shrink-0 sm:h-16 sm:w-16">
              <Image src={settings.footerBadgeUrl} alt={brandName} fill className="object-contain" />
            </div>
            <span className="text-card-title font-bold text-gradient-brand">{brandName}</span>
          </Reveal>
          <div className="h-px w-full bg-gradient-to-r from-primary/50 via-primary/15 to-transparent rtl:bg-gradient-to-l" />
        </div>
      )}

      <div className="mx-auto grid max-w-container-max grid-cols-1 gap-gutter px-margin-mobile md:grid-cols-3 md:px-margin-desktop">
        <Reveal className="space-y-6">
          <Link href={localizedHref("/", language)} className="flex w-fit items-center gap-3">
            {settings.logoUrl ? (
              <Image src={settings.logoUrl} alt={brandName} width={30} height={30} className="h-[30px] w-[30px] rounded-lg object-contain" />
            ) : (
              <NeonIcon name="neurology" className="text-2xl" />
            )}
            <span className="text-card-title font-bold text-primary">{brandName}</span>
          </Link>
          <p className="text-body text-on-surface-variant">{description}</p>
          <div className="flex gap-4">
            {settings.socialLinks.map((link) => {
              const Glyph = socialGlyphFor(link.platform);
              return (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}
                  className="icon-badge-neon flex h-12 w-12 items-center justify-center rounded-full"
                >
                  <Glyph className="icon-neon h-5 w-5" />
                </a>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mb-6 text-micro uppercase tracking-widest text-white">{t("footer.quickLinks.title")}</h2>
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.href + link.labelEn}>
                <FooterNavLink
                  href={localizedHref(link.href, language)}
                  label={language === "ar" ? link.labelAr : link.labelEn}
                  comingSoonLabel={t("common.comingSoon")}
                />
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mb-6 text-micro uppercase tracking-widest text-white">{t("footer.contact.title")}</h2>
          <div className="space-y-3 text-body text-on-surface-variant">
            <p className="font-bold text-white">{brandName}</p>
            {CLINIC_LOCATIONS.map((location) => (
              <p key={location.en}>{language === "ar" ? location.ar : location.en}</p>
            ))}
            <p>
              <span className="text-white">{t("footer.contact.emailLabel")} </span>
              <a href={`mailto:${CLINIC_EMAIL}`} dir="ltr" className="inline-block hover:text-primary">
                {CLINIC_EMAIL}
              </a>
            </p>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 flex max-w-container-max flex-col items-center justify-between gap-6 border-t border-outline-variant/10 px-margin-mobile pt-8 md:flex-row md:px-margin-desktop">
        <p className="text-body text-on-surface-variant">{copyright}</p>
        <div className="flex gap-8">
          <Link href={localizedHref("/privacy-policy", language)} className="text-small text-on-surface-variant hover:text-primary">
            {t("footer.privacyPolicy")}
          </Link>
          <Link href={localizedHref("/terms-of-service", language)} className="text-small text-on-surface-variant hover:text-primary">
            {t("footer.termsOfService")}
          </Link>
        </div>
      </div>

      {/* "Built by" agency credit — fixed, not CMS content, not the client's
          own branding (that's the badge above and the brand column). Layout
          stays LTR always: it's Transition's own fixed lockup, so it doesn't
          mirror with the site's language like the rest of the footer does. */}
      <div className="mx-auto mt-10 flex max-w-container-max justify-center px-margin-mobile md:px-margin-desktop">
        <div dir="ltr" className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-3 rounded-full bg-gradient-brand px-5 py-2.5 shadow-glow">
            <a
              href="https://transitioneg.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-small font-bold text-white transition-opacity hover:opacity-80"
            >
              Transition
            </a>
            <div className="relative h-9 w-9 shrink-0">
              <Image src="/brand/transition-logo.png" alt="" fill className="object-contain" />
            </div>
            <span className="text-small text-white/80">{t("footer.agencyCredit")}</span>
          </div>
          <div className="h-px w-48 bg-gradient-to-r from-primary/50 via-primary/15 to-transparent" />
        </div>
      </div>
    </footer>
  );
}
