"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, SITE_BRAND } from "@/data/nav";
import { Button } from "@/components/ui/Button";
import { NeonIcon } from "@/components/ui/NeonIcon";

/**
 * Shared header/nav, rendered once from the root layout.
 * Active-link detection uses the real Next.js pathname instead of the old
 * nav.js's window.location.pathname string match.
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Same scroll-lock + Escape-to-close pattern as the shared Modal component.
  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full border-b backdrop-blur-2xl transition-colors duration-500",
        scrolled
          ? "border-primary/15 bg-background/80 shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
          : "border-transparent bg-background/40",
      )}
    >
      <nav className="mx-auto flex h-20 w-full max-w-container-max items-center justify-between px-margin-mobile md:px-margin-desktop">
        <Link href="/" className="flex items-center gap-3" aria-label="Back to homepage">
          <NeonIcon name={SITE_BRAND.icon} className="text-3xl" />
          <span className="text-card-title font-bold text-primary">{SITE_BRAND.name}</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => {
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
                {item.label}
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
          <Button size="md" className="ml-2">
            Book Appointment
          </Button>
        </div>

        <button
          className="icon-neon-trigger flex h-12 w-12 items-center justify-center md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <NeonIcon name={mobileOpen ? "close" : "menu"} className="text-3xl" />
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              className="fixed inset-y-0 right-0 z-50 flex w-[min(85vw,360px)] flex-col border-l border-primary/15 bg-background/95 pt-24 backdrop-blur-2xl md:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-margin-mobile pb-8">
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "flex min-h-[48px] items-center rounded-xl px-4 text-body-lg transition-colors",
                        isActive ? "bg-primary/10 text-primary" : "text-on-surface-variant hover:bg-white/5",
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <Button size="md" className="mt-4 w-full">
                  Book Appointment
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
