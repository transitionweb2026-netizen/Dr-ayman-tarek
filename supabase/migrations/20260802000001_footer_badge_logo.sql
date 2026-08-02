-- New premium branding block in the footer (logo + brand name + divider),
-- separate from the existing header/footer logo (logo_media_id) — a
-- dedicated symbol mark the client uploads via Site Settings, same
-- media_assets-backed pattern as logo_media_id/favicon_media_id.
alter table public.site_settings
  add column if not exists footer_badge_media_id uuid references public.media_assets(id);
