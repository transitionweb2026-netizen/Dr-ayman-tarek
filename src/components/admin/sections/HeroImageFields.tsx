"use client";

import type { MouseEvent as ReactMouseEvent } from "react";
import { BilingualField, Label, SelectField, TextField, ToggleField } from "@/components/admin/ui/Field";
import { MediaPickerField } from "@/components/admin/ui/MediaPicker";
import { useMediaAssets, type MediaAsset } from "@/hooks/useMediaLibrary";
import { getPublicMediaUrl } from "@/lib/supabase/storage";
import { computeHeroLayout, type HeroLayout } from "@/lib/heroLayout";
import type { HeroImageConfig } from "@/server/repositories/content";

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

/**
 * Hero image + Smart Hero composition controls for the "hero" SectionCard on
 * every page. Position/scale/focus/crop/gradient/decoration fields are
 * language-agnostic — written identically into both en/ar content, the same
 * "shared" pattern SectionRepeaterField uses for non-bilingual values — only
 * the two alt-text fields are genuinely bilingual.
 *
 * The live preview doubles as the focus-point picker: clicking anywhere on
 * the desktop or mobile preview image sets that breakpoint's Focus X/Y to
 * the click position, and the dashed safe-area box + focus ring update
 * immediately from the same computeHeroLayout() the public site uses — so
 * what the admin sees here is exactly what ships.
 */
