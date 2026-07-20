"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const OFFSET = 28;

function offsetFor(direction: Direction) {
  switch (direction) {
    case "up":
      return { y: OFFSET };
    case "down":
      return { y: -OFFSET };
    case "left":
      return { x: OFFSET };
    case "right":
      return { x: -OFFSET };
    default:
      return {};
  }
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
  /** Also apply a subtle scale-in for extra emphasis (hero elements, feature art). */
  scale?: boolean;
  as?: "div" | "li" | "span";
  once?: boolean;
}

/**
 * Scroll-triggered fade + slide (+ optional scale) reveal.
 * The single building block behind every entrance animation on the site.
 */
export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.7,
  scale = false,
  as = "div",
  once = true,
}: RevealProps) {
  const MotionTag = motion[as];
  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...offsetFor(direction),
      ...(scale ? { scale: 0.94 } : {}),
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.2, margin: "-40px" }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}
