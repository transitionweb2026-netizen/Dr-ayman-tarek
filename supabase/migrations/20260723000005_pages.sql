-- The 6 structured pages. `page_sections.content` holds {"en": {...}, "ar":
-- {...}} per section — one DB row per page+section, one query returns both
-- languages at once (see the plan's "bilingual-prefetch" pattern), keeping
-- the client-side instant language switch working with zero new fetches.

create table public.pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug in ('home', 'dr-ayman-tarek', 'services', 'videos', 'blog', 'contact')),
  updated_at timestamptz not null default now()
);

insert into public.pages (slug) values
  ('home'), ('dr-ayman-tarek'), ('services'), ('videos'), ('blog'), ('contact')
on conflict (slug) do nothing;

create table public.page_sections (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references public.pages(id) on delete cascade,
  section_key text not null,
  display_order int not null default 0,
  is_visible boolean not null default true,
  status text not null default 'published' check (status in ('draft', 'published')),
  content jsonb not null default '{"en": {}, "ar": {}}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.admin_profiles(id) on delete set null,
  unique (page_id, section_key)
);
create index page_sections_page_id_idx on public.page_sections(page_id, display_order);

create trigger page_sections_set_updated_at
  before update on public.page_sections
  for each row execute function public.set_updated_at();

create table public.page_seo (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null unique references public.pages(id) on delete cascade,
  seo_title_en text,
  seo_title_ar text,
  seo_description_en text,
  seo_description_ar text,
  keywords_en text[] not null default '{}',
  keywords_ar text[] not null default '{}',
  canonical_url text,
  og_image_media_id uuid references public.media_assets(id) on delete set null,
  twitter_image_media_id uuid references public.media_assets(id) on delete set null,
  schema_jsonld jsonb,
  updated_at timestamptz not null default now()
);

create trigger page_seo_set_updated_at
  before update on public.page_seo
  for each row execute function public.set_updated_at();

alter table public.pages enable row level security;
alter table public.page_sections enable row level security;
alter table public.page_seo enable row level security;

create policy "public read pages" on public.pages for select using (true);
create policy "admin manage pages" on public.pages for all using (public.is_admin()) with check (public.is_admin());

create policy "public read published sections"
  on public.page_sections for select using (status = 'published' and is_visible = true);
create policy "admin manage sections"
  on public.page_sections for all using (public.is_admin()) with check (public.is_admin());

create policy "public read seo" on public.page_seo for select using (true);
create policy "admin manage seo" on public.page_seo for all using (public.is_admin()) with check (public.is_admin());