export function HeroImageFields({
  en,
  ar,
  setEn,
  setAr,
}: {
  en: Record<string, unknown>;
  ar: Record<string, unknown>;
  setEn: (patch: Record<string, unknown>) => void;
  setAr: (patch: Record<string, unknown>) => void;
}) {
  const { data: assets } = useMediaAssets();

  function urlFor(id: unknown): string | null {
    if (typeof id !== "string" || !id) return null;
    const asset = assets?.find((a) => a.id === id);
    return asset ? getPublicMediaUrl(asset.storage_path) : null;
  }
  function setShared(key: string, value: unknown) {
    setEn({ [key]: value });
    setAr({ [key]: value });
  }
  function pick(key: string) {
    return (asset: MediaAsset | null) => setShared(key, asset?.id ?? null);
  }
  function num(key: string, fallback: number): number {
    const n = Number(en[key]);
    return Number.isFinite(n) && en[key] !== "" && en[key] !== undefined ? n : fallback;
  }
  function str<T extends string>(key: string, fallback: T): T {
    return typeof en[key] === "string" && en[key] ? (en[key] as T) : fallback;
  }

  const desktopUrl = urlFor(en.desktopImageId);
  const mobileUrl = urlFor(en.mobileImageId) || desktopUrl;

  const imageStrategy = str("imageStrategy", "auto");
  const subjectPosition = str("subjectPosition", "auto");
  const cropMode = str("cropMode", "smart");
  const overlayGradient = str("overlayGradient", "auto");
  const desktopFocusX = num("desktopFocusX", 50);
  const desktopFocusY = num("desktopFocusY", 25);
  const mobileFocusX = num("mobileFocusX", 50);
  const mobileFocusY = num("mobileFocusY", 25);
  const faceSafeMarginPct = num("faceSafeMarginPct", 8);
  const rawSafeTextAreaPct = en.safeTextAreaPct;
  const safeTextAreaPct =
    rawSafeTextAreaPct === "" || rawSafeTextAreaPct === null || rawSafeTextAreaPct === undefined
      ? null
      : Number(rawSafeTextAreaPct);
  const contentOffsetPct = num("contentOffsetPct", 0);
  const heroBalance = num("heroBalance", 45);
  const desktopScale = num("desktopScale", 1);
  const mobileScale = num("mobileScale", 1);
  const overlayOpacity = num("overlayOpacity", 0);
  const overlayBlur = num("overlayBlur", 0);

  const previewConfig: HeroImageConfig = {
    desktopImageUrl: desktopUrl || "",
    tabletImageUrl: desktopUrl || "",
    mobileImageUrl: mobileUrl || "",
    desktopAltEn: "",
    desktopAltAr: "",
    mobileAltEn: "",
    mobileAltAr: "",
    imageStrategy,
    subjectPosition,
    desktopFocusX,
    desktopFocusY,
    mobileFocusX,
    mobileFocusY,
    faceSafeMarginPct,
    safeTextAreaPct,
    cropMode,
    overlayGradient,
    contentOffsetPct,
    heroBalance,
    desktopScale,
    mobileScale,
    overlayOpacity,
    overlayBlur,
    backgroundImageUrl: null,
    backgroundOpacity: 40,
    backgroundBlur: 0,
    showDecorations: true,
    contactCardOffsetDesktop: 40,
    contactCardOffsetTablet: 40,
  };
  const layout: HeroLayout | null = imageStrategy === "auto" ? computeHeroLayout(previewConfig) : null;

  function handleFocusClick(target: "desktop" | "mobile") {
    return (e: ReactMouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = Math.round(clamp(((e.clientX - rect.left) / rect.width) * 100, 0, 100));
      const y = Math.round(clamp(((e.clientY - rect.top) / rect.height) * 100, 0, 100));
      if (target === "desktop") {
        setShared("desktopFocusX", x);
        setShared("desktopFocusY", y);
      } else {
        setShared("mobileFocusX", x);
        setShared("mobileFocusY", y);
      }
    };
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-white">Hero Images</h3>
        <p className="mb-3 text-xs text-on-surface-variant/70">
          Desktop and Mobile are independent art-directed images, not one photo resized — each loads only on its own
          breakpoint. Tablet is optional and falls back to Desktop.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <MediaPickerField
            label="Desktop Hero Image"
            valueMediaId={(en.desktopImageId as string) || null}
            valueUrl={desktopUrl}
            onChange={pick("desktopImageId")}
          />
          <MediaPickerField
            label="Tablet Hero Image (optional)"
            valueMediaId={(en.tabletImageId as string) || null}
            valueUrl={urlFor(en.tabletImageId)}
            onChange={pick("tabletImageId")}
          />
          <MediaPickerField
            label="Mobile Hero Image"
            valueMediaId={(en.mobileImageId as string) || null}
            valueUrl={urlFor(en.mobileImageId)}
            onChange={pick("mobileImageId")}
          />
        </div>
      </div>

      <BilingualField
        label="Desktop Alt Text"
        valueEn={(en.desktopAlt as string) || ""}
        valueAr={(ar.desktopAlt as string) || ""}
        onChangeEn={(v) => setEn({ desktopAlt: v })}
        onChangeAr={(v) => setAr({ desktopAlt: v })}
      />
      <BilingualField
        label="Mobile Alt Text"
        valueEn={(en.mobileAlt as string) || ""}
        valueAr={(ar.mobileAlt as string) || ""}
        onChangeEn={(v) => setEn({ mobileAlt: v })}
        onChangeAr={(v) => setAr({ mobileAlt: v })}
      />

      <div className="space-y-4 rounded-xl border border-primary/20 bg-primary/[0.03] p-4">
        <div>
          <h4 className="text-sm font-semibold text-white">Smart Hero Image System</h4>
          <p className="mt-1 text-xs text-on-surface-variant/70">
            In Auto mode, click anywhere on the preview photos below to mark where the subject is — the layout
            (which side the text sits on, the crop, and the safe text width) is computed from that point, so any
            uploaded portrait works without special prep. Switch to Manual for the original fixed composition.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label hint="Auto = adapts to the photo; Manual = fixed, original layout">Image Strategy</Label>
            <SelectField
              value={imageStrategy}
              onChange={(v) => setShared("imageStrategy", v)}
              options={[
                { label: "Auto (Smart Hero)", value: "auto" },
                { label: "Manual (fixed composition)", value: "manual" },
              ]}
            />
          </div>
          <div>
            <Label hint="Auto derives this from Desktop Focus X">Subject Position</Label>
            <SelectField
              value={subjectPosition}
              onChange={(v) => setShared("subjectPosition", v)}
              options={[
                { label: "Auto (from Focus X)", value: "auto" },
                { label: "Left", value: "left" },
                { label: "Center", value: "center" },
                { label: "Right", value: "right" },
              ]}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div>
            <Label hint="0-100">Desktop Focus X</Label>
            <TextField type="number" min="0" max="100" value={desktopFocusX} onChange={(e) => setShared("desktopFocusX", e.target.value === "" ? 50 : Number(e.target.value))} />
          </div>
          <div>
            <Label hint="0-100">Desktop Focus Y</Label>
            <TextField type="number" min="0" max="100" value={desktopFocusY} onChange={(e) => setShared("desktopFocusY", e.target.value === "" ? 25 : Number(e.target.value))} />
          </div>
          <div>
            <Label hint="0-100">Mobile Focus X</Label>
            <TextField type="number" min="0" max="100" value={mobileFocusX} onChange={(e) => setShared("mobileFocusX", e.target.value === "" ? 50 : Number(e.target.value))} />
          </div>
          <div>
            <Label hint="0-100">Mobile Focus Y</Label>
            <TextField type="number" min="0" max="100" value={mobileFocusY} onChange={(e) => setShared("mobileFocusY", e.target.value === "" ? 25 : Number(e.target.value))} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label hint="Smart = auto-protect text when centered; Cover/Contain = plain crop, no adjustment">Crop Mode</Label>
            <SelectField
              value={cropMode}
              onChange={(v) => setShared("cropMode", v)}
              options={[
                { label: "Smart", value: "smart" },
                { label: "Cover", value: "cover" },
                { label: "Contain", value: "contain" },
              ]}
            />
          </div>
          <div>
            <Label hint="Auto darkens whichever side the text lands on">Overlay Gradient</Label>
            <SelectField
              value={overlayGradient}
              onChange={(v) => setShared("overlayGradient", v)}
              options={[
                { label: "Auto", value: "auto" },
                { label: "Left", value: "left" },
                { label: "Right", value: "right" },
                { label: "Radial", value: "radial" },
                { label: "None", value: "none" },
              ]}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div>
            <Label hint="0-40, larger = safer/narrower">Face Safe Margin</Label>
            <TextField type="number" min="0" max="40" value={faceSafeMarginPct} onChange={(e) => setShared("faceSafeMarginPct", e.target.value === "" ? 8 : Number(e.target.value))} />
          </div>
          <div>
            <Label hint="% width, blank = auto">Safe Text Area</Label>
            <TextField
              type="number"
              min="0"
              max="100"
              placeholder="auto"
              value={safeTextAreaPct ?? ""}
              onChange={(e) => setShared("safeTextAreaPct", e.target.value === "" ? null : Number(e.target.value))}
            />
          </div>
          <div>
            <Label hint="-20 to 20">Content Offset</Label>
            <TextField type="number" min="-20" max="20" value={contentOffsetPct} onChange={(e) => setShared("contentOffsetPct", e.target.value === "" ? 0 : Number(e.target.value))} />
          </div>
          <div>
            <Label hint="30-65, target text-column width %">Hero Balance</Label>
            <TextField type="number" min="30" max="65" value={heroBalance} onChange={(e) => setShared("heroBalance", e.target.value === "" ? 45 : Number(e.target.value))} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label hint="1 = 100%, no zoom">Desktop Image Scale</Label>
            <TextField type="number" step="0.05" min="0.5" max="2" value={desktopScale} onChange={(e) => setShared("desktopScale", e.target.value === "" ? 1 : Number(e.target.value))} />
          </div>
          <div>
            <Label hint="1 = 100%, no zoom">Mobile Image Scale</Label>
            <TextField type="number" step="0.05" min="0.5" max="2" value={mobileScale} onChange={(e) => setShared("mobileScale", e.target.value === "" ? 1 : Number(e.target.value))} />
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-xl border border-outline-variant/20 p-4">
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-on-surface-variant">Contact Card Position</h4>
          <p className="mt-1 text-xs text-on-surface-variant/70">
            How far the &quot;Connect With Us&quot; card&apos;s bottom edge sits above the Hero&apos;s own bottom
            edge — a plain bottom anchor, independently configurable for Desktop and Tablet. The card is hidden
            entirely below tablet width (no mobile offset — there&apos;s nothing to position).
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <Label hint="px, from the Hero's bottom edge">Desktop Contact Card Bottom Offset</Label>
            <TextField
              type="number"
              min="0"
              max="200"
              value={num("contactCardOffsetDesktop", 40)}
              onChange={(e) => setShared("contactCardOffsetDesktop", e.target.value === "" ? 40 : Number(e.target.value))}
            />
          </div>
          <div>
            <Label hint="px, from the Hero's bottom edge">Tablet Contact Card Bottom Offset</Label>
            <TextField
              type="number"
              min="0"
              max="200"
              value={num("contactCardOffsetTablet", 40)}
              onChange={(e) => setShared("contactCardOffsetTablet", e.target.value === "" ? 40 : Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-outline-variant/20 p-4">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-on-surface-variant">Overlay</h4>
          <p className="text-xs text-on-surface-variant/70">
            Extra flat tint/blur layered on top of the hero&apos;s built-in gradient — leave at 0 to keep the default
            look untouched.
          </p>
          <div>
            <Label hint="0-100">Overlay Opacity</Label>
            <TextField type="number" min="0" max="100" value={overlayOpacity} onChange={(e) => setShared("overlayOpacity", e.target.value === "" ? 0 : Number(e.target.value))} />
          </div>
          <div>
            <Label hint="px">Overlay Blur</Label>
            <TextField type="number" min="0" max="40" value={overlayBlur} onChange={(e) => setShared("overlayBlur", e.target.value === "" ? 0 : Number(e.target.value))} />
          </div>
        </div>

        <div className="space-y-4 rounded-xl border border-outline-variant/20 p-4">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-on-surface-variant">Background Layer (optional)</h4>
          <p className="text-xs text-on-surface-variant/70">
            A separate ambient/atmosphere image behind the doctor photo — unset by default, purely additive.
          </p>
          <MediaPickerField
            label="Background Image"
            valueMediaId={(en.backgroundImageId as string) || null}
            valueUrl={urlFor(en.backgroundImageId)}
            onChange={pick("backgroundImageId")}
          />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label hint="0-100">Background Opacity</Label>
              <TextField type="number" min="0" max="100" value={num("backgroundOpacity", 40)} onChange={(e) => setShared("backgroundOpacity", e.target.value === "" ? 40 : Number(e.target.value))} />
            </div>
            <div>
              <Label hint="px">Background Blur</Label>
              <TextField type="number" min="0" max="40" value={num("backgroundBlur", 0)} onChange={(e) => setShared("backgroundBlur", e.target.value === "" ? 0 : Number(e.target.value))} />
            </div>
          </div>
        </div>
      </div>

      <ToggleField
        label="Show decorative effects (glow orbs, particles, holographic overlay)"
        checked={en.showDecorations !== false}
        onChange={(v) => setShared("showDecorations", v)}
      />

      <div>
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
          Live Preview {imageStrategy === "auto" && "— click a photo to mark the subject"}
        </h4>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <PreviewPane
            label="Desktop"
            url={desktopUrl}
            focusX={desktopFocusX}
            focusY={desktopFocusY}
            scale={desktopScale}
            cropMode={cropMode}
            overlayOpacity={overlayOpacity}
            overlayBlur={overlayBlur}
            faceSafeMarginPct={faceSafeMarginPct}
            layout={layout}
            aspect="aspect-video"
            emptyMessage="No desktop image set — default photo will render"
            onClick={handleFocusClick("desktop")}
          />
          <PreviewPane
            label="Mobile"
            url={mobileUrl}
            focusX={mobileFocusX}
            focusY={mobileFocusY}
            scale={mobileScale}
            cropMode={cropMode}
            overlayOpacity={overlayOpacity}
            overlayBlur={overlayBlur}
            faceSafeMarginPct={faceSafeMarginPct}
            layout={null}
            aspect="mx-auto aspect-[9/16] max-h-64"
            emptyMessage="No mobile image set — desktop image will be used"
            onClick={handleFocusClick("mobile")}
          />
        </div>
      </div>
    </div>
  );
}

function PreviewPane({
  label,
  url,
  focusX,
  focusY,
  scale,
  cropMode,
  overlayOpacity,
  overlayBlur,
  faceSafeMarginPct,
  layout,
  aspect,
  emptyMessage,
  onClick,
}: {
  label: string;
  url: string | null;
  focusX: number;
  focusY: number;
  scale: number;
  cropMode: string;
  overlayOpacity: number;
  overlayBlur: number;
  faceSafeMarginPct: number;
  layout: HeroLayout | null;
  aspect: string;
  emptyMessage: string;
  onClick: (e: ReactMouseEvent<HTMLDivElement>) => void;
}) {
  const safeBoxStyle: { left?: string; right?: string; width: string } | null = layout
    ? layout.contentSide === "left"
      ? { left: "0%", width: `${layout.safeTextWidthPct}%` }
      : { right: "0%", width: `${layout.safeTextWidthPct}%` }
    : null;

  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <span className="text-xs text-on-surface-variant/60">{label}</span>
        {layout && <span className="text-xs text-primary">Text: {layout.contentSide === "left" ? "Left" : "Right"}</span>}
      </div>
      <div
        onClick={url ? onClick : undefined}
        className={`relative overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container ${aspect} ${url ? "cursor-crosshair" : ""}`}
      >
        {url && (
          // eslint-disable-next-line @next/next/no-img-element -- live preview of arbitrary uploaded asset with dynamic inline styles
          <img
            src={url}
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full"
            style={{
              objectFit: cropMode === "contain" ? "contain" : "cover",
              objectPosition: `${focusX}% ${focusY}%`,
              transformOrigin: `${focusX}% ${focusY}%`,
              transform: scale !== 1 ? `scale(${scale})` : undefined,
              filter: overlayBlur ? `blur(${overlayBlur}px)` : undefined,
            }}
          />
        )}
        {overlayOpacity > 0 && <div className="pointer-events-none absolute inset-0 bg-black" style={{ opacity: overlayOpacity / 100 }} />}
        {url && safeBoxStyle && (
          <div
            className="pointer-events-none absolute inset-y-0 border-2 border-dashed border-primary/70 bg-primary/5"
            style={safeBoxStyle}
          />
        )}
        {url && (
          <div
            className="pointer-events-none absolute rounded-full border border-tertiary bg-tertiary/20"
            style={{
              left: `${focusX}%`,
              top: `${focusY}%`,
              width: `${faceSafeMarginPct * 2}%`,
              height: `${faceSafeMarginPct * 2}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
        {url && (
          <div
            className="pointer-events-none absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-tertiary shadow-[0_0_6px_rgba(255,79,163,0.9)]"
            style={{ left: `${focusX}%`, top: `${focusY}%` }}
          />
        )}
        {!url && (
          <span className="absolute inset-0 flex items-center justify-center px-4 text-center text-xs text-on-surface-variant/50">
            {emptyMessage}
          </span>
        )}
      </div>
    </div>
  );
}
