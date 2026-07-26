"use client";

import type { ReactNode } from "react";
import Image from "next/image";
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
 * between the photo and the optional CMS overlay tint) since that's the one
 * part of the visual identity that intentionally differs between Home and
 * the shared secondary-page Hero — this component never touches it.
 */
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

  return (
    <>
      {images.backgroundImageUrl && (
        <div
          className="absolute inset-0"
          style={{
            opacity: images.backgroundOpacity / 100,
            filter: images.backgroundBlur ? `blur(${images.backgroundBlur}px)` : undefined,
          }}
        >
          <Image src={images.backgroundImageUrl} alt="" fill className="object-cover" />
        </div>
      )}

      {/* Mobile tier (<768px) */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src={images.mobileImageUrl}
          alt={mobileAlt}
          fill
          priority
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
          priority
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
          priority
          sizes="100vw"
          className={objectFit}
          style={desktopImageStyle}
        />
      </div>

      {children}

      {(images.overlayOpacity > 0 || images.overlayBlur > 0) && (
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: images.overlayOpacity > 0 ? `rgba(0,0,0,${images.overlayOpacity / 100})` : undefined,
            backdropFilter: images.overlayBlur ? `blur(${images.overlayBlur}px)` : undefined,
          }}
        />
      )}
    </>
  );
}
