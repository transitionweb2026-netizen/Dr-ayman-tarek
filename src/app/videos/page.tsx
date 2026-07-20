import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { VideoLibrary } from "@/components/sections/VideoLibrary";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = { title: "Videos" };

export default function VideosPage() {
  return (
    <>
      <PageHero
        eyebrow="Patient Resources"
        title="Videos"
        subtitle="Educational Videos & Patient Resources"
        ctaLabel="Book Now"
      />
      <VideoLibrary />
      <FinalCta
        heading="Ready to Take the First Step Toward Better Health?"
        subtitle="Schedule a consultation with Dr. Ayman Tarek and get a clear, expert plan built around your diagnosis."
      />
    </>
  );
}
