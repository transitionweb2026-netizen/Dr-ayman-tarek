"use client";

import { motion } from "framer-motion";
import { GlowOrb } from "@/components/decor/GlowOrb";
import { Button } from "@/components/ui/Button";
import { NeonIcon } from "@/components/ui/NeonIcon";
import { HeroSocialCard } from "@/components/sections/HeroSocialCard";
import { HeroBackgroundImage } from "@/components/sections/HeroBackgroundImage";
import type { ReactNode } from "react";
import type { HeroImageConfig } from "@/server/repositories/content";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  images: HeroImageConfig;
  /** Escape hatch, rarely needed: pass null for the abstract gradient
   * background instead of a photo, or a string to pin one fixed image at
   * every breakpoint. Omit (the norm) to use the CMS-configured `images`. */
  image?: string | null;
  ctaLabel?: string;
  ctaIcon?: string;
  align?: "left" | "center";
  height?: "sm" | "md";
  children?: ReactNode;
}

/** Shared secondary-page hero used by Services, Dr. Ayman Tarek, Videos,
 * Blog, and Contact — same visual system as HomeHero (full-bleed CMS photo,
 * gradient, glow/dot-grid decorations), scaled down for a shorter, more
 * text-forward hero. */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  images,
  image,
  ctaLabel,
  ctaIcon = "calendar_month",
  align = "left",
  height = "md",
  children,
}: PageHeroProps) {
  const isCenter = align === "center";
  const showAbstractOnly = image === null;
  const effectiveImages: HeroImageConfig | null = showAbstractOnly
    ? null
    : typeof image === "string"
      ? { ...images, desktopImageUrl: image, tabletImageUrl: image, mobileImageUrl: image }
      : images;

  return (
    <section
      className={`relative flex flex-col overflow-hidden pt-20 pb-10 ${
        height === "sm" ? "min-h-[45vh] lg:min-h-[380px]" : "min-h-[55vh] lg:min-h-[460px]"
      } items-center justify-center`}
    >
      {effectiveImages ? (
        <div className="absolute inset-0 z-0">
          <HeroBackgroundImage images={effectiveImages}>
            <div className="absolute inset-0 bg-background/65" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/60" />
          </HeroBackgroundImage>
        </div>
      ) : (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-surface-container-lowest via-background to-[#150a24]" />
      )}

      {images.showDecorations && (
        <>
          <GlowOrb className="z-[1] -left-40 -top-32 h-[480px] w-[480px]" />
          <GlowOrb className="z-[1] -right-24 bottom-0 h-[400px] w-[400px]" color="tertiary" />
          <div className="dot-grid pointer-events-none absolute inset-0 z-[1] opacity-[0.05]" />
        </>
      )}

      <div
        className={`relative z-10 mx-auto w-full max-w-container-max px-margin-mobile md:px-8 lg:px-12 ${
          isCenter ? "text-center" : ""
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={isCenter ? "mx-auto max-w-xl" : "max-w-xl"}
        >
          <span className="eyebrow mb-6 shadow-glow">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary shadow-[0_0_10px_rgba(196,61,255,0.8)]" />
            {eyebrow}
          </span>
          <h1 className="mb-4 text-hero text-white">{title}</h1>
          <p className={`mb-8 text-body-lg text-on-surface-variant ${isCenter ? "mx-auto max-w-xl" : "max-w-xl"}`}>
            {subtitle}
          </p>
          {ctaLabel && (
            <Button className="w-full sm:w-auto" icon={<NeonIcon name={ctaIcon} neon={false} className="text-xl text-white" />}>
              {ctaLabel}
            </Button>
          )}
          {children}
        </motion.div>
      </div>

      {/* Connect With Us — normal-flow stack below the content on mobile/
          tablet; absolutely positioned beside the image (right side) at lg,
          sharing the same max-w-container-max frame as the content column
          above. Centered heroes (Contact only) keep it in normal flow at
          every size instead: centered text plus a right-anchored absolute
          card collide at 1024-1280px, confirmed via screenshot QA — a
          centered layout doesn't have a "beside the image" side to pin it to. */}
      <div
        className={
          isCenter
            ? "relative z-10 mt-8 flex w-full justify-center px-margin-mobile md:px-8"
            : "relative z-10 mx-auto mt-8 flex w-full max-w-container-max justify-center px-margin-mobile md:px-8 lg:pointer-events-none lg:absolute lg:inset-0 lg:mt-0 lg:block lg:px-12"
        }
      >
        <div
          className={
            isCenter
              ? "w-full max-w-xs"
              : "w-full max-w-xs lg:pointer-events-auto lg:absolute lg:bottom-[12%] lg:right-[5%] rtl:lg:right-auto rtl:lg:left-[5%]"
          }
        >
          <HeroSocialCard />
        </div>
      </div>
    </section>
  );
}
