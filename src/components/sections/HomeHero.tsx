"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { NeonIcon } from "@/components/ui/NeonIcon";
import { HolographicBrain } from "@/components/decor/HolographicBrain";
import { HolographicSpine } from "@/components/decor/HolographicSpine";
import { ParticleField } from "@/components/decor/ParticleField";
import { GlowOrb } from "@/components/decor/GlowOrb";
import { MouseParallax } from "@/components/motion/Parallax";
import { HeroSocialCard } from "@/components/sections/HeroSocialCard";
import { HeroBackgroundImage } from "@/components/sections/HeroBackgroundImage";
import { useLanguage } from "@/i18n/LanguageProvider";
import { localizedHref } from "@/lib/localizedHref";
import type { HeroImageConfig } from "@/server/repositories/content";
import { computeHeroLayout, heroGradientToClass, heroOverlayStops, heroSafeWidthCss, mirrorSide, scaleOverlayColor } from "@/lib/heroLayout";

// Fallback avatars — rendered only until the CMS's Patient Avatars are set
// (Home > Hero), same "hardcoded default, CMS can override" pattern as the
// Hero background image's own DEFAULT_HERO_IMAGE_URL.
const DEFAULT_AVATARS = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCm5F_KClouvmKWx93nUbO6JYr4zCLdMn0h3bcl7xULyL7yjuq094yBSRl10k38bGrsF1T4CujvU4gXocmx37Ni-K7byWs0j8lbhIQqs7LwDi2ObwUG81F5LMA_rQfpiqZNXK-v4Ne4dcmgUmPb5HEl7DNkIrK5gEFViyOia2cDf0grk4bu0Qx8DJh79V_gbH7YMkYa2SP5aqzW0YeacUq_dgiY4oGjtqT52wvR0eTz-J8UtHMYDoaP",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAlGcFmIlF87TrBs_znOexITwuddllOInrNPuJ-60UGAnDd_zC1fzYeU-dZgEFh4YTb5-dcZ0y4cOkFcRp-oU1_-TdXzRIZtvcJmvNo0Sg4ba54bu6VByiHtHdi9-gwPONW1oT_Jjz8_NPTjpQ4bCfQTjefkHLgq9aIIJqTMOTYDsFH3qFDfsUhHioiHplOFw9yh6Q7GelrVxmlHoszUzDoc-5go9vWrK1UhfmKenN-kdh3res12AOR",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCFmLdF0PeA-Hu7BCZev7CfkgSh21k-pdy7TTyM33p0pkURQBllrCRkyADxLMdkJ6vvuRRIzw6ncPy45pXooC0PBgyC4A_SLfRZKC5508vFwEcspjTQo27u-FmNWeWqIwe1LugRDjSj72CFLPB7Ip-HQs8C3uDvSQixZlnHR3TO_yAAtdq2YuZbIwB2moMCL8Fy3E-qxMjxZklKcAqumfvLfYHmwixicxsxHmJkQQHsSz6qtZQNtutD",
];

export interface HomeHeroContent {
  badge: string;
  headingLine1: string;
  headingLine2: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  doctorName: string;
  doctorTitle: string;
  statValue: string;
  statLabel: string;
  patientAvatars?: { image: string }[];
}

