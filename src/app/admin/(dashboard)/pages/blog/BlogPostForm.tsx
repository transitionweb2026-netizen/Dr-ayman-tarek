"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import type { JSONContent } from "@tiptap/react";
import { X, Plus, ImageOff } from "lucide-react";
import { AdminButton } from "@/components/admin/ui/Button";
import { AdminCard, PageHeader } from "@/components/admin/ui/Card";
import { BilingualField, FieldGroup, TextField, ToggleField } from "@/components/admin/ui/Field";
import { MediaPickerField, MediaPickerDialog } from "@/components/admin/ui/MediaPicker";
import { BilingualRichText } from "@/components/admin/ui/RichTextEditor";
import { createClient } from "@/lib/supabase/client";
import { getPublicMediaUrl } from "@/lib/supabase/storage";
import { slugify } from "@/lib/slugify";
import { blogHooks, useAllTags, usePostTags, usePostGallery, useSavePostTags, useSavePostGallery, type BlogPost } from "@/hooks/useBlog";
import { VersionHistoryButton } from "@/components/admin/ui/VersionHistory";
import type { MediaAsset } from "@/hooks/useMediaLibrary";
import { cn } from "@/lib/utils";

function useMediaAssetById(id: string | null) {
  return useQuery({
    queryKey: ["media-assets", "byId", id],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("media_assets").select("*").eq("id", id as string).maybeSingle();
      if (error) throw error;
      return data as MediaAsset | null;
    },
    enabled: Boolean(id),
  });
}

const emptyContent: JSONContent = { type: "doc", content: [{ type: "paragraph" }] };

const emptyForm = {
  slug: "",
  title_en: "",
  title_ar: "",
  excerpt_en: "",
  excerpt_ar: "",
  featured_image_media_id: null as string | null,
  category_en: "",
  category_ar: "",
  author_name: "",
  reading_time_minutes: "" as string | number,
  is_featured: false,
  status: "draft" as "draft" | "published",
  seo_title_en: "",
  seo_title_ar: "",
  seo_description_en: "",
  seo_description_ar: "",
};

