"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { HTMLAttributes, ReactNode } from "react";

interface GlassCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  children: ReactNode;
  className?: string;
  /** Rounded corner scale — bigger cards read as more premium with a larger radius. */
  radius?: "xl" | "2xl" | "3xl";
  as?: "div" | "article" | "li";
  /** Set false for cards that shouldn't lift/glow on hover (e.g. inside an already-interactive parent). */
  interactive?: boolean;
}

const radiusClass: Record<NonNullable<GlassCardProps["radius"]>, string> = {
  xl: "rounded-2xl",
  "2xl": "rounded-[28px]",
  "3xl": "rounded-[32px]",
};

/**
 * The single glass-surface primitive used for every card/panel on the site.
 * Hover state (lift + glow border) is on by default and can be turned off.
 */
export function GlassCard({
  children,
  className,
  radius = "2xl",
  interactive = true,
  as = "div",
  ...props
}: GlassCardProps) {
  // All three tags (div/article/li) accept the same props we ever pass here
  // (className, children, standard handlers) — cast keeps the union of
  // per-element HTMLAttributes (e.g. li's onToggle) from fighting the
  // HTMLDivElement-typed props this component has always accepted.
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={cn("glass", radiusClass[radius], interactive && "glass-hover", className)}
      whileHover={interactive ? { y: -6 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
