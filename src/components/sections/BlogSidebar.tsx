import Image from "next/image";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonIcon } from "@/components/ui/NeonIcon";
import { Reveal } from "@/components/motion/Reveal";
import type { BlogArticle } from "@/data/blog";

const CATEGORIES = [
  { name: "Brain Surgery", count: 8 },
  { name: "Spine Surgery", count: 6 },
  { name: "Robotic Neurosurgery", count: 5 },
  { name: "Epilepsy Surgery", count: 4 },
  { name: "AI in Neurosurgery", count: 4 },
  { name: "Recovery", count: 7 },
];

/** Premium glass sidebar — search, categories, popular/recent posts, newsletter. */
export function BlogSidebar({ articles }: { articles: BlogArticle[] }) {
  const popular = articles.slice(0, 3);
  const recent = articles.slice(0, 4);

  return (
    <div className="space-y-6">
      <Reveal>
        <GlassCard radius="2xl" interactive={false} className="p-6">
          <div className="relative">
            <input
              type="search"
              placeholder="Search articles..."
              className="w-full rounded-full border border-outline-variant/30 bg-surface-container px-5 py-3 pr-12 text-white placeholder-on-surface-variant/40 outline-none transition-shadow focus:border-primary focus:shadow-glow"
            />
            <NeonIcon name="search" className="absolute right-4 top-1/2 -translate-y-1/2 text-xl" />
          </div>
        </GlassCard>
      </Reveal>

      <Reveal delay={0.05}>
        <GlassCard radius="2xl" interactive={false} className="p-6">
          <h3 className="mb-5 text-card-title text-white">Categories</h3>
          <ul className="space-y-3">
            {CATEGORIES.map((category) => (
              <li key={category.name}>
                <a
                  href="#"
                  className="flex items-center justify-between text-body text-on-surface-variant transition-colors hover:text-primary"
                >
                  <span>{category.name}</span>
                  <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-small text-primary">
                    {category.count}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </GlassCard>
      </Reveal>

      <Reveal delay={0.1}>
        <GlassCard radius="2xl" interactive={false} className="p-6">
          <h3 className="mb-5 text-card-title text-white">Popular Articles</h3>
          <ul className="space-y-4">
            {popular.map((article) => (
              <li key={article.id}>
                <a href="#" className="group flex items-center gap-3">
                  <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={article.image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </span>
                  <span className="line-clamp-2 text-small font-bold text-white transition-colors group-hover:text-primary">
                    {article.title}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </GlassCard>
      </Reveal>

      <Reveal delay={0.15}>
        <GlassCard radius="2xl" interactive={false} className="p-6">
          <h3 className="mb-5 text-card-title text-white">Recent Posts</h3>
          <ul className="space-y-3">
            {recent.map((article) => (
              <li key={article.id} className="border-b border-white/5 pb-3 last:border-0 last:pb-0">
                <a href="#" className="block text-small text-white transition-colors hover:text-primary">
                  {article.title}
                </a>
                <span className="mt-1 block text-xs text-on-surface-variant">{article.date}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </Reveal>

      <Reveal delay={0.2}>
        <GlassCard radius="2xl" interactive={false} className="p-6 shadow-glow">
          <h3 className="mb-2 text-card-title text-white">Stay Informed</h3>
          <p className="mb-4 text-small text-on-surface-variant">
            Get the latest neurosurgery insights delivered to your inbox.
          </p>
          <div className="relative">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full rounded-full border border-outline-variant/30 bg-surface-container px-6 py-3 text-white placeholder-on-surface-variant/40 outline-none transition-shadow focus:border-primary focus:shadow-glow"
            />
            <button
              aria-label="Subscribe"
              className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full btn-primary"
            >
              <span className="material-symbols-outlined text-sm text-white">send</span>
            </button>
          </div>
        </GlassCard>
      </Reveal>
    </div>
  );
}
