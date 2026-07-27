/**
 * lucide-react ships no brand/logo glyphs, so every social platform mark
 * used sitewide (Footer, HeroSocialCard) lives here once instead of being
 * redrawn per call site — also means an icon actually looks like the
 * platform it links to, instead of a generic Material Symbols stand-in.
 */
export function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.79.47 3.47 1.29 4.94L2 22l5.29-1.39a9.87 9.87 0 004.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.02c-.24.68-1.4 1.3-1.93 1.38-.49.08-1.11.11-1.79-.11-.41-.13-.94-.3-1.62-.6-2.85-1.23-4.71-4.1-4.85-4.29-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09 1-2.37.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.58.81 2 .88 2.14.07.14.11.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.71 1.17 1.52 1.9 1.05.94 1.93 1.23 2.21 1.37.28.14.44.12.61-.07.16-.19.7-.81.89-1.09.19-.28.38-.23.63-.14.26.09 1.65.78 1.93.92.28.14.47.21.54.33.07.12.07.68-.17 1.36z" />
    </svg>
  );
}

export function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <rect height={17} rx={5} width={17} x={3.5} y={3.5} />
      <circle cx={12} cy={12} r={4} />
      <circle cx={17.3} cy={6.7} fill="currentColor" r={1} stroke="none" />
    </svg>
  );
}

export function FacebookGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.87.24-1.5 1.53-1.5H16.5V4.35C16.2 4.31 15.19 4.22 14 4.22c-2.47 0-4.16 1.51-4.16 4.28V10.5H7v3h2.84V21h3.66z" />
    </svg>
  );
}

export function TikTokGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M16.5 3c.4 2.4 1.9 4 4.5 4.2v3c-1.6 0-3-.5-4.5-1.5v6.8c0 3.4-2.7 5.5-5.6 5.5-3 0-5.6-2.2-5.6-5.5s2.7-5.5 5.6-5.5c.4 0 .8 0 1.1.1v3.1a2.9 2.9 0 00-1.1-.2c-1.6 0-2.7 1.2-2.7 2.5s1.1 2.5 2.7 2.5c1.7 0 2.9-1.3 2.9-3.1V3h2.7z" />
    </svg>
  );
}

export function LinkedInGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M4.98 3.5a2 2 0 110 4 2 2 0 010-4zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-.9 1.8-1.9 3.7-1.9 4 0 4.7 2.5 4.7 5.8V21h-4v-5.7c0-1.4 0-3.1-1.9-3.1s-2.2 1.5-2.2 3V21H9z" />
    </svg>
  );
}

export function YouTubeGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M21.6 7.2c-.2-1-1-1.8-2-2C17.9 4.7 12 4.7 12 4.7s-5.9 0-7.6.5c-1 .2-1.8 1-2 2C2 8.9 2 12 2 12s0 3.1.4 4.8c.2 1 1 1.8 2 2 1.7.5 7.6.5 7.6.5s5.9 0 7.6-.5c1-.2 1.8-1 2-2 .4-1.7.4-4.8.4-4.8s0-3.1-.4-4.8zM10 15.5v-7l6 3.5-6 3.5z" />
    </svg>
  );
}

export function XGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.3 3H21l-6.5 7.4L22 21h-6.4l-5-6.5L4.8 21H2l7-8L2 3h6.5l4.5 6 5.3-6zm-1.1 16.2h1.4L7.9 4.7H6.4l10.8 14.5z" />
    </svg>
  );
}

export function LinkGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path d="M9 15l6-6M10.5 6.5l1-1a3.5 3.5 0 015 5l-1 1M13.5 17.5l-1 1a3.5 3.5 0 01-5-5l1-1" strokeLinecap="round" />
    </svg>
  );
}

/** Platform name (lowercased, as stored in site_settings.socialLinks) -> glyph. */
export const SOCIAL_GLYPHS: Record<string, (props: { className?: string }) => JSX.Element> = {
  whatsapp: WhatsAppGlyph,
  instagram: InstagramGlyph,
  facebook: FacebookGlyph,
  tiktok: TikTokGlyph,
  linkedin: LinkedInGlyph,
  youtube: YouTubeGlyph,
  twitter: XGlyph,
  x: XGlyph,
};

export function socialGlyphFor(platform: string) {
  return SOCIAL_GLYPHS[platform.toLowerCase()] ?? LinkGlyph;
}
