import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Stagger, StaggerChild } from "@/components/motion/Stagger";
import { VIDEOS } from "@/data/videos";

export function VideoSeriesPreview() {
  const featured = VIDEOS.slice(0, 3);

  return (
    <section className="mx-auto max-w-container-max px-margin-mobile pb-section-gap-sm md:px-margin-desktop">
      <SectionHeading title="Clinical Video Series" />
      <Stagger className="grid grid-cols-1 gap-gutter md:grid-cols-3">
        {featured.map((video) => (
          <StaggerChild key={video.id}>
            <Link href="/videos">
              <GlassCard radius="3xl" className="group overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-colors group-hover:bg-black/20">
                    <span className="material-symbols-outlined text-6xl text-white opacity-80 drop-shadow-[0_0_25px_rgba(196,61,255,0.7)] transition-all group-hover:scale-110 group-hover:opacity-100">
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
