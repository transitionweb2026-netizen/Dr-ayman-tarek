"use client";

import { BilingualField, Label, SelectField, TextField, ToggleField } from "@/components/admin/ui/Field";
import { MediaPickerField } from "@/components/admin/ui/MediaPicker";
import { useMediaAssets, type MediaAsset } from "@/hooks/useMediaLibrary";
import { getPublicMediaUrl } from "@/lib/supabase/storage";

/**
 * Hero image + composition controls for the "hero" SectionCard on every
 * page. Position/scale/dimension/overlay/decoration fields are
 * language-agnostic — written identically into both en/ar content, the same
 * "shared" pattern SectionRepeaterField uses for non-bilingual values — only
 * the two alt-text fields are genuinely bilingual.
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

  const desktopUrl = urlFor(en.desktopImageId);
  const mobileUrl = urlFor(en.mobileImageId) || desktopUrl;
  const desktopObjectPosition = (en.desktopObjectPosition as string) || "center top";
  const mobileObjectPosition = (en.mobileObjectPosition as string) || "center top";
  const desktopScale = num("desktopScale", 1);
  const mobileScale = num("mobileScale", 1);
  const overlayOpacity = num("overlayOpacity", 0);
  const overlayBlur = num("overlayBlur", 0);

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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-outline-variant/20 p-4">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-on-surface-variant">Desktop Composition</h4>
          <div>
            <Label hint="Where the image box anchors in the hero">Image Position</Label>
            <SelectField
              value={(en.desktopImagePosition as string) || "right"}
              onChange={(v) => setShared("desktopImagePosition", v)}
              options={[
                { label: "Left", value: "left" },
                { label: "Center", value: "center" },
                { label: "Right", value: "right" },
              ]}
            />
          </div>
          <div>
            <Label hint="CSS object-position, e.g. center top">Object Position</Label>
            <TextField
              value={desktopObjectPosition}
              placeholder="center top"
              dir="ltr"
              onChange={(e) => setShared("desktopObjectPosition", e.target.value)}
            />
          </div>
          <div>
            <Label hint="1 = 100%, no zoom">Image Scale</Label>
            <TextField
              type="number"
              step="0.05"
              min="0.5"
              max="2"
              value={desktopScale}
              onChange={(e) => setShared("desktopScale", e.target.value === "" ? 1 : Number(e.target.value))}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label hint="CSS value, e.g. 560px">Max Width</Label>
              <TextField
                value={(en.desktopMaxWidth as string) || ""}
                placeholder="none"
                dir="ltr"
                onChange={(e) => setShared("desktopMaxWidth", e.target.value)}
              />
            </div>
            <div>
              <Label hint="CSS value, e.g. 640px">Max Height</Label>
              <TextField
                value={(en.desktopMaxHeight as string) || ""}
                placeholder="none"
                dir="ltr"
                onChange={(e) => setShared("desktopMaxHeight", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-xl border border-outline-variant/20 p-4">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-on-surface-variant">Mobile Composition</h4>
          <div>
            <Label hint="Where the image box anchors in the hero">Image Position</Label>
            <SelectField
              value={(en.mobileImagePosition as string) || "center"}
              onChange={(v) => setShared("mobileImagePosition", v)}
              options={[
                { label: "Top", value: "top" },
                { label: "Center", value: "center" },
                { label: "Bottom", value: "bottom" },
              ]}
            />
          </div>
          <div>
            <Label hint="CSS object-position, e.g. center top">Object Position</Label>
            <TextField
              value={mobileObjectPosition}
              placeholder="center top"
              dir="ltr"
              onChange={(e) => setShared("mobileObjectPosition", e.target.value)}
            />
          </div>
          <div>
            <Label hint="1 = 100%, no zoom">Image Scale</Label>
            <TextField
              type="number"
              step="0.05"
              min="0.5"
              max="2"
              value={mobileScale}
              onChange={(e) => setShared("mobileScale", e.target.value === "" ? 1 : Number(e.target.value))}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label hint="CSS value, e.g. 100%">Max Width</Label>
              <TextField
                value={(en.mobileMaxWidth as string) || ""}
                placeholder="none"
                dir="ltr"
                onChange={(e) => setShared("mobileMaxWidth", e.target.value)}
              />
            </div>
            <div>
              <Label hint="CSS value, e.g. 420px">Max Height</Label>
              <TextField
                value={(en.mobileMaxHeight as string) || ""}
                placeholder="none"
                dir="ltr"
                onChange={(e) => setShared("mobileMaxHeight", e.target.value)}
              />
            </div>
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
            <TextField
              type="number"
              min="0"
              max="100"
              value={overlayOpacity}
              onChange={(e) => setShared("overlayOpacity", e.target.value === "" ? 0 : Number(e.target.value))}
            />
          </div>
          <div>
            <Label hint="px">Overlay Blur</Label>
            <TextField
              type="number"
              min="0"
              max="40"
              value={overlayBlur}
              onChange={(e) => setShared("overlayBlur", e.target.value === "" ? 0 : Number(e.target.value))}
            />
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
              <TextField
                type="number"
                min="0"
                max="100"
                value={num("backgroundOpacity", 40)}
                onChange={(e) => setShared("backgroundOpacity", e.target.value === "" ? 40 : Number(e.target.value))}
              />
            </div>
            <div>
              <Label hint="px">Background Blur</Label>
              <TextField
                type="number"
                min="0"
                max="40"
                value={num("backgroundBlur", 0)}
                onChange={(e) => setShared("backgroundBlur", e.target.value === "" ? 0 : Number(e.target.value))}
              />
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
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-on-surface-variant">Live Preview</h4>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <span className="mb-1 block text-xs text-on-surface-variant/60">Desktop</span>
            <div className="relative aspect-video overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container">
              {desktopUrl && (
                // eslint-disable-next-line @next/next/no-img-element -- live preview of arbitrary uploaded asset with dynamic inline styles
                <img
                  src={desktopUrl}
                  alt=""
                  className="absolute inset-0 h-full w-full"
                  style={{
                    objectFit: "cover",
                    objectPosition: desktopObjectPosition,
                    transform: `scale(${desktopScale})`,
                    filter: overlayBlur ? `blur(${overlayBlur}px)` : undefined,
                  }}
                />
              )}
              {overlayOpacity > 0 && <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity / 100 }} />}
              {!desktopUrl && (
                <span className="absolute inset-0 flex items-center justify-center text-xs text-on-surface-variant/50">
                  No desktop image set — default photo will render
                </span>
              )}
            </div>
          </div>
          <div>
            <span className="mb-1 block text-xs text-on-surface-variant/60">Mobile</span>
            <div className="relative mx-auto aspect-[9/16] max-h-64 overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container">
              {mobileUrl && (
                // eslint-disable-next-line @next/next/no-img-element -- live preview of arbitrary uploaded asset with dynamic inline styles
                <img
                  src={mobileUrl}
                  alt=""
                  className="absolute inset-0 h-full w-full"
                  style={{
                    objectFit: "cover",
                    objectPosition: mobileObjectPosition,
                    transform: `scale(${mobileScale})`,
                    filter: overlayBlur ? `blur(${overlayBlur}px)` : undefined,
                  }}
                />
              )}
              {overlayOpacity > 0 && <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity / 100 }} />}
              {!mobileUrl && (
                <span className="absolute inset-0 flex items-center justify-center px-4 text-center text-xs text-on-surface-variant/50">
                  No mobile image set — desktop image will be used
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
