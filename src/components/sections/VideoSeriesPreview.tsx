"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Stagger, StaggerChild } from "@/components/motion/Stagger";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { BilingualVideo } from "@/server/repositories/content";

interface VideoSeriesPreviewProps {
  videos: BilingualVideo[];
  titleOverride?: string;
}

export function VideoSeriesPreview({ videos, titleOverride }: VideoSeriesPreviewProps) {
  const { language, t } = useLanguage();
  const featured = videos
    .filter((v) => v.featured)
    .slice(0, 3)
    .map((v) => {
      const copy = language === "ar" ? v.ar : v.en;
      return { id: v.slug, title: copy.title, shortDescription: copy.shortDescription, thumbnail: v.thumbnail };
    });

  return (
    <section className="mx-auto max-w-container-max px-margin-mobile pb-section-gap-sm md:px-margin-desktop">
      <SectionHeading title={titleOverride ?? t("home.videoSeries.title")} />
      <Stagger className="grid grid-cols-1 items-start gap-gutter sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((video) => (
          <StaggerChild key={video.id}>
            <Link href="/videos">
              <GlassCard radius="3xl" className="group overflow-hidden">
                <div className="relative aspect-[9/16] overflow-hidden">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-colors group-hover:bg-black/20">
                    {/* Kept white (not full NeonIcon purple) so the glyph stays legible
                        over a video thumbnail — the purple neon glow halo around it is
                        what carries the "neon" treatment here. */}
                    <span className="material-symbols-outlined text-6xl text-white opacity-80 [filter:drop-shadow(0_0_12px_rgba(192,38,255,.6))_drop-shadow(0_0_24px_rgba(192,38,255,.45))] transition-all duration-300 ease-in-out group-hover:scale-[1.08] group-hover:opacity-100 group-hover:[filter:drop-shadow(0_0_12px_rgba(192,38,255,.6))_drop-shadow(0_0_24px_rgba(192,38,255,.45))_drop-shadow(0_0_40px_rgba(192,38,255,.3))]">
                      play_circle
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-card-title text-white">{video.title}</h3>
                  <p className="text-small text-on-surface-variant">{video.shortDescription}</p>
                </div>
              </GlassCard>
            </Link>
          </StaggerChild>
        ))}
      </Stagger>
    </section>
  );
}