export function BlogPostForm({ post }: { post: BlogPost | null }) {
  const router = useRouter();
  const [form, setForm] = useState(emptyForm);
  const [slugTouched, setSlugTouched] = useState(Boolean(post));
  const [contentEn, setContentEn] = useState<JSONContent>(emptyContent);
  const [contentAr, setContentAr] = useState<JSONContent>(emptyContent);
  const [featuredImage, setFeaturedImage] = useState<MediaAsset | null>(null);
  const [tagNames, setTagNames] = useState<{ name_en: string; name_ar: string }[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [gallery, setGallery] = useState<MediaAsset[]>([]);
  const [galleryPickerOpen, setGalleryPickerOpen] = useState(false);

  const create = blogHooks.useCreate();
  const update = blogHooks.useUpdate();
  const saveTags = useSavePostTags();
  const saveGallery = useSavePostGallery();
  const saving = create.isPending || update.isPending || saveTags.isPending || saveGallery.isPending;

  const { data: allTags } = useAllTags();
  const { data: existingTags } = usePostTags(post?.id);
  const { data: existingGallery } = usePostGallery(post?.id);
  const { data: existingFeaturedImage } = useMediaAssetById(post?.featured_image_media_id ?? null);

  useEffect(() => {
    if (existingFeaturedImage) setFeaturedImage(existingFeaturedImage);
  }, [existingFeaturedImage]);

  useEffect(() => {
    if (existingTags) setTagNames(existingTags.map((t) => ({ name_en: t.name_en, name_ar: t.name_ar })));
  }, [existingTags]);

  useEffect(() => {
    if (existingGallery) {
      setGallery(existingGallery.map((row) => row.media_assets).filter(Boolean) as unknown as MediaAsset[]);
    }
  }, [existingGallery]);

  useEffect(() => {
    if (post) {
      setForm({
        slug: post.slug,
        title_en: post.title_en,
        title_ar: post.title_ar,
        excerpt_en: post.excerpt_en,
        excerpt_ar: post.excerpt_ar,
        featured_image_media_id: post.featured_image_media_id,
        category_en: post.category_en || "",
        category_ar: post.category_ar || "",
        author_name: post.author_name || "",
        reading_time_minutes: post.reading_time_minutes ?? "",
        is_featured: post.is_featured,
        status: post.status,
        seo_title_en: post.seo_title_en || "",
        seo_title_ar: post.seo_title_ar || "",
        seo_description_en: post.seo_description_en || "",
        seo_description_ar: post.seo_description_ar || "",
      });
      setContentEn((post.content_en as JSONContent) || emptyContent);
      setContentAr((post.content_ar as JSONContent) || emptyContent);
    }
  }, [post]);

  function addTag() {
    const name = tagInput.trim();
    if (!name) return;
    if (tagNames.some((t) => t.name_en.toLowerCase() === name.toLowerCase())) {
      setTagInput("");
      return;
    }
    const existing = allTags?.find((t) => t.name_en.toLowerCase() === name.toLowerCase());
    setTagNames((prev) => [...prev, { name_en: name, name_ar: existing?.name_ar || name }]);
    setTagInput("");
  }

  async function handleSubmit(publish: boolean) {
    if (!form.title_en || !form.title_ar || !form.slug) {
      toast.error("Title (both languages) and slug are required.");
      return;
    }
    const values = {
      slug: form.slug,
      title_en: form.title_en,
      title_ar: form.title_ar,
      excerpt_en: form.excerpt_en,
      excerpt_ar: form.excerpt_ar,
      content_en: contentEn,
      content_ar: contentAr,
      featured_image_media_id: form.featured_image_media_id,
      category_en: form.category_en || null,
      category_ar: form.category_ar || null,
      author_name: form.author_name || null,
      reading_time_minutes: form.reading_time_minutes === "" ? null : Number(form.reading_time_minutes),
      is_featured: form.is_featured,
      status: publish ? ("published" as const) : ("draft" as const),
      seo_title_en: form.seo_title_en || null,
      seo_title_ar: form.seo_title_ar || null,
      seo_description_en: form.seo_description_en || null,
      seo_description_ar: form.seo_description_ar || null,
    };
    try {
      let postId: string;
      if (post) {
        postId = post.id;
        await update.mutateAsync({
          id: post.id,
          values: { ...values, published_at: publish && !post.published_at ? new Date().toISOString() : post.published_at },
        });
      } else {
        const created = await create.mutateAsync({ ...values, published_at: publish ? new Date().toISOString() : null });
        postId = created.id;
      }
      await saveTags.mutateAsync({ postId, tagNames });
      await saveGallery.mutateAsync({ postId, mediaIds: gallery.map((g) => g.id) });
      toast.success(publish ? "Published" : "Saved as draft");
      router.push("/admin/pages/blog");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save");
    }
  }

  return (
    <div>
      <PageHeader
        title={post ? "Edit Article" : "New Article"}
        actions={
          <div className="flex gap-3">
            {post && <VersionHistoryButton table="blog_posts" entityType="blog_posts" entityId={post.id} />}
            <AdminButton variant="outline" size="sm" onClick={() => router.push("/admin/pages/blog")}>
              Cancel
            </AdminButton>
            <AdminButton variant="outline" size="sm" loading={saving} onClick={() => handleSubmit(false)}>
              Save Draft
            </AdminButton>
            <AdminButton size="sm" loading={saving} onClick={() => handleSubmit(true)}>
              Publish
            </AdminButton>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <AdminCard>
            <BilingualField
              label="Title"
              required
              valueEn={form.title_en}
              valueAr={form.title_ar}
              onChangeEn={(v) => setForm((f) => ({ ...f, title_en: v, slug: slugTouched ? f.slug : slugify(v) }))}
              onChangeAr={(v) => setForm((f) => ({ ...f, title_ar: v }))}
            />
            <div className="mt-4">
              <FieldGroup label="Slug">
                <TextField value={form.slug} onChange={(e) => { setSlugTouched(true); setForm((f) => ({ ...f, slug: slugify(e.target.value) })); }} dir="ltr" />
              </FieldGroup>
            </div>
            <div className="mt-4">
              <BilingualField
                label="Excerpt"
                hint="Shown on article cards"
                multiline
                valueEn={form.excerpt_en}
                valueAr={form.excerpt_ar}
                onChangeEn={(v) => setForm((f) => ({ ...f, excerpt_en: v }))}
                onChangeAr={(v) => setForm((f) => ({ ...f, excerpt_ar: v }))}
              />
            </div>
          </AdminCard>

          <AdminCard>
            <BilingualRichText label="Content" valueEn={contentEn} valueAr={contentAr} onChangeEn={setContentEn} onChangeAr={setContentAr} />
          </AdminCard>

          <AdminCard>
            <p className="mb-4 text-sm font-semibold text-white">SEO</p>
            <div className="space-y-4">
              <BilingualField
                label="SEO title"
                valueEn={form.seo_title_en}
                valueAr={form.seo_title_ar}
                onChangeEn={(v) => setForm((f) => ({ ...f, seo_title_en: v }))}
                onChangeAr={(v) => setForm((f) => ({ ...f, seo_title_ar: v }))}
              />
              <BilingualField
                label="SEO description"
                multiline
                valueEn={form.seo_description_en}
                valueAr={form.seo_description_ar}
                onChangeEn={(v) => setForm((f) => ({ ...f, seo_description_en: v }))}
                onChangeAr={(v) => setForm((f) => ({ ...f, seo_description_ar: v }))}
              />
            </div>
          </AdminCard>
        </div>

        <div className="space-y-6">
          <AdminCard>
            <ToggleField label="Published" checked={form.status === "published"} onChange={(v) => setForm((f) => ({ ...f, status: v ? "published" : "draft" }))} />
            <div className="mt-3">
              <ToggleField label="Featured article" checked={form.is_featured} onChange={(v) => setForm((f) => ({ ...f, is_featured: v }))} />
            </div>
          </AdminCard>

          <AdminCard>
            <MediaPickerField
              label="Featured image"
              valueMediaId={form.featured_image_media_id}
              valueUrl={featuredImage ? getPublicMediaUrl(featuredImage.storage_path) : null}
              onChange={(asset) => { setFeaturedImage(asset); setForm((f) => ({ ...f, featured_image_media_id: asset?.id ?? null })); }}
            />
          </AdminCard>

          <AdminCard>
            <BilingualField
              label="Category"
              valueEn={form.category_en}
              valueAr={form.category_ar}
              onChangeEn={(v) => setForm((f) => ({ ...f, category_en: v }))}
              onChangeAr={(v) => setForm((f) => ({ ...f, category_ar: v }))}
            />
            <div className="mt-4 grid grid-cols-2 gap-3">
              <FieldGroup label="Author">
                <TextField value={form.author_name} onChange={(e) => setForm((f) => ({ ...f, author_name: e.target.value }))} dir="ltr" />
              </FieldGroup>
              <FieldGroup label="Reading time (min)">
                <TextField type="number" min={1} value={form.reading_time_minutes} onChange={(e) => setForm((f) => ({ ...f, reading_time_minutes: e.target.value }))} dir="ltr" />
              </FieldGroup>
            </div>
          </AdminCard>

          <AdminCard>
            <span className="mb-2 block text-sm font-medium text-on-surface-variant">Tags</span>
            <div className="mb-3 flex flex-wrap gap-1.5">
              {tagNames.map((t) => (
                <span key={t.name_en} className="flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs text-primary">
                  {t.name_en}
                  <button type="button" onClick={() => setTagNames((prev) => prev.filter((x) => x.name_en !== t.name_en))} aria-label={`Remove ${t.name_en}`}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <TextField
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                placeholder="Add a tag..."
                dir="ltr"
              />
              <AdminButton type="button" variant="outline" size="sm" onClick={addTag}>
                <Plus className="h-4 w-4" />
              </AdminButton>
            </div>
          </AdminCard>

          <AdminCard>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-on-surface-variant">Gallery</span>
              <AdminButton type="button" variant="outline" size="sm" onClick={() => setGalleryPickerOpen(true)}>
                Add
              </AdminButton>
            </div>
            {gallery.length === 0 ? (
              <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-outline-variant/30 py-8 text-on-surface-variant">
                <ImageOff className="h-6 w-6" />
                <span className="text-xs">No gallery images yet</span>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {gallery.map((asset) => (
                  <div key={asset.id} className={cn("group relative aspect-square overflow-hidden rounded-lg bg-surface-container")}>
                    {/* eslint-disable-next-line @next/next/no-img-element -- admin gallery thumbnail */}
                    <img src={getPublicMediaUrl(asset.storage_path)} alt="" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setGallery((prev) => prev.filter((g) => g.id !== asset.id))}
                      className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/70 text-white opacity-0 transition-opacity group-hover:opacity-100"
                      aria-label="Remove from gallery"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <MediaPickerDialog
              open={galleryPickerOpen}
              onClose={() => setGalleryPickerOpen(false)}
              onSelect={(asset) => {
                if (!gallery.some((g) => g.id === asset.id)) setGallery((prev) => [...prev, asset]);
                setGalleryPickerOpen(false);
              }}
            />
          </AdminCard>
        </div>
      </div>
    </div>
  );
}