export function HomeHero({ content, images }: { content: Partial<HomeHeroContent>; images: HeroImageConfig }) {
  const t = (key: keyof HomeHeroContent) => (typeof content[key] === "string" ? (content[key] as string) : "");
  const { language, contact } = useLanguage();
  const avatars =
    content.patientAvatars && content.patientAvatars.length > 0
      ? content.patientAvatars.map((a) => a.image)
      : DEFAULT_AVATARS;

  // Smart Hero: in "auto" strategy the layout (which side the text sits on,
  // how wide it's allowed to be, which way the gradient darkens) is derived
  // from the photo's marked subject position, not fixed in code — any
  // uploaded portrait works without special prep. "manual" strategy keeps
  // the original fixed-left, fixed-width composition untouched.
  const auto = images.imageStrategy === "auto";
  const layout = auto ? computeHeroLayout(images) : null;
  const contentSide = layout?.contentSide ?? "left";
  const flip = contentSide === "right";
  const gradientClass = heroGradientToClass(layout?.gradientDirection ?? "left") ?? "bg-gradient-to-r";
  const showGradient = !layout || layout.gradientDirection !== "none";
  const { overlayOpacity, overlayColor } = images;
  // The side gradient's base stops (100/70/10, at 0/50/100%) and the top
  // gradient's (100/0/50) are this Hero's original, unmodified design —
  // "Hero Background Overlay Opacity" scales every one of them by the same
  // factor via heroOverlayStops(), so the gradient's shape (and therefore
  // its text-protecting behavior) never changes, only its overall intensity.
  const sideStopsCss = heroOverlayStops(
    [
      { opacity: 100, position: 0 },
      { opacity: 70, position: 50 },
      { opacity: 10, position: 100 },
    ],
    overlayOpacity,
    overlayColor,
  );
  const topStopsCss = heroOverlayStops(
    [
      { opacity: 100, position: 0 },
      { opacity: 0, position: 50 },
      { opacity: 50, position: 100 },
    ],
    overlayOpacity,
    overlayColor,
  );
  const radialStyle: CSSProperties | undefined =
    layout?.gradientDirection === "radial"
      ? {
          background: `radial-gradient(ellipse at center, ${scaleOverlayColor(85, overlayOpacity, overlayColor)} 0%, ${scaleOverlayColor(35, overlayOpacity, overlayColor)} 45%, transparent 75%)`,
        }
      : undefined;

  // 800px (desktop, lg+) is a measured value, not a guess: English's
  // headline ("Precision Surgery." / "Life Reimagined.") wraps to 2 lines
  // each at the shared 576px content column and the font's clamped max
  // size, needing ~795px of total section height — taller than Arabic's,
  // whose shorter translated phrases fit on one line each. Both languages
  // share this one floor so the *outer* Hero box renders at an identical
  // height regardless of language; only min-h (not a hard height) is used,
  // so nothing is ever clipped if copy changes later and needs more room.
  return (
    // mt-20 (not the old pt-20) reserves the fixed header's own height
    // (h-20) as real layout space instead of internal padding: the header
    // is `position: fixed` (out of flow) with a semi-transparent
    // background, so this section's box — and everything absolutely
    // positioned inside it, including the full-bleed background photo
    // below — previously started at the very top of the page and bled up
    // behind/through the header. Starting the section's own box below the
    // header instead keeps the photo fully contained in the Hero while
    // leaving the text content's on-page position unchanged (mt-20 outside
    // the box replaces the exact 80px pt-20 used to provide inside it).
    <section className="relative mt-20 flex min-h-[82vh] flex-col items-center justify-center overflow-hidden pb-10 lg:min-h-[800px]">
      {/* Full-bleed background artwork — one photo per breakpoint (art
          directed, not just resized), CMS-configurable via HeroImageConfig.
          This same treatment carries the doctor's photo at every
          breakpoint, mobile included — there is no separate mobile-only
          portrait. */}
      <div className="absolute inset-0 z-0">
        <HeroBackgroundImage images={images}>
          {showGradient && (
            <div
              className={`absolute inset-0 ${radialStyle ? "" : `${gradientClass} ${!auto ? "rtl:bg-gradient-to-l" : ""}`}`}
              style={radialStyle ?? ({ "--tw-gradient-stops": sideStopsCss } as CSSProperties)}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t" style={{ "--tw-gradient-stops": topStopsCss } as CSSProperties} />
        </HeroBackgroundImage>
      </div>

      {images.showDecorations && (
        <>
          <GlowOrb className="z-[1] -left-52 -top-32 h-[600px] w-[600px]" />
          <GlowOrb className="z-[1] -right-24 top-1/4 h-[480px] w-[480px]" color="tertiary" />
          <div className="dot-grid pointer-events-none absolute inset-0 z-[1] opacity-[0.05]" />
        </>
      )}

      <div className="relative z-10 mx-auto w-full max-w-container-max px-margin-mobile md:px-8 lg:px-12">
        <div
          className={
            auto
              ? `mt-52 md:mt-0 lg:max-w-[var(--hero-safe-width)] ${flip ? "lg:ml-auto" : "lg:mr-auto"}`
              : "mt-52 max-w-xl md:mt-0"
          }
          style={auto ? ({ "--hero-safe-width": heroSafeWidthCss(layout!.safeTextWidthPct) } as CSSProperties) : undefined}
        >
          <div className="space-y-7">
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-hero text-white"
            >
              {t("headingLine1")}
              <br />
              <span className="text-gradient-brand">{t("headingLine2")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-lg text-body-lg text-on-surface-variant"
            >
              {t("description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4"
            >
              <Button
                href={contact.bookingHref}
                className="w-full sm:w-auto"
                icon={<NeonIcon name="calendar_month" neon={false} className="text-xl text-white" />}
              >
                {t("primaryCta")}
              </Button>
              <Button
                href={localizedHref("/videos", language)}
                variant="ghost"
                className="w-full sm:w-auto"
                icon={<NeonIcon name="play_circle" filled className="text-xl" />}
              >
                {t("secondaryCta")}
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex items-center justify-center gap-6 pt-4 sm:justify-start"
            >
              <div className="flex -space-x-3 rtl:space-x-reverse">
                {avatars.map((src, i) => (
                  <div key={i} className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-background">
                    <Image src={src} alt="" fill className="object-cover" sizes="48px" />
                  </div>
                ))}
              </div>
              <div>
                <p dir="ltr" className="text-card-title font-bold text-white rtl:text-right">{t("statValue")}</p>
                <p className="text-small text-on-surface-variant">{t("statLabel")}</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Connect With Us — normal-flow stack below the CTA/stat row on
            mobile (<768px) only, restoring the card that a prior pass
            wrongly hid on mobile entirely (regression). Same component,
            same CMS data, same visual treatment as tablet/desktop — just
            laid out in-flow instead of absolutely positioned, matching the
            pattern PageHero already uses for this exact card. The md+
            absolute-positioned block right below is untouched. */}
        <div className="relative z-10 mt-8 flex w-full justify-center md:hidden">
          <div className="w-full max-w-xs">
            <HeroSocialCard />
          </div>
        </div>
      </div>

      {/* Connect With Us — hidden entirely on mobile (<768px); anchored to
          the Hero's bottom-right from tablet up via a plain `bottom` offset
          — no vertical centering, no translateY, no max()/min()/clamp(),
          no percentage-based vertical position. Tablet and Desktop each get
          their own CMS-configurable pixel offset (Tablet/Desktop Contact
          Card Bottom Offset) applied at their own breakpoint. */}
      <div
        className="hidden md:absolute md:inset-0 md:z-10 md:mx-auto md:block md:w-full md:max-w-container-max md:px-8 md:pointer-events-none lg:px-12"
        style={
          {
            "--cc-gap-tablet": `${images.contactCardOffsetTablet}px`,
            "--cc-gap-desktop": `${images.contactCardOffsetDesktop}px`,
          } as CSSProperties
        }
      >
        <div
          className={
            auto
              ? `md:pointer-events-auto md:absolute md:bottom-[var(--cc-gap-tablet)] md:w-64 lg:bottom-[var(--cc-gap-desktop)] ${flip ? "md:left-[5%]" : "md:right-[5%]"}`
              : "md:pointer-events-auto md:absolute md:bottom-[var(--cc-gap-tablet)] md:right-[5%] md:w-64 lg:bottom-[var(--cc-gap-desktop)] rtl:md:right-auto rtl:md:left-[5%]"
          }
        >
          <HeroSocialCard />
        </div>
      </div>

      {/* Holographic overlay layer — brain, spine, rings, particles, HUD.
          Hand-positioned assuming content-left/image-right; mirrorSide()
          flips every anchor across center when Smart Hero puts content on
          the right instead, so the decorations always complement whichever
          side the photo actually occupies. */}
      {images.showDecorations && (
        <div className="pointer-events-none absolute inset-0 z-[5] hidden lg:block">
          <MouseParallax strength={10}>
            <div
              className="absolute h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-primary/30"
              style={{ top: "45%", ...mirrorSide(45, "left", flip) }}
            />
          </MouseParallax>
          <div
            className="absolute h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 animate-spin-slow-rev rounded-full border border-tertiary/20"
            style={{ top: "45%", ...mirrorSide(45, "left", flip) }}
          />

          <HolographicBrain className="absolute h-[72%] w-[19%]" style={{ top: "10%", ...mirrorSide(36, "left", flip) }} />
          <HolographicSpine className="absolute h-[80%] w-[10%]" style={{ top: "8%", ...mirrorSide(1, "right", flip) }} />

          <div
            className="icon-badge-neon absolute flex h-14 w-14 animate-float-y items-center justify-center rounded-full"
            style={{ top: "6%", ...mirrorSide(63, "left", flip) }}
          >
            <NeonIcon name="monitor_heart" className="text-2xl" />
          </div>
          <div
            className="icon-badge-neon absolute flex h-14 w-14 animate-float-y items-center justify-center rounded-full"
            style={{ bottom: "18%", animationDelay: "1.6s", ...mirrorSide(68, "left", flip) }}
          >
            <NeonIcon name="graphic_eq" className="text-3xl" />
          </div>

          <ParticleField count={8} className="absolute inset-0" />
        </div>
      )}
    </section>
  );
}
