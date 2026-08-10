"use client";

import { useRef, useState } from "react";
import { Upload, VideoOff, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { AdminButton } from "./Button";
import { uploadMediaAssetWithProgress, validateVideoFile } from "@/lib/supabase/storage";
import type { MediaAsset } from "@/hooks/useMediaLibrary";

/**
 * Video-file counterpart to <MediaPickerField> — a dedicated upload control
 * (rather than reusing the generic Media Library picker) because a video
 * upload needs real progress feedback that the picker's simple spinner
 * doesn't give, plus stricter type/size validation than "any file".
 * Selecting a new file always replaces the current one for this field, and
 * "Remove" only clears the video's reference to the asset (never deletes the
 * underlying Storage object), matching MediaPickerField's own Remove
 * behavior — safe to do without worrying about breaking other records.
 */
export function VideoUploadField({
  label,
  hint,
  valueUrl,
  onChange,
}: {
  label: string;
  hint?: string;
  valueUrl: string | null;
  onChange: (asset: MediaAsset | null) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (fileInputRef.current) fileInputRef.current.value = "";

    const validationError = validateVideoFile(file);
    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      return;
    }

    setError(null);
    setUploading(true);
    setProgress(0);
    try {
      const asset = await uploadMediaAssetWithProgress(file, setProgress);
      queryClient.invalidateQueries({ queryKey: ["media-assets"] });
      onChange(asset as MediaAsset);
      toast.success("Video uploaded");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      setError(message);
      toast.error(message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-sm font-medium text-on-surface-variant">{label}</span>
        {hint && <span className="text-xs text-on-surface-variant/60">{hint}</span>}
      </div>
      <div className="flex items-start gap-3">
        <div className="flex h-20 w-32 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-outline-variant/40 bg-surface-container">
          {valueUrl ? (
            <video src={valueUrl} controls preload="metadata" className="h-full w-full object-cover" />
          ) : (
            <VideoOff className="h-6 w-6 text-on-surface-variant/40" />
          )}
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center gap-3">
            <AdminButton
              type="button"
              size="sm"
              variant="outline"
              icon={<Upload className="h-4 w-4" />}
              loading={uploading}
              onClick={() => fileInputRef.current?.click()}
            >
              {uploading ? `Uploading… ${progress}%` : valueUrl ? "Replace video" : "Upload video"}
            </AdminButton>
            {valueUrl && !uploading && (
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  onChange(null);
                }}
                className="text-left text-xs text-on-surface-variant hover:text-error"
              >
                Remove
              </button>
            )}
          </div>
          {uploading && (
            <div className="h-1.5 w-full max-w-[220px] overflow-hidden rounded-full bg-outline-variant/20">
              <div className="h-full rounded-full bg-primary transition-all duration-150" style={{ width: `${progress}%` }} />
            </div>
          )}
          {error && (
            <p className="flex items-center gap-1.5 text-xs text-error">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              {error}
            </p>
          )}
        </div>
      </div>
      <input ref={fileInputRef} type="file" accept="video/*" className="hidden" onChange={handleFileChange} />
    </div>
  );
}
