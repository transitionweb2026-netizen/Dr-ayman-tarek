import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { NeonIcon } from "@/components/ui/NeonIcon";
import { Reveal } from "@/components/motion/Reveal";

interface FinalCtaProps {
  icon?: string;
  heading: string;
  subtitle: string;
  primaryLabel?: string;
  showWhatsapp?: boolean;
}

/** The closing CTA block reused (with different copy) at the bottom of every page. */
export function FinalCta({
  icon = "psychology",
  heading,
  subtitle,
  primaryLabel = "Book Appointment",
  showWhatsapp = true,
}: FinalCtaProps) {
  return (
    <section className="mx-auto mb-20 max-w-container-max px-margin-mobile md:px-margin-desktop">
      <GlassCard
        radius="3xl"
        interactive={false}
        className="flex flex-col items-center gap-6 overflow-hidden border-primary/15 p-margin-mobile text-center shadow-glow-lg lg:flex-row lg:p-section-gap lg:text-left"
      >
        <Reveal scale className="relative z-10 w-full lg:w-1/3">
          <div className="icon-badge-neon mx-auto flex aspect-square w-full max-w-[220px] items-center justify-center rounded-full">
            <NeonIcon name={icon} className="animate-pulse text-[100px]" />
          </div>
        </Reveal>
        <div className="relative z-10 w-full space-y-6 lg:w-2/3">
          <Reveal>
            <h2 className="text-section-title font-bold leading-tight text-white">{heading}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-body-lg text-on-surface-variant">{subtitle}</p>
          </Reveal>
          <Reveal delay={0.16} className="flex w-full flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
            <Button size="lg" className="w-full px-6 py-3.5 shadow-2xl sm:w-auto lg:px-12 lg:py-5">
              {primaryLabel}
            </Button>
            {showWhatsapp && (
              <Button
                variant="whatsapp"
                size="lg"
                className="w-full px-6 py-3.5 sm:w-auto lg:px-12 lg:py-5"
                icon={
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.79.47 3.47 1.29 4.94L2 22l5.29-1.39a9.87 9.87 0 004.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.02c-.24.68-1.4 1.3-1.93 1.38-.49.08-1.11.11-1.79-.11-.41-.13-.94-.3-1.62-.6-2.85-1.23-4.71-4.1-4.85-4.29-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09 1-2.37.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.58.81 2 .88 2.14.07.14.11.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.71 1.17 1.52 1.9 1.05.94 1.93 1.23 2.21 1.37.28.14.44.12.61-.07.16-.19.7-.81.89-1.09.19-.28.38-.23.63-.14.26.09 1.65.78 1.93.92.28.14.47.21.54.33.07.12.07.68-.17 1.36z" />
                  </svg>
                }
              >
                Consult Virtual Assistant
              </Button>
            )}
          </Reveal>
        </div>
      </GlassCard>
    </section>
  );
}
