"use client";

import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from "react";
import { useState } from "react";

type Variant = "primary" | "ghost" | "outline" | "whatsapp";
type Size = "md" | "lg";

interface RippleButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  className?: string;
  as?: "button";
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  ghost: "btn-ghost",
  outline: "btn-outline",
  whatsapp: "btn-whatsapp",
};

const sizeClass: Record<Size, string> = {
  md: "px-7 py-3.5",
  lg: "px-9 py-4",
};

/**
 * The one button component used everywhere on the site — primary/ghost/
 * outline/whatsapp variants, consistent sizing + typography, and a real
 * pointer-triggered ripple (GPU-friendly: transform + opacity only).
 */
export function Button({
  variant = "primary",
  size = "lg",
  icon,
  iconPosition = "start",
  className,
  children,
  onClick,
  ...props
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
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
    onClick?.(event);
  }

  return (
    <button
      className={cn(variantClass[variant], sizeClass[size], className)}
      onClick={handleClick}
      {...props}
    >
      {icon && iconPosition === "start" && <span className="shrink-0">{icon}</span>}
      <span className="relative">{children}</span>
      {icon && iconPosition === "end" && <span className="shrink-0">{icon}</span>}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="pointer-events-none absolute rounded-full bg-white/35 animate-[ripple_0.65s_ease-out_forwards]"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
    </button>
  );
}
