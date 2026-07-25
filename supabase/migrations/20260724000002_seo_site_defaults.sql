-- Sitewide default title/title-template/description/keywords were still
-- hardcoded in the root layout after the first SEO migration — this closes
-- that gap so the root <title>/<meta description> the whole site falls back
-- to is genuinely CMS-editable, per the "no permanent hardcoding, safe
-- fallbacks only" rule the rest of the SEO system follows.

alter table public.site_settings
  add column default_title_en text,
  add column default_title_ar text,
  add column title_template_en text,
  add column title_template_ar text,
  add column default_description_en text,
  add column default_description_ar text,
  add column default_keywords_en text[] not null default '{}',
  add column default_keywords_ar text[] not null default '{}';
