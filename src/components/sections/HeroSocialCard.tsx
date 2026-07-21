"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { Phone } from "lucide-react";
import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";

const PHONE_NUMBER = "+20 100 000 0000";
const PHONE_HREF = "tel:+201000000000";
const WHATSAPP_HREF = "https://wa.me/201000000000";

/**
 * Lucide has no official WhatsApp brand glyph, so this mirrors the exact
 * path already used for the "Chat on WhatsApp" buttons elsewhere on the
 * site, keeping the mark visually consistent everywhere it appears.
 */
function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.79.47 3.47 1.29 4.94L2 22l5.29-1.39a9.87 9.87 0 004.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.02c-.24.68-1.4 1.3-1.93 1.38-.49.08-1.11.11-1.79-.11-.41-.13-.94-.3-1.62-.6-2.85-1.23-4.71-4.1-4.85-4.29-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09 1-2.37.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.58.81 2 .88 2.14.07.14.11.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.71 1.17 1.52 1.9 1.05.94 1.93 1.23 2.21 1.37.28.14.44.12.61-.07.16-.19.7-.81.89-1.09.19-.28.38-.23.63-.14.26.09 1.65.78 1.93.92.28.14.47.21.54.33.07.12.07.68-.17 1.36z" />
    </svg>
  );
}

/**
 * lucide-react no longer ships brand/logo glyphs (Facebook, Instagram), so
 * these mirror the exact marks previously used for the site's social links.
 */
function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <rect height={17} rx={5} width={17} x={3.5} y={3.5} />
      <circle cx={12} cy={12} r={4} />
      <circle cx={17.3} cy={6.7} fill="currentColor" r={1} stroke="none" />
    </svg>
  );
}

function FacebookGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.87.24-1.5 1.53-1.5H16.5V4.35C16.2 4.31 15.19 4.22 14 4.22c-2.47 0-4.16 1.51-4.16 4.28V10.5H7v3h2.84V21h3.66z" />
    </svg>
  );
}

const SOCIALS: { label: string; href: string; render: (className: string) => ReactNode }[] = [
  { label: "WhatsApp", href: WHATSAPP_HREF, render: (c) => <WhatsAppGlyph className={c} /> },
  { label: "Instagram", href: "#", render: (c) => <InstagramGlyph className={c} /> },
  { label: "Facebook", href: "#", render: (c) => <FacebookGlyph className={c} /> },
];

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 12, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

/** Bounded magnetic pull toward the cursor — spring-eased, resets on mouse leave. */
function MagneticIcon({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.4 });
  const isExternal = href.startsWith("http");

  function handleMouseMove(event: ReactMouseEvent<HTMLAnchorElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * 0.35);
    y.set((event.clientY - (rect.top + rect.height / 2)) * 0.35);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      href={href}
      aria-label={label}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className="icon-badge-neon flex h-12 w-12 items-center justify-center rounded-full"
    >
      {children}
    </motion.a>
  );
}

/** Premium glass "Connect With Us" card — social icons + phone, floated inside the Home hero. */
export function HeroSocialCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="glass relative w-full max-w-xs overflow-hidden rounded-[28px] border-primary/20 p-6 shadow-glow"
    >
      {/* Soft diagonal glass reflection */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.07] via-transparent to-transparent" />

      <p className="relative mb-5 text-micro font-semibold uppercase tracking-[0.2em] text-primary">
        Connect With Us
      </p>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        variants={staggerContainer}
        className="relative mb-5 flex items-center gap-4"
      >
        {SOCIALS.map((social) => (
          <motion.div key={social.label} variants={staggerItem}>
            <MagneticIcon href={social.href} label={social.label}>
              {social.render("icon-neon h-5 w-5")}
            </MagneticIcon>
          </motion.div>
        ))}
      </motion.div>

      <a
        href={PHONE_HREF}
        className="group relative flex items-center gap-3 rounded-2xl border border-primary/15 bg-primary/[0.06] px-4 py-3 backdrop-blur-md transition-all duration-300 ease-premium hover:border-primary/40 hover:bg-primary/10 hover:shadow-glow"
      >
        <span className="icon-badge-neon flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ease-premium group-hover:scale-110">
          <Phone className="icon-neon h-4 w-4" strokeWidth={2} />
        </span>
        <span className="text-body font-bold text-white">{PHONE_NUMBER}</span>
      </a>
    </motion.div>
  );
}
