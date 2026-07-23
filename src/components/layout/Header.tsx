"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { NeonIcon } from "@/components/ui/NeonIcon";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { SiteSettingsData, NavLinkData } from "@/server/repositories/settings";

/**
 * Shared header/nav, rendered once from the (site) route group layout.
 * Brand name and nav items are CMS-managed (Site Settings + Navigation) —
 * passed down as props from that Server Component parent rather than
 * fetched here, since Header itself must stay a Client Component (motion,
 * scroll listeners, mobile drawer state).
 */
export function Header({ settings, navLinks }: { settings: SiteSettingsData; navLinks: NavLinkData[] }) {
  const pathname = usePathname();
  const { t, dir, language } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);

  const brandName = language === "ar" ? settings.doctorNameAr : settings.doctorNameEn;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Scroll-lock + Escape-to-close (same pattern as the shared Modal
  // component) plus a keyboard focus trap: Tab/Shift+Tab cycle within the
  // drawer instead of escaping into the page underneath, focus moves into
  // the drawer on open, and returns to the hamburger trigger on close.
  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    const trigger = menuTriggerRef.current;

    const focusableSelector = 'a[href], button:not([disabled])';
    const focusable = drawerRef.current?.querySelectorAll<HTMLElement>(focusableSelector);
    const first = focusable?.[0];
    const last = focusable?.[focusable.length - 1];
    first?.focus();

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        return;
      }
      if (event.key !== "Tab" || !first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
      trigger?.focus();
    };
  }, [mobileOpen]);

  return (
    <>
    <header
      className={cn(
        "fixed top-0 z-50 w-full border-b backdrop-blur-2xl transition-colors duration-500",
        scrolled
          ? "border-primary/15 bg-background/80 shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
          : "border-transparent bg-background/40",
      )}
    >
      <nav className="mx-auto flex h-20 w-full max-w-container-max items-center justify-between px-margin-mobile md:px-margin-desktop">
        <Link href="/" className="flex items-center gap-3" aria-label={t("nav.backToHomepage")}>
          {settings.logoUrl ? (
            <Image src={settings.logoUrl} alt={brandName} width={36} height={36} className="h-9 w-9 rounded-lg object-contain" />
          ) : (
            <NeonIcon name="neurology" className="text-3xl" />
          )}
          <span className="text-card-title font-bold text-primary">{brandName}</span>
        </Link>

        <div className="hidden items-center gap-8 xl:flex">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative text-small transition-colors duration-200",
                  isActive ? "text-primary" : "text-on-surface-variant hover:text-primary",
                )}
              >
                {language === "ar" ? item.labelAr : item.labelEn}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
          <LanguageSwitch className="ml-2" />
          <Button size="md" className="ml-2">
            {t("nav.bookAppointment")}
          </Button>
        </div>

        <div className="flex items-center gap-3 xl:hidden">
          <LanguageSwitch />
          <button
            ref={menuTriggerRef}
            className="icon-neon-trigger flex h-12 w-12 items-center justify-center"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={t("nav.toggleMenu")}
            aria-expanded={mobileOpen}
          >
            <NeonIcon name={mobileOpen ? "close" : "menu"} className="text-3xl" />
          </button>
        </div>
      </nav>
    </header>

    {/* Portalled to document.body: <header> has backdrop-blur (a CSS
        `filter`), which per spec makes it the containing block for any
        position:fixed descendant — so inset-0 would resolve against
        header's own ~80px auto-height box instead of the viewport,
        collapsing the drawer to a sliver instead of a fullscreen overlay.
        Same fix Modal.tsx already uses for this exact class of bug. */}
    {typeof document !== "undefined" && createPortal(
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={drawerRef}
            initial={{ x: dir === "rtl" ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: dir === "rtl" ? "-100%" : "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="fixed inset-0 z-40 flex flex-col bg-background/98 backdrop-blur-2xl xl:hidden"
            style={{
              paddingTop: "max(1.5rem, env(safe-area-inset-top))",
              paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))",
              paddingLeft: "max(1.25rem, env(safe-area-inset-left))",
              paddingRight: "max(1.25rem, env(safe-area-inset-right))",
            }}
            role="dialog"
            aria-modal="true"
            aria-label={t("nav.toggleMenu")}
          >
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-3"
                onClick={() => setMobileOpen(false)}
                aria-label={t("nav.backToHomepage")}
              >
                {settings.logoUrl ? (
                  <Image src={settings.logoUrl} alt={brandName} width={36} height={36} className="h-9 w-9 rounded-lg object-contain" />
                ) : (
                  <NeonIcon name="neurology" className="text-3xl" />
                )}
                <span className="text-card-title font-bold text-primary">{brandName}</span>
              </Link>
              <div className="flex items-center gap-3">
                <LanguageSwitch />
                <button
                  className="icon-badge-neon flex h-12 w-12 items-center justify-center rounded-full"
                  onClick={() => setMobileOpen(false)}
                  aria-label={t("nav.closeMenu")}
                >
                  <NeonIcon name="close" className="text-2xl" />
                </button>
              </div>
            </div>

            <nav className="mt-10 flex flex-1 flex-col justify-center gap-2 overflow-y-auto">
              {navLinks.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + index * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex min-h-[56px] items-center rounded-2xl px-5 text-card-title transition-colors",
                        isActive ? "bg-primary/10 text-primary" : "text-white hover:bg-white/5",
                      )}
                    >
                      {language === "ar" ? item.labelAr : item.labelEn}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <Button size="lg" className="w-full" onClick={() => setMobileOpen(false)}>
              {t("nav.bookAppointment")}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body,
    )}
    </>
  );
}
