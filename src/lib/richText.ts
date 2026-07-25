import { generateHTML } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";

const EXTENSIONS = [
  // StarterKit bundles its own Link extension as of Tiptap v3 — disable it
  // here so the explicit LinkExtension.configure() below (with our own
  // openOnClick/autolink options) doesn't collide with it (was logging
  // "Duplicate extension names found: ['link']" on every render).
  StarterKit.configure({ link: false }),
  LinkExtension.configure({ openOnClick: false, autolink: true }),
  ImageExtension,
  TextAlign.configure({ types: ["heading", "paragraph"] }),
];

/** Same extension set as the admin BilingualRichText editor (see
 * RichTextEditor.tsx) — read-only server-side render of stored Tiptap JSON
 * into the HTML string the blog post detail page dangerously-sets, styled
 * via the shared .rich-text-content CSS class. */
export function renderRichTextHtml(json: unknown): string {
  if (!json || typeof json !== "object" || Object.keys(json as object).length === 0) return "";
  try {
    return generateHTML(json as Parameters<typeof generateHTML>[0], EXTENSIONS);
  } catch {
    return "";
  }
}
