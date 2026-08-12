"use client";

import type { ReactNode } from "react";
import Image, { getImageProps } from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { HeroImageConfig } from "@/server/repositories/content";
import { computeHeroLayout } from "@/lib/heroLayout";

/**
 * Shared full-bleed hero photo layer used by every Hero on the site (Home,
 * Dr. Ayman, Videos, Blog, Contact, Services) — the one place that turns a
 * CMS HeroImageConfig into actual pixels. Always full-bleed (no bounded
 * box) so the photo never needs to be pre-cropped to a specific aspect
 * ratio — the Smart Hero engine (computeHeroLayout) reads the admin-marked
 * focus point and decides crop/scale from there when imageStrategy is
 * "auto"; "manual" strategy renders the raw Focus X/Y and Scale as-is with
 * no automatic adjustment.
 *
 * Each Hero still owns its own gradient recipe (passed as children, rendered
 * on top of the photo tiers below) since that's the one part of the visual
 * identity that intentionally differs between Home and the shared
 * secondary-page Hero — this component never touches its color/opacity.
 * "Hero Background Overlay Opacity"/Color are per-Hero concerns for exactly
 * that reason (see HomeHero.tsx/PageHero.tsx, both driven by the same
 * heroOverlayStops() helper in heroLayout.ts); this component only owns the
 * one overlay effect that's identical everywhere — blur. */
export function HeroBackgroundImage({ images, children }: { images: HeroImageConfig; children?: ReactNode }) {
  const { language } = useLanguage();
  const desktopAlt = language === "ar" ? images.desktopAltAr : images.desktopAltEn;
  const mobileAlt = (language === "ar" ? images.mobileAltAr : images.mobileAltEn) || desktopAlt;

  const auto = images.imageStrategy === "auto";
  const layout = auto ? computeHeroLayout(images) : null;

  const desktopFocusX = layout ? layout.desktopFocusX : images.desktopFocusX;
  const desktopFocusY = layout ? layout.desktopFocusY : images.desktopFocusY;
  const mobileFocusX = layout ? layout.mobileFocusX : images.mobileFocusX;
  const mobileFocusY = layout ? layout.mobileFocusY : images.mobileFocusY;
  const desktopScale = layout ? layout.desktopScale : images.desktopScale;
  const mobileScale = layout ? layout.mobileScale : images.mobileScale;

  const objectFit = images.cropMode === "contain" ? "object-contain" : "object-cover";
  // transform-origin is pinned to the focus point rather than left at its
  // "50% 50%" default — a scale() around the element's own center would
  // zoom uniformly from the frame's middle and partly cancel out an
  // off-center object-position instead of reinforcing it.
  const desktopImageStyle = {
    objectPosition: `${desktopFocusX}% ${desktopFocusY}%`,
    transformOrigin: `${desktopFocusX}% ${desktopFocusY}%`,
    transform: desktopScale !== 1 ? `scale(${desktopScale})` : undefined,
  };
  const mobileImageStyle = {
    objectPosition: `${mobileFocusX}% ${mobileFocusY}%`,
    transformOrigin: `${mobileFocusX}% ${mobileFocusY}%`,
    transform: mobileScale !== 1 ? `scale(${mobileScale})` : undefined,
  };

  // All three tiers are art-directed crops of possibly-different source
  // images (not just resized copies), so a single <Image> can't cover all
  // breakpoints — but giving all three `priority` (as before) made Next.js
  // preload every tier's bytes unconditionally, regardless of which one the
  // CSS `md:hidden`/`lg:hidden` classes actually display. That meant mobile
  // visitors always downloaded the tablet+desktop crops too (and vice
  // versa). A `<link rel=preload>` supports a `media` attribute the browser
  // honors natively, so each tier's own breakpoint (matching the Tailwind
  // `md`/`lg` cutoffs used below) can gate its own preload — only the crop
  // that's actually going to render ever gets fetched. getImageProps()
  // reproduces the exact optimized srcSet/sizes next/image would generate
  // for that tier without rendering a second <Image>.
  const mobilePreload = getImageProps({ src: images.mobileImageUrl, alt: "", fill: true, sizes: "100vw" }).props;
  const tabletPreload = getImageProps({ src: images.tabletImageUrl, alt: "", fill: true, sizes: "100vw" }).props;
  const desktopPreload = getImageProps({ src: images.desktopImageUrl, alt: "", fill: true, sizes: "100vw" }).props;

  return (
    <>
      {/* Rendered as plain <link> tags (React/Next hoist these into <head>
          automatically), each scoped with `media` so only the breakpoint
          that's actually visible triggers a fetch. */}
      <link rel="preload" as="image" media="(max-width: 767px)" imageSrcSet={mobilePreload.srcSet} imageSizes={mobilePreload.sizes} fetchPriority="high" />
      <link rel="preload" as="image" media="(min-width: 768px) and (max-width: 1023px)" imageSrcSet={tabletPreload.srcSet} imageSizes={tabletPreload.sizes} fetchPriority="high" />
      <link rel="preload" as="image" media="(min-width: 1024px)" imageSrcSet={desktopPreload.srcSet} imageSizes={desktopPreload.sizes} fetchPriority="high" />

      {images.backgroundImageUrl && (
        <div
          className="absolute inset-0"
          style={{
            opacity: images.backgroundOpacity / 100,
            filter: images.backgroundBlur ? `blur(${images.backgroundBlur}px)` : undefined,
          }}
        >
          <Image src={images.backgroundImageUrl} alt="" fill sizes="100vw" className="object-cover" />
        </div>
      )}

      {/* Mobile tier (<768px) — no `priority`: the media-scoped preload
          above already starts this tier's fetch when it's the active one,
          and the browser reuses that in-flight/cached response here. */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src={images.mobileImageUrl}
          alt={mobileAlt}
          fill
          sizes="100vw"
          className={objectFit}
          style={mobileImageStyle}
        />
      </div>

      {/* Tablet tier (768–1023px) — falls back to the desktop image/settings when not separately configured */}
      <div className="absolute inset-0 hidden md:block lg:hidden">
        <Image
          src={images.tabletImageUrl}
          alt={desktopAlt}
          fill
          sizes="100vw"
          className={objectFit}
          style={desktopImageStyle}
        />
      </div>

      {/* Desktop tier (1024px+) */}
      <div className="absolute inset-0 hidden lg:block">
        <Image
          src={images.desktopImageUrl}
          alt={desktopAlt}
          fill
          sizes="100vw"
          className={objectFit}
          style={desktopImageStyle}
        />
      </div>

      {children}

      {images.overlayBlur > 0 && (
        <div className="absolute inset-0" style={{ backdropFilter: `blur(${images.overlayBlur}px)` }} />
      )}
    </>
  );
}
