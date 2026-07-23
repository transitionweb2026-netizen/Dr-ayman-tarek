-- Videos collection (sidebar top-level CRUD).

create table public.videos (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_en text not null,
  title_ar text not null,
  short_description_en text not null default '',
  short_description_ar text not null default '',
  description_en text not null default '',
  description_ar text not null default '',
  thumbnail_media_id uuid references public.media_assets(id) on delete set null,
  youtube_url text not null default '',
  duration text,
  category_en text,
  category_ar text,
  is_featured boolean not null default false,
  display_order int not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index videos_status_order_idx on public.videos(status, display_order);
create index videos_featured_idx on public.videos(is_featured);

create trigger videos_set_updated_at
  before update on public.videos
  for each row execute function public.set_updated_at();

alter table public.videos enable row level security;
create policy "public read published videos"
  on public.videos for select using (status = 'published');
create policy "admin manage videos"
  on public.videos for all using (public.is_admin()) with check (public.is_admin());
