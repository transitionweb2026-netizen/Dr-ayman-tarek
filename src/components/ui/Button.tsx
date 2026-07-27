"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, MouseEvent, ReactNode } from "react";
import { useState } from "react";

type Variant = "primary" | "ghost" | "outline" | "whatsapp";
type Size = "md" | "lg";

interface RippleVisualProps {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  className?: string;
}

interface RippleButtonProps extends RippleVisualProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  href?: undefined;
}

interface RippleLinkProps extends RippleVisualProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className"> {
  /** Turns the button into a link — internal paths render via next/link
   * (client-side nav); anything else (http(s), mailto:, tel:) renders as a
   * plain external anchor with target/rel defaulted for a new tab, so a
   * navigational CTA never silently does nothing. */
  href: string;
}

type ButtonProps = RippleButtonProps | RippleLinkProps;

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

function isInternalPath(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}

/** A bare "#section-id" — scrolls within the current page (globals.css sets
 * html { scroll-behavior: smooth }), so it must never get next/link's
 * client-side route handling or an external target="_blank". */
function isSamePageAnchor(href: string): boolean {
  return href.startsWith("#");
}

/**
 * The one button component used everywhere on the site — primary/ghost/
 * outline/whatsapp variants, consistent sizing + typography, and a real
 * pointer-triggered ripple (GPU-friendly: transform + opacity only). Pass
 * `href` to render as a real navigational link with the exact same look —
 * every CTA on the site should end up doing *something*, and a `<button>`
 * with no `onClick` and no `href` is a dead click by construction.
 */
export function Button({ variant = "primary", size = "lg", icon, iconPosition = "start", className, children, ...props }: ButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  function spawnRipple(event: MouseEvent<HTMLElement>) {
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
  }

  const content = (
    <>
      {icon && iconPosition === "start" && <span className="shrink-0">{icon}</span>}
      <span className="relative">{children}</span>
      {icon && iconPosition === "end" && <span className="shrink-0">{icon}</span>}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="pointer-events-none absolute rounded-full bg-white/35 animate-[ripple_0.65s_ease-out_forwards]"
          style={{ left: ripple.x, top: ripple.y, width: ripple.size, height: ripple.size }}
        />
      ))}
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const { href, onClick, target, rel, ...anchorProps } = props;
    function handleClick(event: MouseEvent<HTMLAnchorElement>) {
      spawnRipple(event);
      onClick?.(event);
    }
    if (isInternalPath(href)) {
      return (
        <Link href={href} className={cn(variantClass[variant], sizeClass[size], className)} onClick={handleClick} {...anchorProps}>
          {content}
        </Link>
      );
    }
    if (isSamePageAnchor(href)) {
      return (
        <a href={href} className={cn(variantClass[variant], sizeClass[size], className)} onClick={handleClick} {...anchorProps}>
          {content}
        </a>
      );
    }
    return (
      <a
        href={href}
        target={target ?? "_blank"}
        rel={rel ?? "noopener noreferrer"}
        className={cn(variantClass[variant], sizeClass[size], className)}
        onClick={handleClick}
        {...anchorProps}
      >
        {content}
      </a>
    );
  }

  const { onClick, ...buttonProps } = props as RippleButtonProps;
  function handleButtonClick(event: MouseEvent<HTMLButtonElement>) {
    spawnRipple(event);
    onClick?.(event);
  }

  return (
    <button className={cn(variantClass[variant], sizeClass[size], className)} onClick={handleButtonClick} {...buttonProps}>
      {content}
    </button>
  );
}
