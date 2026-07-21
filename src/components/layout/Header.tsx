"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);

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
          ref={menuTriggerRef}
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
          <motion.div
            ref={drawerRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="fixed inset-0 z-40 flex flex-col bg-background/98 backdrop-blur-2xl md:hidden"
            style={{
              paddingTop: "max(1.5rem, env(safe-area-inset-top))",
              paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))",
              paddingLeft: "max(1.25rem, env(safe-area-inset-left))",
              paddingRight: "max(1.25rem, env(safe-area-inset-right))",
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-3"
                onClick={() => setMobileOpen(false)}
                aria-label="Back to homepage"
              >
                <NeonIcon name={SITE_BRAND.icon} className="text-3xl" />
                <span className="text-card-title font-bold text-primary">{SITE_BRAND.name}</span>
              </Link>
              <button
                className="icon-badge-neon flex h-12 w-12 items-center justify-center rounded-full"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <NeonIcon name="close" className="text-2xl" />
              </button>
            </div>

            <nav className="mt-10 flex flex-1 flex-col justify-center gap-2 overflow-y-auto">
              {NAV_ITEMS.map((item, index) => {
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
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <Button size="lg" className="w-full" onClick={() => setMobileOpen(false)}>
              Book Appointment
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
