"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline" | "danger";
type Size = "sm" | "md";

interface AdminButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  loading?: boolean;
}

const variantClass: Record<Variant, string> = {
  primary: "bg-gradient-brand text-white shadow-glow hover:shadow-glow-lg",
  ghost: "glass text-on-surface hover:border-primary/40",
  outline: "border border-outline-variant/40 text-on-surface-variant hover:border-primary/50 hover:text-white",
  danger: "border border-error/30 bg-error/10 text-error hover:bg-error/20",
};

const sizeClass: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
};

/** Compact admin-dashboard button — the public site's <Button> is sized for hero CTAs, not toolbars. */
export const AdminButton = forwardRef<HTMLButtonElement, AdminButtonProps>(
  ({ variant = "primary", size = "md", icon, loading, disabled, className, children, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60",
        variantClass[variant],
        sizeClass[size],
        className,
      )}
      {...props}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon}
      {children}
    </button>
  ),
);
AdminButton.displayName = "AdminButton";
