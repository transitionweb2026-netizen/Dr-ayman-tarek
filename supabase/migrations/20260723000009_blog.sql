-- Blog collection (sidebar top-level CRUD): posts, tags, gallery.

create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_en text not null,
  title_ar text not null,
  excerpt_en text not null default '',
  excerpt_ar text not null default '',
  content_en jsonb not null default '{}'::jsonb,
  content_ar jsonb not null default '{}'::jsonb,
  featured_image_media_id uuid references public.media_assets(id) on delete set null,
  category_en text,
  category_ar text,
  author_name text,
  author_avatar_media_id uuid references public.media_assets(id) on delete set null,
  reading_time_minutes int,
  is_featured boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  seo_title_en text,
  seo_title_ar text,
  seo_description_en text,
  seo_description_ar text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index blog_posts_status_published_idx on public.blog_posts(status, published_at desc);
create index blog_posts_featured_idx on public.blog_posts(is_featured);

create table public.blog_tags (
  id uuid primary key default gen_random_uuid(),
  name_en text not null unique,
  name_ar text not null
);

create table public.blog_post_tags (
  blog_post_id uuid not null references public.blog_posts(id) on delete cascade,
  tag_id uuid not null references public.blog_tags(id) on delete cascade,
  primary key (blog_post_id, tag_id)
);

create table public.blog_post_gallery (
  id uuid primary key default gen_random_uuid(),
  blog_post_id uuid not null references public.blog_posts(id) on delete cascade,
  media_id uuid not null references public.media_assets(id) on delete cascade,
  display_order int not null default 0
);
create index blog_post_gallery_post_id_idx on public.blog_post_gallery(blog_post_id, display_order);

create trigger blog_posts_set_updated_at
  before update on public.blog_posts
  for each row execute function public.set_updated_at();

alter table public.blog_posts enable row level security;
alter table public.blog_tags enable row level security;
alter table public.blog_post_tags enable row level security;
alter table public.blog_post_gallery enable row level security;

create policy "public read published posts"
  on public.blog_posts for select using (status = 'published');
create policy "admin manage posts"
  on public.blog_posts for all using (public.is_admin()) with check (public.is_admin());

create policy "public read tags" on public.blog_tags for select using (true);
create policy "admin manage tags"
  on public.blog_tags for all using (public.is_admin()) with check (public.is_admin());

create policy "public read post tags"
  on public.blog_post_tags for select using (
    exists (select 1 from public.blog_posts p where p.id = blog_post_id and p.status = 'published')
  );
create policy "admin manage post tags"
  on public.blog_post_tags for all using (public.is_admin()) with check (public.is_admin());

create policy "public read post gallery"
  on public.blog_post_gallery for select using (
    exists (select 1 from public.blog_posts p where p.id = blog_post_id and p.status = 'published')
  );
create policy "admin manage post gallery"
  on public.blog_post_gallery for all using (public.is_admin()) with check (public.is_admin());
