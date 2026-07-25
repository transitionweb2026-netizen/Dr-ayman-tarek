/** Renders one JSON-LD <script> block. Server Component — no client JS needed. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Escaping `<` (per Next.js's JSON-LD guidance) stops a CMS-editable
      // string field (blog title, FAQ answer, page description, ...)
      // containing "</script>" from breaking out of this tag and injecting
      // arbitrary script — JSON.stringify alone does not sanitize for HTML.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
