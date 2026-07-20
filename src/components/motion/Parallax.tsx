"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { type ReactNode, useRef } from "react";

interface MouseParallaxProps {
  children: ReactNode;
  className?: string;
  /** How far the layer travels in px at the edge of the container. Keep small — this should read as alive, not gimmicky. */
  strength?: number;
}

/**
 * Wrap a hero decoration in this to make it drift gently toward the cursor.
 * Pointer tracking only — no scroll listeners, so it stays cheap.
 */
export function MouseParallax({ children, className, strength = 18 }: MouseParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const x = useSpring(mvX, { stiffness: 60, damping: 15, mass: 0.6 });
  const y = useSpring(mvY, { stiffness: 60, damping: 15, mass: 0.6 });
  const rotate = useTransform(x, [-strength, strength], [-1.5, 1.5]);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current?.parentElement;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    mvX.set(px * strength * 2);
    mvY.set(py * strength * 2);
  }

  function handlePointerLeave() {
    mvX.set(0);
    mvY.set(0);
  }

  return (
    <div
      className="absolute inset-0"
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
    >
      <motion.div ref={ref} className={className} style={{ x, y, rotate }}>
        {children}
      </motion.div>
    </div>
  );
}

/** Slow scroll-linked drift for large ambient background shapes. */
export function ScrollDrift({
  children,
  className,
  speed = 40,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ y: 0 }}
      whileInView={{ y: -speed }}
      viewport={{ once: false, amount: "all" }}
      transition={{ duration: 1.2, ease: "linear" }}
    >
      {children}
    </motion.div>
  );
}
