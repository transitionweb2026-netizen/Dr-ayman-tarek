-- Global site settings (singleton row) + navigation links (header + the two
-- footer link groups). Everything here is public-read (it renders on every
-- page) and admin-write only.

create table public.site_settings (
  id smallint primary key default 1 check (id = 1),
  doctor_name_en text not null default '',
  doctor_name_ar text not null default '',
  clinic_name_en text not null default '',
  clinic_name_ar text not null default '',
  logo_media_id uuid references public.media_assets(id) on delete set null,
  favicon_media_id uuid references public.media_assets(id) on delete set null,
  phone text not null default '',
  whatsapp text not null default '',
  emergency_phone text not null default '',
  email text not null default '',
  address_en text not null default '',
  address_ar text not null default '',
  business_hours jsonb not null default '{}'::jsonb,
  social_links jsonb not null default '[]'::jsonb,
  google_maps_embed_url text,
  google_maps_address_en text,
  google_maps_address_ar text,
  ga_measurement_id text,
  google_ads_id text,
  gtm_container_id text,
  meta_pixel_id text,
  footer_description_en text not null default '',
  footer_description_ar text not null default '',
  footer_copyright_en text not null default '',
  footer_copyright_ar text not null default '',
  updated_at timestamptz not null default now(),
  updated_by uuid references public.admin_profiles(id) on delete set null
);

insert into public.site_settings (id) values (1) on conflict (id) do nothing;

create trigger site_settings_set_updated_at
  before update on public.site_settings
  for each row execute function public.set_updated_at();

alter table public.site_settings enable row level security;
create policy "public read site settings"
  on public.site_settings for select using (true);
create policy "admin update site settings"
  on public.site_settings for update using (public.is_admin()) with check (public.is_admin());

create table public.nav_links (
  id uuid primary key default gen_random_uuid(),
  label_en text not null,
  label_ar text not null,
  href text not null,
  location text not null check (location in ('header', 'footer_expertise', 'footer_journey')),
  display_order int not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index nav_links_location_idx on public.nav_links(location, display_order);

create trigger nav_links_set_updated_at
  before update on public.nav_links
  for each row execute function public.set_updated_at();

alter table public.nav_links enable row level security;
create policy "public read visible nav links"
  on public.nav_links for select using (is_visible = true);
create policy "admin manage nav links"
  on public.nav_links for all using (public.is_admin()) with check (public.is_admin());
