import { headers } from "next/headers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContactButtons } from "@/components/layout/FloatingContactButtons";
import { AnalyticsScripts } from "@/components/layout/AnalyticsScripts";
import { PageTransition } from "@/components/motion/PageTransition";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { RememberedLanguageRedirect } from "@/i18n/RememberedLanguageRedirect";
import { languageFromPathname } from "@/lib/localizedHref";
import { en } from "@/i18n/dictionaries/en";
import { ar } from "@/i18n/dictionaries/ar";
import { getSiteSettings, getNavLinks } from "@/server/repositories/settings";

/**
 * Public marketing site shell — fetches the CMS-managed brand/contact/nav
 * data once per request and hands it down to the chrome components as
 * props, so Header/Footer/FloatingContactButtons never fetch on their own.
 */
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, navLinks, requestHeaders] = await Promise.all([getSiteSettings(), getNavLinks(), headers()]);
  const nonce = requestHeaders.get("x-nonce") ?? undefined;
  const lang = languageFromPathname(requestHeaders.get("x-pathname") || "/");
  const skipLabel = lang === "ar" ? ar.common.skipToContent : en.common.skipToContent;

  return (
    <LanguageProvider
      contact={{
        phone: settings.phone,
        whatsapp: settings.whatsapp,
        email: settings.email,
        socialLinks: settings.socialLinks,
        appointmentBookingUrl: settings.appointmentBookingUrl,
      }}
    >
      {/* Invisible until focused — first Tab stop on every page lets
          keyboard/screen-reader users jump past the header nav straight to
          the page content instead of tabbing through it every time. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-6 focus:py-3 focus:text-white focus:shadow-glow rtl:focus:left-auto rtl:focus:right-4"
      >
        {skipLabel}
      </a>
      <RememberedLanguageRedirect />
      <AnalyticsScripts
        gaMeasurementId={settings.gaMeasurementId}
        googleAdsId={settings.googleAdsId}
        gtmContainerId={settings.gtmContainerId}
        metaPixelId={settings.metaPixelId}
        nonce={nonce}
      />
      <div className="app-mesh-bg bg-noise" aria-hidden />
      <FloatingContactButtons phone={settings.phone} whatsapp={settings.whatsapp} />
      <Header settings={settings} navLinks={navLinks.header} />
      <PageTransition>
        <main id="main-content">{children}</main>
      </PageTransition>
      <Footer settings={settings} expertiseLinks={navLinks.footerExpertise} journeyLinks={navLinks.footerJourney} />
    </LanguageProvider>
  );
}
