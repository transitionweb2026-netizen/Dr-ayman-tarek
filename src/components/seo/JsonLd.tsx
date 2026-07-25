/** Renders one JSON-LD <script> block. Server Component — no client JS needed. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output for schema.org data — not user-navigable HTML,
      // and </script> can't appear inside a JSON string value here.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
