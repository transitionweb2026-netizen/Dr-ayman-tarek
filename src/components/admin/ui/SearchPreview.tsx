"use client";

/** Google / Facebook / Twitter preview mockups for the SEO edit panels —
 * pure presentation, driven entirely by whatever the form currently holds
 * (falls back to the passed defaults so it's never empty pre-save). */
export function SearchPreview({
  title,
  description,
  url,
  imageUrl,
}: {
  title: string;
  description: string;
  url: string;
  imageUrl: string | null;
}) {
  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-on-surface-variant/60">Google</p>
        <div className="rounded-xl border border-outline-variant/30 bg-white p-4 font-sans">
          <p className="truncate text-sm text-[#202124]">{url}</p>
          <p className="mt-1 truncate text-lg text-[#1a0dab]">{title || "Untitled page"}</p>
          <p className="mt-1 line-clamp-2 text-sm text-[#4d5156]">{description || "No description set."}</p>
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-on-surface-variant/60">Facebook / LinkedIn / WhatsApp</p>
        <div className="overflow-hidden rounded-xl border border-outline-variant/30 bg-[#f0f2f5]">
          <div className="aspect-[1.91/1] w-full bg-outline-variant/20">
            {/* eslint-disable-next-line @next/next/no-img-element -- small admin preview thumbnail, not part of the optimized public site */}
            {imageUrl && <img src={imageUrl} alt="" className="h-full w-full object-cover" />}
          </div>
          <div className="p-3">
            <p className="truncate text-xs uppercase text-[#65676b]">{url.replace(/^https?:\/\//, "").split("/")[0]}</p>
            <p className="truncate text-sm font-semibold text-[#050505]">{title || "Untitled page"}</p>
            <p className="line-clamp-1 text-xs text-[#65676b]">{description || "No description set."}</p>
          </div>
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-on-surface-variant/60">Twitter / X</p>
        <div className="overflow-hidden rounded-2xl border border-outline-variant/30 bg-black">
          <div className="aspect-[1.91/1] w-full bg-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element -- small admin preview thumbnail, not part of the optimized public site */}
            {imageUrl && <img src={imageUrl} alt="" className="h-full w-full object-cover" />}
          </div>
          <div className="p-3">
            <p className="truncate text-sm font-semibold text-white">{title || "Untitled page"}</p>
            <p className="line-clamp-1 text-xs text-white/60">{description || "No description set."}</p>
            <p className="mt-1 text-xs text-white/40">{url.replace(/^https?:\/\//, "").split("/")[0]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
