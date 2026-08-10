-- Lets the CMS attach an uploaded video file (Storage/media_assets) to a
-- video record, alongside the existing youtube_url field. Both coexist —
-- the app prefers the uploaded file when present and falls back to the
-- YouTube embed otherwise — same "media_id + legacy fallback" pattern as
-- image_url_fallback.sql, so existing video rows keep working unchanged
-- until an admin uploads a file through the new control.

alter table public.videos
  add column video_media_id uuid references public.media_assets(id) on delete set null;

create index videos_video_media_id_idx on public.videos(video_media_id);
