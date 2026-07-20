"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonIcon } from "@/components/ui/NeonIcon";
import type { ReactNode } from "react";

const DEFAULT_VIDEO_THUMB =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDT02aCXBfYCWE8rbwfhuNv_I8eAL7C0AlQUQu0RKPoG3OhOWu6zfPyjGgq6Qkpe2JmNyY7TwRfJL6EBx4DbAF4W2hmpO-4Ry2B7rM4AjafcZGL2IeszWF0bwHj5d_PD_XKC75OpP0uK1lA7CfiRyYNqh3dbKtKci2TnVpbQke6eRod8-2rocqS6KQ8U-UHLgPOjFc8QUlrxDDOZSwI70YJB9TE252FVlkjWd77tdI5MWTU1lFV_yb9";

interface AboutPreviewProps {
  title: string;
  videoCaption?: string;
  videoImage?: string;
  children: ReactNode;
  cta?: ReactNode;
}

/** Video-left / bio-right section — used on Home (short) and About (extended). */
export function AboutPreview({
  title,
  videoCaption = "Surgical Methodology Overview",
  videoImage = DEFAULT_VIDEO_THUMB,
  children,
  cta,
}: AboutPreviewProps) {
  return (
    <section className="mx-auto grid max-w-container-max grid-cols-1 items-center gap-10 px-margin-mobile pt-section-gap-sm md:px-margin-desktop lg:grid-cols-[1.55fr_1fr] lg:gap-12">
      <Reveal direction="left" className="group relative">
        <div className="absolute -inset-4 rounded-3xl bg-primary/15 blur-3xl transition-all duration-700 group-hover:bg-primary/25" />
        <GlassCard radius="3xl" interactive={false} className="relative flex aspect-video items-center justify-center overflow-hidden">
          <Image src={videoImage} alt="" fill className="object-cover opacity-40 transition-transform duration-700 group-hover:scale-105" />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border border-primary/50 bg-primary/20 backdrop-blur-md shadow-glow-lg"
          >
            <NeonIcon name="play_arrow" filled className="text-5xl" />
          </motion.button>
          <div className="absolute bottom-6 left-6 flex items-center gap-3">
            <div className="icon-badge-neon flex h-10 w-10 items-center justify-center rounded-full">
              <NeonIcon name="visibility" className="text-sm" />
            </div>
            <span className="text-small text-white">{videoCaption}</span>
          </div>
        </GlassCard>
      </Reveal>

      <div className="space-y-7">
        <Reveal>
          <h2 className="text-section-title text-white">{title}</h2>
        </Reveal>
        <div className="space-y-4">{children}</div>
        {cta && <Reveal delay={0.16}>{cta}</Reveal>}
      </div>
    </section>
  );
}
