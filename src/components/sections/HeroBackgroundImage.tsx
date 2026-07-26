"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { HeroImageConfig } from "@/server/repositories/content";

/**
 * Shared full-bleed hero photo layer used by every Hero on the site (Home,
 * Dr. Ayman, Videos, Blog, Contact, Services) — the one place that turns a
 * CMS HeroImageConfig into actual pixels, so every Hero's image behavior
 * (independent desktop/tablet/mobile art direction, position, scale, bounds,
 * ambient background layer, overlay tint/blur) stays identical everywhere.
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

  const desktopBounded = Boolean(images.desktopMaxWidth || images.desktopMaxHeight);
  const mobileBounded = Boolean(images.mobileMaxWidth || images.mobileMaxHeight);
  const desktopJustify =
    images.desktopImagePosition === "left" ? "flex-start" : images.desktopImagePosition === "right" ? "flex-end" : "center";
  const mobileAlign =
    images.mobileImagePosition === "top" ? "flex-start" : images.mobileImagePosition === "bottom" ? "flex-end" : "center";

  const desktopImageStyle = {
    objectPosition: images.desktopObjectPosition,
    transform: images.desktopScale !== 1 ? `scale(${images.desktopScale})` : undefined,
  };
  const mobileImageStyle = {
    objectPosition: images.mobileObjectPosition,
    transform: images.mobileScale !== 1 ? `scale(${images.mobileScale})` : undefined,
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
      <div
        className={mobileBounded ? "absolute inset-0 flex md:hidden" : "absolute inset-0 md:hidden"}
        style={mobileBounded ? { alignItems: mobileAlign } : undefined}
      >
        <div
          className="relative h-full w-full"
          style={{ maxWidth: images.mobileMaxWidth || undefined, maxHeight: images.mobileMaxHeight || undefined }}
        >
          <Image src={images.mobileImageUrl} alt={mobileAlt} fill priority sizes="100vw" className="object-cover" style={mobileImageStyle} />
        </div>
      </div>

      {/* Tablet tier (768–1023px) — falls back to the desktop image/settings when not separately configured.
          dir="ltr" pins "left"/"right" in the CMS to physical sides regardless of page language — an admin
          picking "Right" expects the photo box on the visual right in both English and Arabic, not mirrored. */}
      <div
        dir="ltr"
        className={desktopBounded ? "absolute inset-0 hidden md:flex lg:hidden" : "absolute inset-0 hidden md:block lg:hidden"}
        style={desktopBounded ? { justifyContent: desktopJustify } : undefined}
      >
        <div
          className="relative h-full w-full"
          style={{ maxWidth: images.desktopMaxWidth || undefined, maxHeight: images.desktopMaxHeight || undefined }}
        >
          <Image src={images.tabletImageUrl} alt={desktopAlt} fill priority sizes="100vw" className="object-cover" style={desktopImageStyle} />
        </div>
      </div>

      {/* Desktop tier (1024px+) — dir="ltr" for the same reason as the tablet tier above */}
      <div
        dir="ltr"
        className={desktopBounded ? "absolute inset-0 hidden lg:flex" : "absolute inset-0 hidden lg:block"}
        style={desktopBounded ? { justifyContent: desktopJustify } : undefined}
      >
        <div
          className="relative h-full w-full"
          style={{ maxWidth: images.desktopMaxWidth || undefined, maxHeight: images.desktopMaxHeight || undefined }}
        >
          <Image src={images.desktopImageUrl} alt={desktopAlt} fill priority sizes="100vw" className="object-cover" style={desktopImageStyle} />
        </div>
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
