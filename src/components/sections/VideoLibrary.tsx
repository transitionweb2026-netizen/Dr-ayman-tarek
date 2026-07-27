"use client";

import { useState } from "react";
import Image from "next/image";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NeonIcon } from "@/components/ui/NeonIcon";
import { Stagger, StaggerChild } from "@/components/motion/Stagger";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { BilingualVideo } from "@/server/repositories/content";

interface Video {
  id: string; title: string; category: string; duration: string; date: string;
  thumbnail: string; shortDescription: string; description: string; youtubeUrl: string;
}

/** Accepts watch/short/embed URL shapes and returns a playable embed URL, or
 * null if the stored value isn't a recognizable YouTube URL (CMS free-text
 * field — never assume it's well-formed). */
function toYouTubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");
    let id: string | null = null;
    if (host === "youtu.be") {
      id = parsed.pathname.slice(1);
    } else if (host === "youtube.com" || host === "m.youtube.com") {
      if (parsed.pathname === "/watch") id = parsed.searchParams.get("v");
      else if (parsed.pathname.startsWith("/embed/")) id = parsed.pathname.split("/")[2];
      else if (parsed.pathname.startsWith("/shorts/")) id = parsed.pathname.split("/")[2];
    }
    return id ? `https://www.youtube.com/embed/${id}?autoplay=1` : null;
  } catch {
    return null;
  }
}

function VideoCard({ video, onSelect }: { video: Video; onSelect: () => void }) {
  return (
    <GlassCard as="article" radius="2xl" className="group flex h-full flex-col overflow-hidden text-left rtl:text-right">
      <button onClick={onSelect} className="flex h-full flex-col text-left rtl:text-right">
        <div className="relative aspect-[9/16] overflow-hidden">
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
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
  const { language, t, contact } = useLanguage();
  const videos: Video[] = bilingualVideos.map((v) => {
    const copy = language === "ar" ? v.ar : v.en;
    return {
      id: v.slug, title: copy.title, category: copy.category || "", duration: v.duration || "", date: copy.date,
      thumbnail: v.thumbnail, shortDescription: copy.shortDescription, description: copy.description, youtubeUrl: v.youtubeUrl,
    };
  });
  const [activeId, setActiveId] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [shareConfirmed, setShareConfirmed] = useState(false);
  const active = videos.find((v) => v.id === activeId) ?? null;
  const embedUrl = active ? toYouTubeEmbedUrl(active.youtubeUrl) : null;

  async function handleShare() {
    if (!active) return;
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({ title: active.title, url: shareUrl });
      } catch {
        /* user cancelled — no-op */
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl);
      setShareConfirmed(true);
      window.setTimeout(() => setShareConfirmed(false), 2500);
    }
  }

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

      <Modal
        open={!!active}
        onClose={() => {
          setActiveId(null);
          setPlaying(false);
          setShareConfirmed(false);
        }}
      >
        {active && (
          <>
            <div className="relative mx-auto mt-8 flex aspect-[9/16] w-full max-w-[300px] items-center justify-center overflow-hidden rounded-[28px] shadow-glow-lg">
              {playing && embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={active.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              ) : (
                <>
                  <Image src={active.thumbnail} alt={active.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-background/50" />
                  {embedUrl ? (
                    <button
                      onClick={() => setPlaying(true)}
                      aria-label={t("common.playVideo")}
                      className="icon-badge-neon relative z-10 flex h-20 w-20 items-center justify-center rounded-full"
                    >
                      <NeonIcon name="play_arrow" filled neon={false} className="text-4xl text-white" />
                    </button>
                  ) : active.youtubeUrl ? (
                    <a
                      href={active.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t("common.watchOnYoutube")}
                      className="icon-badge-neon relative z-10 flex h-20 w-20 items-center justify-center rounded-full"
                    >
                      <NeonIcon name="play_arrow" filled neon={false} className="text-4xl text-white" />
                    </a>
                  ) : (
                    // No video URL configured in the CMS at all — disable
                    // gracefully instead of rendering a link to nowhere.
                    <span
                      aria-label={t("common.comingSoon")}
                      role="img"
                      className="icon-badge-neon relative z-10 flex h-20 w-20 cursor-not-allowed items-center justify-center rounded-full opacity-40"
                    >
                      <NeonIcon name="play_arrow" filled neon={false} className="text-4xl text-white" />
                    </span>
                  )}
                </>
              )}
            </div>
            <div className="space-y-5 p-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-small text-primary">
                  {active.category}
                </span>
                <span className="text-small text-on-surface-variant">{active.date}</span>
                <span className="text-small text-on-surface-variant">•</span>
                <span className="text-small text-on-surface-variant">{active.duration}</span>
              </div>
              <h3 className="text-section-title text-white">{active.title}</h3>
              <p className="text-body-lg text-on-surface-variant">{active.description}</p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button href={contact.bookingHref} className="min-w-[180px] flex-1">{t("common.bookAppointment")}</Button>
                <Button
                  variant="ghost"
                  onClick={handleShare}
                  icon={<NeonIcon name="share" className="text-xl" />}
                >
                  {t("common.share")}
                </Button>
              </div>
              {shareConfirmed && <p className="text-center text-small text-primary">{t("common.linkCopied")}</p>}
            </div>
          </>
        )}
      </Modal>
    </section>
  );
}
