"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonIcon } from "@/components/ui/NeonIcon";
import { HolographicBrain } from "@/components/decor/HolographicBrain";
import { HolographicSpine } from "@/components/decor/HolographicSpine";
import { ParticleField } from "@/components/decor/ParticleField";
import { GlowOrb } from "@/components/decor/GlowOrb";
import { MouseParallax } from "@/components/motion/Parallax";
import { HeroSocialCard } from "@/components/sections/HeroSocialCard";

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCzisrET4Qkk8YLXGhJ2mVo7nKTWW63hoguCebr-wvWBiXwpBJCiMlxUIeY5UZjBMIo_6euqQYrIjaosvUv3eFdDQM3CvsV_XbLZcyymmvgQFyZfgFDW2OrQVXrD-Z2Q5eZ0pUi5c0_quGDB2PhTRff6XEfa35aYt2iTFghaDbo-OS8YixuEWh-6KrSyqJgSHDtlYajwgDYJolToQH1MvTWYbjrIvgsOGpPbIfnGk2q6zdT69oefoMw";

const AVATARS = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCm5F_KClouvmKWx93nUbO6JYr4zCLdMn0h3bcl7xULyL7yjuq094yBSRl10k38bGrsF1T4CujvU4gXocmx37Ni-K7byWs0j8lbhIQqs7LwDi2ObwUG81F5LMA_rQfpiqZNXK-v4Ne4dcmgUmPb5HEl7DNkIrK5gEFViyOia2cDf0grk4bu0Qx8DJh79V_gbH7YMkYa2SP5aqzW0YeacUq_dgiY4oGjtqT52wvR0eTz-J8UtHMYDoaP",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAlGcFmIlF87TrBs_znOexITwuddllOInrNPuJ-60UGAnDd_zC1fzYeU-dZgEFh4YTb5-dcZ0y4cOkFcRp-oU1_-TdXzRIZtvcJmvNo0Sg4ba54bu6VByiHtHdi9-gwPONW1oT_Jjz8_NPTjpQ4bCfQTjefkHLgq9aIIJqTMOTYDsFH3qFDfsUhHioiHplOFw9yh6Q7GelrVxmlHoszUzDoc-5go9vWrK1UhfmKenN-kdh3res12AOR",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCFmLdF0PeA-Hu7BCZev7CfkgSh21k-pdy7TTyM33p0pkURQBllrCRkyADxLMdkJ6vvuRRIzw6ncPy45pXooC0PBgyC4A_SLfRZKC5508vFwEcspjTQo27u-FmNWeWqIwe1LugRDjSj72CFLPB7Ip-HQs8C3uDvSQixZlnHR3TO_yAAtdq2YuZbIwB2moMCL8Fy3E-qxMjxZklKcAqumfvLfYHmwixicxsxHmJkQQHsSz6qtZQNtutD",
];

