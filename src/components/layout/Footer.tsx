"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { Reveal } from "@/components/motion/Reveal";
import { NeonIcon } from "@/components/ui/NeonIcon";
import { socialGlyphFor } from "@/components/ui/SocialGlyph";
import { useLanguage } from "@/i18n/LanguageProvider";
import { localizedHref } from "@/lib/localizedHref";
import { subscribeToNewsletter } from "@/server/actions/newsletter";
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
  const [subscribing, setSubscribing] = useState(false);

  async function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") || "");
    setSubscribing(true);
    const result = await subscribeToNewsletter({ email, language });
    setSubscribing(false);
    if (result.ok) {
      toast.success(t("footer.newsletter.success"));
      form.reset();
    } else {
      const key = result.error === "invalidEmail" ? "invalidEmail" : result.error === "alreadySubscribed" ? "alreadySubscribed" : "error";
      toast.error(t(`footer.newsletter.${key}`));
    }
  }

  return (
    <footer className="w-full border-t border-outline-variant/30 bg-surface-container-lowest pb-10 pt-section-gap">
      <div className="mx-auto grid max-w-container-max grid-cols-1 gap-gutter px-margin-mobile md:grid-cols-4 md:px-margin-desktop">
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
          <h2 className="mb-6 text-micro uppercase tracking-widest text-white">{t("footer.expertise.title")}</h2>
          <ul className="space-y-3">
            {expertiseLinks.map((link) => (
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
          <h2 className="mb-6 text-micro uppercase tracking-widest text-white">{t("footer.patientJourney.title")}</h2>
          <ul className="space-y-3">
            {journeyLinks.map((link) => (
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

        <Reveal delay={0.15}>
          <h2 className="mb-6 text-micro uppercase tracking-widest text-white">{t("footer.newsletter.title")}</h2>
          <p className="mb-4 text-body text-on-surface-variant">{t("footer.newsletter.subtitle")}</p>
          <form onSubmit={handleSubscribe} className="relative">
            <input
              type="email"
              name="email"
              required
              disabled={subscribing}
              placeholder={t("footer.newsletter.placeholder")}
              className="w-full rounded-full border border-outline-variant/30 bg-surface-container px-6 py-4 text-white placeholder-on-surface-variant/40 outline-none transition-shadow focus:border-primary focus:shadow-glow disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={subscribing}
              aria-label={t("footer.newsletter.subscribeAria")}
              className="absolute right-1 top-1 flex h-12 w-12 items-center justify-center rounded-full btn-primary disabled:opacity-60 rtl:right-auto rtl:left-1"
            >
              <span className="material-symbols-outlined text-sm text-white rtl:-scale-x-100">send</span>
            </button>
          </form>
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
    </footer>
  );
}
