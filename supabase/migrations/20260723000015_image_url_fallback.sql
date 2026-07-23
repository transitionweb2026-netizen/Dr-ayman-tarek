-- Adds a plain-URL fallback alongside each image_media_id FK. Existing
-- content (services/specialties/videos/blog) used external/local image URLs
-- predating the Media Library; rather than force-migrating every one of
-- those into Storage right now, both fields coexist — the app prefers
-- image_media_id (resolved via Media Library) and falls back to image_url
-- when the media hasn't been replaced through the CMS yet. New uploads
-- through the admin always go through image_media_id.

alter table public.services add column image_url text;
alter table public.specialties add column image_url text;
alter table public.videos add column thumbnail_url text;
alter table public.blog_posts add column featured_image_url text;
