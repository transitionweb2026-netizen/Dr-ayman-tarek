"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { NeonIcon } from "@/components/ui/NeonIcon";
import { useLanguage } from "@/i18n/LanguageProvider";
import { toYouTubeEmbedUrl } from "@/lib/youtube";

export interface PlayableVideo {
  id: string; title: string; category: string; duration: string; date: string;
  thumbnail: string; shortDescription: string; description: string; youtubeUrl: string; videoUrl: string | null;
}

/** The lightbox player (thumbnail → uploaded file or YouTube embed, plus
 * details/share/book CTA) shared by every place on the site that lets a
 * visitor play a clinic video in place — the full Videos library grid and
 * the homepage's featured Clinical Video Series — so both open the exact
 * same experience instead of one of them linking out to the other. */
export function VideoPlayerModal({ video: active, onClose }: { video: PlayableVideo | null; onClose: () => void }) {
  const { t, contact } = useLanguage();
  const [playing, setPlaying] = useState(false);
  const [shareConfirmed, setShareConfirmed] = useState(false);
  const embedUrl = active ? toYouTubeEmbedUrl(active.youtubeUrl) : null;
  // An uploaded video file (from the CMS's Video file field) always takes
  // priority over the YouTube fallback when both are set.
  const hasPlayableVideo = Boolean(active?.videoUrl) || Boolean(embedUrl);

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
    <Modal
      open={!!active}
      onClose={() => {
        setPlaying(false);
        setShareConfirmed(false);
        onClose();
      }}
    >
      {active && (
        <>
          <div className="relative mx-auto mt-8 flex aspect-[9/16] w-full max-w-[300px] items-center justify-center overflow-hidden rounded-[28px] shadow-glow-lg">
            {playing && active.videoUrl ? (
              <video src={active.videoUrl} autoPlay controls playsInline className="h-full w-full object-cover" />
            ) : playing && embedUrl ? (
              <iframe
                src={embedUrl}
                title={active.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            ) : (
              <>
                <Image src={active.thumbnail} alt={active.title} fill sizes="300px" className="object-cover" />
                <div className="absolute inset-0 bg-background/50" />
                {hasPlayableVideo ? (
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
              <Button variant="ghost" onClick={handleShare} icon={<NeonIcon name="share" className="text-xl" />}>
                {t("common.share")}
              </Button>
            </div>
            {shareConfirmed && <p className="text-center text-small text-primary">{t("common.linkCopied")}</p>}
          </div>
        </>
      )}
    </Modal>
  );
}
