-- Storage bucket for the Media Library. Public read (site images/videos need
-- to load for anonymous visitors); writes require an admin.

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "public read media bucket"
  on storage.objects for select
  using (bucket_id = 'media');

create policy "admin insert media bucket"
  on storage.objects for insert
  with check (bucket_id = 'media' and public.is_admin());

create policy "admin update media bucket"
  on storage.objects for update
  using (bucket_id = 'media' and public.is_admin())
  with check (bucket_id = 'media' and public.is_admin());

create policy "admin delete media bucket"
  on storage.objects for delete
  using (bucket_id = 'media' and public.is_admin());
