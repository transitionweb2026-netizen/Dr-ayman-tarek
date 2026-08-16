/** Accepts watch/short/embed URL shapes and returns a playable embed URL, or
 * null if the stored value isn't a recognizable YouTube URL (CMS free-text
 * field — never assume it's well-formed). */
export function toYouTubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");
    let id: string | null = null;
    if (host === "youtu.be") {
      id = parsed.pathname.slice(1);
    } else if (host === "youtube.com" || host === "m.youtube.com") {
      if (parsed.pathname === "/watch") id = parsed.searchParams.get("v");
      else if (parsed.pathname.startsWith("/embed/")) id = parsed.pathname.split("/")[2];
      else if (parsed.pathname.startsWith("/shorts/")) id = parsed.pathname.split("/")[2];
    }
    return id ? `https://www.youtube.com/embed/${id}?autoplay=1` : null;
  } catch {
    return null;
  }
}
