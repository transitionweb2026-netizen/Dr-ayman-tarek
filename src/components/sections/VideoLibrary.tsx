"use client";

import { useState } from "react";
import Image from "next/image";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NeonIcon } from "@/components/ui/NeonIcon";
import { Stagger, StaggerChild } from "@/components/motion/Stagger";
import { useLanguage } from "@/i18n/LanguageProvider";
import { VideoPlayerModal, type PlayableVideo } from "./VideoPlayerModal";
import type { BilingualVideo } from "@/server/repositories/content";

function VideoCard({ video, onSelect }: { video: PlayableVideo; onSelect: () => void }) {
  return (
    <GlassCard as="article" radius="2xl" className="group flex h-full flex-col overflow-hidden text-left rtl:text-right">
      <button onClick={onSelect} className="flex h-full flex-col text-left rtl:text-right">
        <div className="relative aspect-[9/16] overflow-hidden">
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            {/* .icon-badge-neon already animates on :hover, and hovering the parent
                button inherently hovers this nested span too — no separate
                group-hover needed (would just fight the same transform property). */}
            <span className="icon-badge-neon flex h-16 w-16 items-center justify-center rounded-full">
              <NeonIcon name="play_arrow" filled neon={false} className="text-3xl text-white" />
            </span>
          </div>
          <span className="glass absolute left-4 top-4 rounded-full border-primary/20 px-3 py-1 text-small text-primary rtl:left-auto rtl:right-4">
            {video.category}
          </span>
          <span className="absolute bottom-4 right-4 rounded-md bg-background/80 px-2.5 py-1 text-small text-white rtl:right-auto rtl:left-4">
            {video.duration}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="mb-2 text-card-title text-white">{video.title}</h3>
          <p className="text-body text-on-surface-variant">{video.shortDescription}</p>
        </div>
      </button>
    </GlassCard>
  );
}

interface VideoLibraryProps {
  videos: BilingualVideo[];
  titleOverride?: string;
  subtitleOverride?: string;
}

export function VideoLibrary({ videos: bilingualVideos, titleOverride, subtitleOverride }: VideoLibraryProps) {
  const { language, t } = useLanguage();
  const videos: PlayableVideo[] = bilingualVideos.map((v) => {
    const copy = language === "ar" ? v.ar : v.en;
    return {
      id: v.slug, title: copy.title, category: copy.category || "", duration: v.duration || "", date: copy.date,
      thumbnail: v.thumbnail, shortDescription: copy.shortDescription, description: copy.description, youtubeUrl: v.youtubeUrl, videoUrl: v.videoUrl,
    };
  });
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = videos.find((v) => v.id === activeId) ?? null;

  return (
    <section className="mx-auto max-w-container-max px-margin-mobile pt-section-gap-sm pb-section-gap-sm md:px-margin-desktop">
      <SectionHeading title={titleOverride ?? t("videos.library.title")} subtitle={subtitleOverride ?? t("videos.library.subtitle")} />
      <Stagger className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <StaggerChild key={video.id}>
            <VideoCard video={video} onSelect={() => setActiveId(video.id)} />
          </StaggerChild>
        ))}
      </Stagger>

      <VideoPlayerModal video={active} onClose={() => setActiveId(null)} />
    </section>
  );
}
