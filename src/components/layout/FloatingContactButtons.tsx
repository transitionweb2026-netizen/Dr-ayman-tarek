"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { useState, type MouseEvent as ReactMouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const PHONE_HREF = "tel:+201000000000";
const WHATSAPP_HREF = "https://wa.me/201000000000";

/** Same brand glyph used for every other WhatsApp touchpoint on the site. */
function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.79.47 3.47 1.29 4.94L2 22l5.29-1.39a9.87 9.87 0 004.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.02c-.24.68-1.4 1.3-1.93 1.38-.49.08-1.11.11-1.79-.11-.41-.13-.94-.3-1.62-.6-2.85-1.23-4.71-4.1-4.85-4.29-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09 1-2.37.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.58.81 2 .88 2.14.07.14.11.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.71 1.17 1.52 1.9 1.05.94 1.93 1.23 2.21 1.37.28.14.44.12.61-.07.16-.19.7-.81.89-1.09.19-.28.38-.23.63-.14.26.09 1.65.78 1.93.92.28.14.47.21.54.33.07.12.07.68-.17 1.36z" />
    </svg>
  );
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

function FloatingButton({
  href,
  label,
  glowClassName,
  entranceDelay,
  children,
}: {
  href: string;
  label: string;
  glowClassName: string;
  entranceDelay: number;
  children: ReactNode;
}) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const isExternal = href.startsWith("http");

  function handleClick(event: ReactMouseEvent<HTMLAnchorElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.6;
    const ripple: Ripple = {
      id: Date.now(),
      x: event.clientX - rect.left - size / 2,
      y: event.clientY - rect.top - size / 2,
      size,
    };
    setRipples((prev) => [...prev, ripple]);
    window.setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
    }, 650);
  }

  return (
    <motion.a
      href={href}
      aria-label={label}
      onClick={handleClick}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
      transition={{
        opacity: { duration: 0.5, delay: entranceDelay, ease: [0.16, 1, 0.3, 1] },
        x: { duration: 0.5, delay: entranceDelay, ease: [0.16, 1, 0.3, 1] },
        y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: entranceDelay + 0.5 },
      }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.94 }}
      className={cn(
        "relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full text-white backdrop-blur-md transition-shadow duration-300 ease-premium",
        glowClassName,
      )}
    >
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="pointer-events-none absolute rounded-full bg-white/35 animate-[ripple_0.65s_ease-out_forwards]"
          style={{ left: ripple.x, top: ripple.y, width: ripple.size, height: ripple.size }}
        />
      ))}
    </motion.a>
  );
}

/**
 * Two small floating action buttons — WhatsApp + Phone. Always fully inside
 * the viewport; only the entrance animation briefly starts off-screen before
 * settling into its final, fixed position (never revisited on hover/idle).
 */
export function FloatingContactButtons() {
  return (
    <div className="fixed right-4 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-3 sm:right-6">
      <FloatingButton
        href={WHATSAPP_HREF}
        label="Chat on WhatsApp"
        glowClassName="bg-[linear-gradient(135deg,#25D366_0%,#128C7E_100%)] shadow-[0_0_18px_rgba(37,211,102,0.45)] hover:shadow-[0_0_30px_rgba(37,211,102,0.65)]"
        entranceDelay={0.4}
      >
        <WhatsAppGlyph className="h-5 w-5" />
      </FloatingButton>
      <FloatingButton
        href={PHONE_HREF}
        label="Call now"
        glowClassName="bg-gradient-brand shadow-glow hover:shadow-glow-lg"
        entranceDelay={0.55}
      >
        <Phone className="h-5 w-5" strokeWidth={2} />
      </FloatingButton>
    </div>
  );
}
