"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, SITE_BRAND } from "@/data/nav";
import { Button } from "@/components/ui/Button";

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
          <span className="material-symbols-outlined text-3xl text-primary drop-shadow-[0_0_10px_rgba(196,61,255,0.6)]">
            {SITE_BRAND.icon}
          </span>
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
          className="text-primary md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span className="material-symbols-outlined text-3xl">{mobileOpen ? "close" : "menu"}</span>
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-primary/10 bg-background/95 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-margin-mobile py-4">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-xl px-4 py-3 text-small transition-colors",
                      isActive ? "bg-primary/10 text-primary" : "text-on-surface-variant hover:bg-white/5",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Button size="md" className="mt-2 w-full">
                Book Appointment
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
