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
import type { HeroImageConfig } from "@/server/repositories/content";
import { computeHeroLayout, heroGradientToClass, mirrorSide } from "@/lib/heroLayout";

const AVATARS = [
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
}

export function HomeHero({ content, images }: { content: Partial<HomeHeroContent>; images: HeroImageConfig }) {
  const t = (key: keyof HomeHeroContent) => content[key] || "";

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
  // #0a0613 is this theme's `background` color (tailwind.config.ts) — Tailwind v3 doesn't
  // expose theme colors as CSS variables, so the radial variant spells it out directly
  // rather than fighting the class-based gradient utilities for the same property.
  const gradientStyle: CSSProperties | undefined =
    layout?.gradientDirection === "radial"
      ? { background: "radial-gradient(ellipse at center, rgba(10,6,19,0.85) 0%, rgba(10,6,19,0.35) 45%, transparent 75%)" }
      : undefined;
  const showGradient = !layout || layout.gradientDirection !== "none";

  return (
    <section className="relative flex min-h-[82vh] flex-col items-center justify-center overflow-hidden pb-10 pt-20 lg:min-h-[700px]">
      {/* Full-bleed background artwork — one photo per breakpoint (art
          directed, not just resized), CMS-configurable via HeroImageConfig.
          This same treatment carries the doctor's photo at every
          breakpoint, mobile included — there is no separate mobile-only
          portrait. */}
      <div className="absolute inset-0 z-0">
        <HeroBackgroundImage images={images}>
          {showGradient && (
            <div
              className={`absolute inset-0 ${gradientStyle ? "" : `${gradientClass} from-background via-background/70 to-background/10`} ${!auto ? "rtl:bg-gradient-to-l" : ""}`}
              style={gradientStyle}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
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
              ? `space-y-7 lg:max-w-[var(--hero-safe-width)] ${flip ? "lg:ml-auto" : "lg:mr-auto"}`
              : "max-w-xl space-y-7"
          }
          style={auto ? ({ "--hero-safe-width": `${layout!.safeTextWidthPct}%` } as CSSProperties) : undefined}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="eyebrow shadow-glow"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary shadow-[0_0_10px_rgba(196,61,255,0.8)]" />
            {t("badge")}
          </motion.div>

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
              className="w-full sm:w-auto"
              icon={<NeonIcon name="calendar_month" neon={false} className="text-xl text-white" />}
            >
              {t("primaryCta")}
            </Button>
            <Button
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
              {AVATARS.map((src) => (
                <div key={src} className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-background">
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

      {/* Connect With Us — normal-flow stack below the content on mobile/
          tablet (extra top margin from Contact Card Bottom Offset — no
          "bottom" position exists to anchor to outside of absolute
          positioning); anchored near the bottom beside the doctor image at
          lg via a real `bottom` offset, on whichever side the text isn't
          (opposite of contentSide in auto mode; the language-mirrored far
          side in manual mode). All three offsets are CMS fields (Desktop/
          Tablet/Mobile Contact Card Bottom Offset) — nothing here is a
          hardcoded pixel value baked into the component. */}
      <div
        className="relative z-10 mx-auto mt-[var(--cc-gap-mobile)] flex w-full max-w-container-max flex-col items-center gap-5 px-margin-mobile md:mt-[var(--cc-gap-tablet)] md:px-8 lg:pointer-events-none lg:absolute lg:inset-0 lg:mt-0 lg:block lg:px-12"
        style={
          {
            "--cc-gap-mobile": `${images.contactCardOffsetMobile}px`,
            "--cc-gap-tablet": `${images.contactCardOffsetTablet}px`,
            "--cc-gap-desktop": `${images.contactCardOffsetDesktop}px`,
          } as CSSProperties
        }
      >
        <div
          className={
            auto
              ? `w-full max-w-xs lg:pointer-events-auto lg:absolute lg:bottom-[var(--cc-gap-desktop)] lg:w-64 ${flip ? "lg:left-[5%]" : "lg:right-[5%]"}`
              : "w-full max-w-xs lg:pointer-events-auto lg:absolute lg:right-[5%] lg:bottom-[var(--cc-gap-desktop)] lg:w-64 rtl:lg:right-auto rtl:lg:left-[5%]"
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
