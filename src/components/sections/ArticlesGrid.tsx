import Image from "next/image";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonIcon } from "@/components/ui/NeonIcon";
import { Stagger, StaggerChild } from "@/components/motion/Stagger";
import type { BlogArticle } from "@/data/blog";

function BlogArticleCard({ article }: { article: BlogArticle }) {
  return (
    <GlassCard radius="2xl" className="group flex flex-col overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-primary/20 bg-background/70 px-3 py-1 text-small text-primary backdrop-blur-md">
          {article.category}
        </span>
      </div>
      <div className="flex flex-col p-6">
        <div className="mb-3 flex items-center gap-3 text-xs text-on-surface-variant">
          <span>{article.date}</span>
          <span>•</span>
          <span>{article.readingTime}</span>
        </div>
        <h3 className="mb-2 text-card-title text-white">{article.title}</h3>
        <p className="line-clamp-3 text-body text-on-surface-variant">{article.excerpt}</p>
        <a href="#" className="mt-4 flex items-center gap-2 text-small text-primary">
          Read More <NeonIcon name="arrow_forward" className="text-sm" />
        </a>
      </div>
    </GlassCard>
  );
}

/** Responsive grid of blog article cards — same premium card treatment used site-wide. */
export function ArticlesGrid({ articles }: { articles: BlogArticle[] }) {
  return (
    <Stagger className="grid grid-cols-1 items-start gap-gutter sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <StaggerChild key={article.id}>
          <BlogArticleCard article={article} />
        </StaggerChild>
      ))}
    </Stagger>
  );
}
