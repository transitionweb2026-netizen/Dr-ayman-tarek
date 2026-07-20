"use client";

import { useState } from "react";
import Image from "next/image";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerChild } from "@/components/motion/Stagger";
import { VIDEOS, type Video } from "@/data/videos";

function VideoCard({ video, onSelect }: { video: Video; onSelect: () => void }) {
  return (
    <GlassCard as="article" radius="2xl" className="group flex h-full flex-col overflow-hidden text-left">
      <button onClick={onSelect} className="flex h-full flex-col text-left">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/50 bg-primary/20 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/35 group-hover:shadow-glow-lg">
              <span className="material-symbols-outlined fill-icon text-3xl text-white">play_arrow</span>
            </span>
          </div>
          <span className="glass absolute left-4 top-4 rounded-full border-primary/20 px-3 py-1 text-small text-primary">
            {video.category}
          </span>
          <span className="absolute bottom-4 right-4 rounded-md bg-background/80 px-2.5 py-1 text-small text-white">
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

export function VideoLibrary() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [shareConfirmed, setShareConfirmed] = useState(false);
  const active = VIDEOS.find((v) => v.id === activeId) ?? null;

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
      <SectionHeading
        title="Video Library"
        subtitle="Short, clear explanations of common neurological conditions and treatments — straight from Dr. Ayman Tarek's clinical practice."
      />
      <Stagger className="grid grid-cols-1 gap-gutter md:grid-cols-3">
        {VIDEOS.map((video) => (
          <StaggerChild key={video.id}>
            <VideoCard video={video} onSelect={() => setActiveId(video.id)} />
          </StaggerChild>
        ))}
      </Stagger>

      <Modal
        open={!!active}
        onClose={() => {
          setActiveId(null);
          setShareConfirmed(false);
        }}
      >
        {active && (
          <>
            <div className="relative flex aspect-video items-center justify-center bg-cover bg-center">
              <Image src={active.thumbnail} alt={active.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-background/50" />
              <button className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-primary/50 bg-primary/20 backdrop-blur-md transition-transform hover:scale-110 hover:shadow-glow-lg">
                <span className="material-symbols-outlined fill-icon text-4xl text-white">play_arrow</span>
              </button>
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
                <Button className="min-w-[180px] flex-1">Book Appointment</Button>
                <Button
                  variant="ghost"
                  onClick={handleShare}
                  icon={<span className="material-symbols-outlined text-xl text-primary">share</span>}
                >
                  Share
                </Button>
              </div>
              {shareConfirmed && <p className="text-center text-small text-primary">Link copied to clipboard.</p>}
            </div>
          </>
        )}
      </Modal>
    </section>
  );
}
