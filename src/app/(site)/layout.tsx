import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContactButtons } from "@/components/layout/FloatingContactButtons";
import { AnalyticsScripts } from "@/components/layout/AnalyticsScripts";
import { PageTransition } from "@/components/motion/PageTransition";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { getSiteSettings, getNavLinks } from "@/server/repositories/settings";

/**
 * Public marketing site shell — fetches the CMS-managed brand/contact/nav
 * data once per request and hands it down to the chrome components as
 * props, so Header/Footer/FloatingContactButtons never fetch on their own.
 */
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, navLinks] = await Promise.all([getSiteSettings(), getNavLinks()]);

  return (
    <LanguageProvider>
      <AnalyticsScripts
        gaMeasurementId={settings.gaMeasurementId}
        googleAdsId={settings.googleAdsId}
        gtmContainerId={settings.gtmContainerId}
        metaPixelId={settings.metaPixelId}
      />
      <div className="app-mesh-bg bg-noise" aria-hidden />
      <FloatingContactButtons phone={settings.phone} whatsapp={settings.whatsapp} />
      <Header settings={settings} navLinks={navLinks.header} />
      <PageTransition>
        <main>{children}</main>
      </PageTransition>
      <Footer settings={settings} expertiseLinks={navLinks.footerExpertise} journeyLinks={navLinks.footerJourney} />
    </LanguageProvider>
  );
}
