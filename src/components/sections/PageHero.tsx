"use client";

import { motion } from "framer-motion";
import { GlowOrb } from "@/components/decor/GlowOrb";
import { Button } from "@/components/ui/Button";
import { NeonIcon } from "@/components/ui/NeonIcon";
import { HeroSocialCard } from "@/components/sections/HeroSocialCard";
import { HeroBackgroundImage } from "@/components/sections/HeroBackgroundImage";
import type { CSSProperties, ReactNode } from "react";
import type { HeroImageConfig } from "@/server/repositories/content";
import { computeHeroLayout, heroGradientToClass, heroOverlayStops, heroSafeWidthCss, scaleOverlayColor } from "@/lib/heroLayout";

interface PageHeroProps {
  /** No longer rendered (the eyebrow badge was removed site-wide) — kept
   * required so every existing caller passing CMS eyebrow copy still
   * type-checks without touching each page. */
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
  ctaHref?: string;
  align?: "left" | "center";
  height?: "sm" | "md";
  children?: ReactNode;
}

/** Shared secondary-page hero used by Services, Dr. Ayman Tarek, Videos,
 * Blog, and Contact — same visual system as HomeHero (full-bleed CMS photo,
 * gradient, glow/dot-grid decorations, Smart Hero auto layout), scaled down
 * for a shorter, more text-forward hero. Centered heroes (Contact) opt out
 * of the content-side/flip logic below — a centered layout has no "which
 * side" for a subject to be protected from. */
export function PageHero({
  title,
  subtitle,
  images,
  image,
  ctaLabel,
  ctaIcon = "calendar_month",
  ctaHref,
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

  const auto = !isCenter && images.imageStrategy === "auto";
  const layout = auto ? computeHeroLayout(images) : null;
  const contentSide = layout?.contentSide ?? "left";
  const flip = contentSide === "right";
  const gradientClass = heroGradientToClass(layout?.gradientDirection ?? "left") ?? "bg-gradient-to-r";
  const { overlayOpacity, overlayColor } = images;
  // This Hero's original, unmodified design stops — flat 65% tint for
  // manual/centered, a 75/45/10 side gradient plus a 100/40/60 top gradient
  // for auto — all scaled by the same "Hero Background Overlay Opacity" the
  // Home Hero uses, via the same heroOverlayStops() helper.
  const flatTintColor = scaleOverlayColor(65, overlayOpacity, overlayColor);
  const sideStopsCss = heroOverlayStops(
    [
      { opacity: 75, position: 0 },
      { opacity: 45, position: 50 },
      { opacity: 10, position: 100 },
    ],
    overlayOpacity,
    overlayColor,
  );
  const topStopsCss = heroOverlayStops(
    [
      { opacity: 100, position: 0 },
      { opacity: 40, position: 50 },
      { opacity: 60, position: 100 },
    ],
    overlayOpacity,
    overlayColor,
  );
  const radialStyle: CSSProperties | undefined =
    auto && layout?.gradientDirection === "radial"
      ? {
          background: `radial-gradient(ellipse at center, ${scaleOverlayColor(80, overlayOpacity, overlayColor)} 0%, ${scaleOverlayColor(30, overlayOpacity, overlayColor)} 45%, transparent 75%)`,
        }
      : undefined;

  return (
    // mt-20 (not pt-20) reserves the fixed header's own height (h-20) as
    // real layout space instead of internal padding — see HomeHero.tsx for
    // why: the header is `position: fixed` with a semi-transparent
    // background, so this section's absolutely-positioned background photo
    // was bleeding up behind/through it. This keeps the text's on-page
    // position unchanged while containing the photo fully inside the Hero.
    <section
      className={`relative mt-20 flex flex-col overflow-hidden pb-10 ${
        height === "sm" ? "min-h-[45vh] lg:min-h-[380px]" : "min-h-[55vh] lg:min-h-[460px]"
      } items-center justify-center`}
    >
      {effectiveImages ? (
        <div className="absolute inset-0 z-0">
          <HeroBackgroundImage images={effectiveImages}>
            {!auto && <div className="absolute inset-0" style={{ backgroundColor: flatTintColor }} />}
            {auto && layout && layout.gradientDirection !== "none" && (
              <div
                className={radialStyle ? "absolute inset-0" : `absolute inset-0 ${gradientClass}`}
                style={radialStyle ?? ({ "--tw-gradient-stops": sideStopsCss } as CSSProperties)}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t" style={{ "--tw-gradient-stops": topStopsCss } as CSSProperties} />
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
          className={
            isCenter
              ? "mx-auto max-w-xl"
              : auto
                ? `lg:max-w-[var(--hero-safe-width)] ${flip ? "lg:ml-auto" : "lg:mr-auto"}`
                : "max-w-xl"
          }
          style={auto && layout ? ({ "--hero-safe-width": heroSafeWidthCss(layout.safeTextWidthPct) } as CSSProperties) : undefined}
        >
          <h1 className="mb-4 text-hero text-white">{title}</h1>
          <p className={`mb-8 text-body-lg text-on-surface-variant ${isCenter ? "mx-auto max-w-xl" : "max-w-xl"}`}>
            {subtitle}
          </p>
          {ctaLabel && (
            <Button href={ctaHref} className="w-full sm:w-auto" icon={<NeonIcon name={ctaIcon} neon={false} className="text-xl text-white" />}>
              {ctaLabel}
            </Button>
          )}
          {children}
        </motion.div>
      </div>

      {/* Connect With Us — normal-flow stack below the content on mobile/
          tablet; absolutely positioned beside the image at lg (opposite the
          text column), sharing the same max-w-container-max frame as the
          content column above. Centered heroes (Contact only) keep it in
          normal flow at every size instead: centered text plus a
          right-anchored absolute card collide at 1024-1280px, confirmed via
          screenshot QA — a centered layout doesn't have a "beside the
          image" side to pin it to. */}
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
              : auto
                ? `w-full max-w-xs lg:pointer-events-auto lg:absolute lg:bottom-[12%] ${flip ? "lg:left-[5%]" : "lg:right-[5%]"}`
                : "w-full max-w-xs lg:pointer-events-auto lg:absolute lg:bottom-[12%] lg:right-[5%] rtl:lg:right-auto rtl:lg:left-[5%]"
          }
        >
          <HeroSocialCard />
        </div>
      </div>
    </section>
  );
}
