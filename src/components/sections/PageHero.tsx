"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GlowOrb } from "@/components/decor/GlowOrb";
import { Button } from "@/components/ui/Button";
import { NeonIcon } from "@/components/ui/NeonIcon";
import { HeroSocialCard } from "@/components/sections/HeroSocialCard";
import type { ReactNode } from "react";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  /** Pass null to render the abstract gradient background instead of a photo. */
  image?: string | null;
  ctaLabel?: string;
  ctaIcon?: string;
  align?: "left" | "center";
  height?: "sm" | "md";
  children?: ReactNode;
}

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCzisrET4Qkk8YLXGhJ2mVo7nKTWW63hoguCebr-wvWBiXwpBJCiMlxUIeY5UZjBMIo_6euqQYrIjaosvUv3eFdDQM3CvsV_XbLZcyymmvgQFyZfgFDW2OrQVXrD-Z2Q5eZ0pUi5c0_quGDB2PhTRff6XEfa35aYt2iTFghaDbo-OS8YixuEWh-6KrSyqJgSHDtlYajwgDYJolToQH1MvTWYbjrIvgsOGpPbIfnGk2q6zdT69oefoMw";

/** Shared secondary-page hero used by Services, About, Videos, Contact, and Dr. Ayman Tarek. */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  image = HERO_IMAGE,
  ctaLabel,
  ctaIcon = "calendar_month",
  align = "left",
  height = "md",
  children,
}: PageHeroProps) {
  const isCenter = align === "center";

  return (
    <section
      className={`relative flex overflow-hidden pt-20 pb-10 ${
        height === "sm" ? "min-h-[45vh] lg:min-h-[380px]" : "min-h-[55vh] lg:min-h-[460px]"
      } items-center`}
    >
      {image ? (
        <div className="absolute inset-0 z-0">
          <Image src={image} alt="" fill priority className="object-cover object-top" />
          <div className="absolute inset-0 bg-background/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/60" />
        </div>
      ) : (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-surface-container-lowest via-background to-[#150a24]" />
      )}

      <GlowOrb className="z-[1] -left-40 -top-32 h-[480px] w-[480px]" />
      <GlowOrb className="z-[1] -right-24 bottom-0 h-[400px] w-[400px]" color="tertiary" />
      <div className="dot-grid pointer-events-none absolute inset-0 z-[1] opacity-[0.05]" />

      <div
        className={`relative z-10 mx-auto w-full max-w-container-max px-margin-mobile md:px-margin-desktop ${
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
            <Button icon={<NeonIcon name={ctaIcon} neon={false} className="text-xl text-white" />}>{ctaLabel}</Button>
          )}
          {children}

          <div className={`mt-8 ${isCenter ? "flex justify-center" : ""}`}>
            <HeroSocialCard />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
