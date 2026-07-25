-- Enterprise SEO field extensions: focus keyword, split OG/Twitter copy,
-- per-page robots + schema toggles on page_seo; the same fields on
-- blog_posts for per-article parity; and site-wide verification/analytics/
-- structured-address fields on site_settings for LocalBusiness JSON-LD and
-- search-engine verification meta tags. All nullable/defaulted so existing
-- rows keep working with zero data migration.

alter table public.page_seo
  add column focus_keyword_en text,
  add column focus_keyword_ar text,
  add column og_title_en text,
  add column og_title_ar text,
  add column og_description_en text,
  add column og_description_ar text,
  add column twitter_title_en text,
  add column twitter_title_ar text,
  add column twitter_description_en text,
  add column twitter_description_ar text,
  add column robots_index boolean not null default true,
  add column robots_follow boolean not null default true,
  add column schema_enabled boolean not null default true;

alter table public.blog_posts
  add column focus_keyword_en text,
  add column focus_keyword_ar text,
  add column keywords_en text[] not null default '{}',
  add column keywords_ar text[] not null default '{}',
  add column canonical_url text,
  add column og_title_en text,
  add column og_title_ar text,
  add column og_description_en text,
  add column og_description_ar text,
  add column og_image_media_id uuid references public.media_assets(id) on delete set null,
  add column twitter_title_en text,
  add column twitter_title_ar text,
  add column twitter_description_en text,
  add column twitter_description_ar text,
  add column twitter_image_media_id uuid references public.media_assets(id) on delete set null,
  add column robots_index boolean not null default true,
  add column robots_follow boolean not null default true,
  add column schema_enabled boolean not null default true;

alter table public.site_settings
  add column google_site_verification text,
  add column bing_site_verification text,
  add column yandex_site_verification text,
  add column ms_clarity_id text,
  add column twitter_handle text,
  add column default_og_image_media_id uuid references public.media_assets(id) on delete set null,
  add column default_twitter_image_media_id uuid references public.media_assets(id) on delete set null,
  add column address_street_en text,
  add column address_street_ar text,
  add column address_city_en text,
  add column address_city_ar text,
  add column address_region_en text,
  add column address_region_ar text,
  add column address_postal_code text,
  add column address_country_en text,
  add column address_country_ar text,
  add column geo_latitude numeric,
  add column geo_longitude numeric;
