"use client";

import { motion } from "framer-motion";
import { NeonIcon } from "@/components/ui/NeonIcon";

const ICON_CLASS = "icon-badge-neon flex h-11 w-11 items-center justify-center rounded-full";
// These are inline brand-mark SVGs, not Material Symbols, so they get the
// same glow treatment as .icon-neon applied directly (color + drop-shadow
// bloom both work identically on an <svg fill="currentColor">).
const SVG_GLOW_CLASS = "icon-neon h-5 w-5";

/** Floating vertical social widget, identical across every page. */
export function SocialRail() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
    >
      <a aria-label="Facebook" className={ICON_CLASS} href="#">
        <svg className={SVG_GLOW_CLASS} fill="currentColor" viewBox="0 0 24 24">
          <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.87.24-1.5 1.53-1.5H16.5V4.35C16.2 4.31 15.19 4.22 14 4.22c-2.47 0-4.16 1.51-4.16 4.28V10.5H7v3h2.84V21h3.66z" />
        </svg>
      </a>
      <a aria-label="Instagram" className={ICON_CLASS} href="#">
        <svg className={SVG_GLOW_CLASS} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <rect height={17} rx={5} width={17} x={3.5} y={3.5} />
          <circle cx={12} cy={12} r={4} />
          <circle cx={17.3} cy={6.7} fill="currentColor" r={1} stroke="none" />
        </svg>
      </a>
      <a aria-label="TikTok" className={ICON_CLASS} href="#">
        <svg className={SVG_GLOW_CLASS} fill="currentColor" viewBox="0 0 24 24">
          <path d="M16.5 3c.4 2.2 1.9 3.7 4.1 3.9v2.9c-1.5 0-2.9-.5-4.1-1.3v6.6c0 3.3-2.6 5.9-5.9 5.9S4.7 18.4 4.7 15.1c0-3.2 2.5-5.8 5.7-5.9v3c-1.5.1-2.7 1.3-2.7 2.9 0 1.6 1.3 2.9 2.9 2.9s2.9-1.3 2.9-2.9V3h3z" />
        </svg>
      </a>
      <a aria-label="LinkedIn" className={ICON_CLASS} href="#">
        <svg className={SVG_GLOW_CLASS} fill="currentColor" viewBox="0 0 24 24">
          <path d="M6.94 8.5H3.56V20h3.38V8.5zM5.25 3.5a1.96 1.96 0 100 3.92 1.96 1.96 0 000-3.92zM20.44 20h-3.37v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V20H9.68V8.5h3.24v1.57h.05c.45-.85 1.56-1.75 3.21-1.75 3.43 0 4.26 2.26 4.26 5.2V20z" />
        </svg>
      </a>
      <span className="h-px w-8 bg-primary/20" />
      <a
        aria-label="Call now"
        className="flex h-11 w-11 items-center justify-center rounded-full btn-primary text-white"
        href="tel:+201000000000"
      >
        {/* On the solid gradient CTA circle, the icon stays white to match the
            button's text color — forcing neon purple here would clash with
            the already-purple gradient background instead of reading as glow. */}
        <NeonIcon name="call" filled neon={false} className="text-xl text-white" />
      </a>
    </motion.div>
  );
}