export function HomeHero() {
  return (
    <section className="relative flex min-h-[82vh] flex-col items-center justify-center overflow-hidden pb-10 pt-20 lg:min-h-[700px]">
      {/* Full-bleed background artwork */}
      <div className="absolute inset-0 z-0">
        <Image src={HERO_IMAGE} alt="Dr. Ayman Tarek, neurosurgeon" fill priority className="object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
        {/* Below lg this same photo is also the dedicated mobile portrait
            further down, so the ambient background version needs to read as
            a faint backdrop, not a second competing face. */}
        <div className="absolute inset-0 bg-background/70 lg:hidden" />
      </div>

      <GlowOrb className="z-[1] -left-52 -top-32 h-[600px] w-[600px]" />
      <GlowOrb className="z-[1] -right-24 top-1/4 h-[480px] w-[480px]" color="tertiary" />
      <div className="dot-grid pointer-events-none absolute inset-0 z-[1] opacity-[0.05]" />

      <div className="relative z-10 w-full px-margin-mobile md:px-8 lg:px-12">
        <div className="max-w-xl space-y-7">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="eyebrow shadow-glow"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary shadow-[0_0_10px_rgba(196,61,255,0.8)]" />
            Global Excellence in Neurosurgery
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-hero text-white"
          >
            Precision Surgery.
            <br />
            <span className="text-gradient-brand">Life Reimagined.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-lg text-body-lg text-on-surface-variant"
          >
            Advanced neurological care combining robotic precision with deep clinical expertise. We specialize in
            complex spinal disorders and neuro-oncology.
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
              Start Patient Journey
            </Button>
            <Button
              variant="ghost"
              className="w-full sm:w-auto"
              icon={<NeonIcon name="play_circle" filled className="text-xl" />}
            >
              Watch Procedures
            </Button>
          </motion.div>

          {/* Doctor portrait — mobile only. On lg+ the same photo already
              carries the whole section as a full-bleed background, so this
              dedicated frame exists purely to give it real visual presence
              on narrow screens instead of staying a dim backdrop. */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-[32px] border border-primary/15 shadow-glow-lg lg:hidden"
          >
            <Image
              src={HERO_IMAGE}
              alt="Dr. Ayman Tarek, neurosurgeon"
              fill
              sizes="(max-width: 1024px) 320px"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-5">
              <span className="icon-badge-neon flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
                <NeonIcon name="verified" filled className="text-base" />
              </span>
              <div>
                <p className="text-body-lg font-bold text-white">Dr. Ayman Tarek</p>
                <p className="text-small text-on-surface-variant">Neurosurgeon, WFNS Fellow</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex items-center justify-center gap-6 pt-4 sm:justify-start"
          >
            <div className="flex -space-x-3">
              {AVATARS.map((src) => (
                <div key={src} className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-background">
                  <Image src={src} alt="" fill className="object-cover" sizes="48px" />
                </div>
              ))}
            </div>
            <div>
              <p className="text-card-title font-bold text-white">5,000+</p>
              <p className="text-small text-on-surface-variant">Recovered Patients</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating hero cards — Board Certified + Connect With Us. Normal-flow
          stack below the content on mobile/tablet; absolutely positioned
          beside the doctor's image (right side) once there's room at lg. */}
      <div className="relative z-10 mt-10 flex w-full flex-col items-center gap-5 px-margin-mobile md:px-8 lg:pointer-events-none lg:absolute lg:inset-0 lg:mt-0 lg:block lg:px-0">
        <div className="w-full max-w-xs animate-float-y lg:pointer-events-auto lg:absolute lg:right-[5%] lg:top-[14%] lg:w-64">
          <GlassCard radius="xl" className="p-5 shadow-glow">
            <NeonIcon name="verified" filled className="mb-2 text-3xl" />
            <h3 className="mb-1 text-card-title text-white">Board Certified</h3>
            <p className="text-small text-on-surface-variant">WFNS Distinguished Surgical Fellow</p>
          </GlassCard>
        </div>

        <div className="w-full max-w-xs lg:pointer-events-auto lg:absolute lg:bottom-[8%] lg:right-[5%]">
          <HeroSocialCard />
        </div>
      </div>

      {/* Holographic overlay layer — brain, spine, rings, particles, HUD */}
      <div className="pointer-events-none absolute inset-0 z-[5] hidden lg:block">
        <MouseParallax strength={10}>
          <div className="absolute left-[45%] top-[45%] h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-primary/30" />
        </MouseParallax>
        <div className="absolute left-[45%] top-[45%] h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 animate-spin-slow-rev rounded-full border border-tertiary/20" />

        <HolographicBrain className="absolute left-[36%] top-[10%] h-[72%] w-[19%]" />
        <HolographicSpine className="absolute right-[1%] top-[8%] h-[80%] w-[10%]" />

        <div className="icon-badge-neon absolute left-[63%] top-[6%] flex h-14 w-14 animate-float-y items-center justify-center rounded-full">
          <NeonIcon name="monitor_heart" className="text-2xl" />
        </div>
        <div
          className="icon-badge-neon absolute bottom-[18%] left-[68%] flex h-14 w-14 animate-float-y items-center justify-center rounded-full"
          style={{ animationDelay: "1.6s" }}
        >
          <NeonIcon name="graphic_eq" className="text-3xl" />
        </div>

        <ParticleField
          count={8}
          className="absolute inset-0"
        />
      </div>
    </section>
  );
}
