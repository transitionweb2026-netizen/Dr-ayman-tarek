import { GlassCard } from "@/components/ui/GlassCard";
import { Counter } from "@/components/ui/Counter";
import { Stagger, StaggerChild } from "@/components/motion/Stagger";

export interface Stat {
  icon: string;
  value: number;
  suffix: string;
  label: string;
}

const DEFAULT_STATS: Stat[] = [
  { icon: "workspace_premium", value: 20, suffix: "+", label: "Years Expertise" },
  { icon: "medical_services", value: 8000, suffix: "+", label: "Surgeries Done" },
  { icon: "favorite", value: 98, suffix: "%", label: "Success Rate" },
  { icon: "support_agent", value: 24, suffix: "/7", label: "Critical Care" },
];

/** Reused on Home (as the hero-overlapping strip) and About (inline). */
export function StatsStrip({ stats = DEFAULT_STATS, overlap = false }: { stats?: Stat[]; overlap?: boolean }) {
  return (
    <section className={overlap ? "relative z-20 -mt-10" : "relative"}>
      <div className="mx-auto max-w-[1920px] px-6 md:px-14">
        <GlassCard radius="3xl" interactive={false} className="w-full px-gutter py-10 shadow-glow">
          <Stagger className="grid grid-cols-2 gap-6 text-center md:grid-cols-4" gap={0.08}>
            {stats.map((stat) => (
              <StaggerChild key={stat.label} className="flex flex-col items-center gap-3">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl glass border-primary/20">
                  <span className="material-symbols-outlined text-3xl text-primary drop-shadow-[0_0_10px_rgba(196,61,255,0.6)]">
                    {stat.icon}
                  </span>
                </span>
                <p className="text-[36px] font-bold leading-none text-white">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-micro uppercase tracking-widest text-on-surface-variant">{stat.label}</p>
              </StaggerChild>
            ))}
          </Stagger>
        </GlassCard>
      </div>
    </section>
  );
}
