import { generateHTML } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";

const EXTENSIONS = [
  StarterKit,
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
