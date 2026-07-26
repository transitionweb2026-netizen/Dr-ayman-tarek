import type { HeroImageConfig } from "@/server/repositories/content";

/**
 * The "Smart Hero" engine: turns one admin-marked focal point per breakpoint
 * into a full layout decision — which side the text sits on, how the photo
 * is cropped/scaled, and how wide the text column is allowed to be — so a
 * hero never requires a specially pre-cropped image. There is no computer
 * vision here: the admin marks where the subject is (Focus X/Y, or a plain
 * "Subject Position" pick), and this function is the deterministic layout
 * math that reacts to that mark. Pure and side-effect-free so it can be
 * called identically from both the photo layer and the text layer and
 * always agree.
 */

const LEFT_ZONE_MAX = 35;
const RIGHT_ZONE_MIN = 65;
/** How far (in focus-percentage points) to push the crop away from the text
 * column when the subject is dead-center — enough to open real clearance
 * without the photo visibly "jumping". */
const CENTER_PUSH = 16;
const CENTER_ZOOM = 1.1;
const MOBILE_TOP_ZONE_MAX = 42;
const MOBILE_PUSH = 18;
const MOBILE_ZOOM = 1.18;

export interface HeroLayout {
  contentSide: "left" | "right";
  desktopFocusX: number;
  desktopFocusY: number;
  mobileFocusX: number;
  mobileFocusY: number;
  desktopScale: number;
  mobileScale: number;
  /** Max-width of the text column, as a percentage of the hero's content frame. */
  safeTextWidthPct: number;
  gradientDirection: "left" | "right" | "radial" | "none";
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

function resolveZone(focusX: number): "left" | "center" | "right" {
  if (focusX <= LEFT_ZONE_MAX) return "left";
  if (focusX >= RIGHT_ZONE_MIN) return "right";
  return "center";
}

/** Only meaningful — and only called — when images.imageStrategy === "auto".
 * Manual strategy bypasses this entirely and keeps the hero's original,
 * fixed-left/fixed-width composition, so switching back to Manual is always
 * a safe escape hatch to the previous exact behavior. */
export function computeHeroLayout(images: HeroImageConfig): HeroLayout {
  const zone = images.subjectPosition === "auto" ? resolveZone(images.desktopFocusX) : images.subjectPosition;
  // Subject on one side -> text goes on the other. A centered subject keeps
  // text on the left (the site's existing reading-first convention) and
  // instead relies on the crop push below to clear space for it.
  const contentSide: "left" | "right" = zone === "left" ? "right" : "left";

  const smart = images.cropMode === "smart";

  let desktopFocusX = images.desktopFocusX;
  let desktopScale = images.desktopScale;
  if (smart && zone === "center") {
    desktopFocusX = clamp(contentSide === "left" ? desktopFocusX + CENTER_PUSH : desktopFocusX - CENTER_PUSH, 0, 100);
    desktopScale = Math.max(desktopScale, CENTER_ZOOM);
  }

  // Mobile stacks the headline over the top of the photo rather than beside
  // it, so the axis that matters is vertical: a face sitting in the top
  // ~40% collides with the badge/heading instead of the image's left/right.
  let mobileFocusY = images.mobileFocusY;
  let mobileScale = images.mobileScale;
  if (smart && mobileFocusY <= MOBILE_TOP_ZONE_MAX) {
    mobileFocusY = clamp(mobileFocusY + MOBILE_PUSH, 0, 100);
    mobileScale = Math.max(mobileScale, MOBILE_ZOOM);
  }

  const marginTrim = clamp(images.faceSafeMarginPct, 0, 40) * 0.4;
  const autoWidth = clamp(images.heroBalance - marginTrim, 30, 65);
  const base = images.safeTextAreaPct ?? autoWidth;
  const safeTextWidthPct = clamp(base + images.contentOffsetPct, 25, 70);

  const gradientDirection = images.overlayGradient === "auto" ? contentSide : images.overlayGradient;

  return {
    contentSide,
    desktopFocusX,
    desktopFocusY: images.desktopFocusY,
    mobileFocusX: images.mobileFocusX,
    mobileFocusY,
    desktopScale,
    mobileScale,
    safeTextWidthPct,
    gradientDirection,
  };
}

/** Tailwind's "to-r"/"to-l" gradient utilities are named by which way the
 * gradient travels, not which side is opaque — this maps the layout's
 * "which side is opaque" answer to the right utility so callers don't have
 * to re-derive the (frequently-flipped) direction each time. Null for
 * "radial"/"none", which the caller renders specially. */
export function heroGradientToClass(opaqueSide: "left" | "right" | "radial" | "none"): string | null {
  if (opaqueSide === "left") return "bg-gradient-to-r";
  if (opaqueSide === "right") return "bg-gradient-to-l";
  return null;
}

/** Mirrors a canonical (content-on-left) physical left/right inline
 * position across the vertical center when content flips to the right —
 * `left: X%` and `right: X%` are exact mirrors of each other for any box,
 * regardless of its own width, so this is just a property swap. */
export function mirrorSide(pct: number, canonicalSide: "left" | "right", flip: boolean): { left?: string; right?: string } {
  const side = flip ? (canonicalSide === "left" ? "right" : "left") : canonicalSide;
  return { [side]: `${pct}%` };
}
