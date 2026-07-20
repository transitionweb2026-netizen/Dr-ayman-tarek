"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface ParticleFieldProps {
  count?: number;
  className?: string;
}

/** Deterministic-seeded ambient dust particles that float gently. Client-only for the float animation. */
export function ParticleField({ count = 8, className }: ParticleFieldProps) {
  const particles = useMemo(() => {
    // Deterministic pseudo-random so server/client markup matches (avoids hydration mismatch).
    let seed = 42;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: `${Math.round(rand() * 90) + 4}%`,
      left: `${Math.round(rand() * 90) + 4}%`,
      size: Math.round(rand() * 3) + 3,
      delay: Math.round(rand() * 20) / 10,
      duration: 5 + Math.round(rand() * 30) / 10,
    }));
  }, [count]);

  return (
    <div className={className}>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.95),rgba(196,61,255,0.7)_45%,transparent_75%)]"
          style={{ top: p.top, left: p.left, width: p.size, height: p.size }}
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
