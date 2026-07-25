import { headers } from "next/headers";

/** Renders one JSON-LD <script> block. Server Component — no client JS needed.
 * Browsers generally don't apply CSP script-src to type="application/ld+json"
 * (it's an inert data block, never executed as JS) — but the nonce is added
 * anyway so this stays correct even under stricter enforcement or a browser
 * that treats it conservatively. */
export async function JsonLd({ data }: { data: Record<string, unknown> }) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <script
      type="application/ld+json"
      nonce={nonce}
      // Escaping `<` (per Next.js's JSON-LD guidance) stops a CMS-editable
      // string field (blog title, FAQ answer, page description, ...)
      // containing "</script>" from breaking out of this tag and injecting
      // arbitrary script — JSON.stringify alone does not sanitize for HTML.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
