import { createClient } from "./client";

const BUCKET = "media";

export function getPublicMediaUrl(storagePath: string): string {
  const supabase = createClient();
  return supabase.storage.from(BUCKET).getPublicUrl(storagePath).data.publicUrl;
}

export function detectKind(mimeType: string): "image" | "video" | "pdf" | "other" {
  if (mimeType.startsWith("image/")) return "image";
  if (mimeType.startsWith("video/")) return "video";
  if (mimeType === "application/pdf") return "pdf";
  return "other";
}

function readImageDimensions(file: File): Promise<{ width: number; height: number } | null> {
  if (!file.type.startsWith("image/")) return Promise.resolve(null);
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(null);
    };
    img.src = url;
  });
}

/**
 * Uploads a file directly from the browser (respects Storage RLS via the
 * admin's own session — no server action needed for the byte stream) then
 * inserts the matching media_assets row. Single entry point reused by the
 * Media Library page and every inline "Upload new" button inside
 * <MediaPicker>.
 */
export async function uploadMediaAsset(file: File, folderId: string | null = null) {
  const supabase = createClient();
  const ext = file.name.includes(".") ? file.name.slice(file.name.lastIndexOf(".")) : "";
  const storagePath = `${crypto.randomUUID()}${ext}`;

  const { error: uploadError } = await supabase.storage.from(BUCKET).upload(storagePath, file, {
    cacheControl: "31536000",
    upsert: false,
  });
  if (uploadError) throw uploadError;

  const dimensions = await readImageDimensions(file);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("media_assets")
    .insert({
      folder_id: folderId,
      file_name: file.name,
      storage_path: storagePath,
      mime_type: file.type || "application/octet-stream",
      kind: detectKind(file.type),
      file_size: file.size,
      width: dimensions?.width ?? null,
      height: dimensions?.height ?? null,
      uploaded_by: user?.id ?? null,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteMediaAsset(id: string, storagePath: string) {
  const supabase = createClient();
  const { error: storageError } = await supabase.storage.from(BUCKET).remove([storagePath]);
  if (storageError) throw storageError;
  const { error } = await supabase.from("media_assets").delete().eq("id", id);
  if (error) throw error;
}
