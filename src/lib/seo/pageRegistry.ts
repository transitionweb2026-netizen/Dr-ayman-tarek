/** English/Arabic names + canonical (English) path for each of the 6
 * structured pages — used to build BreadcrumbList JSON-LD consistently
 * across every page.tsx without each one re-declaring the same labels. */
export const PAGE_REGISTRY = {
  home: { path: "/", nameEn: "Home", nameAr: "الرئيسية" },
  "dr-ayman-tarek": { path: "/dr-ayman-tarek", nameEn: "Dr. Ayman Tarek", nameAr: "د. أيمن طارق" },
  services: { path: "/services", nameEn: "Services", nameAr: "الخدمات" },
  videos: { path: "/videos", nameEn: "Videos", nameAr: "الفيديوهات" },
  blog: { path: "/blog", nameEn: "Blog", nameAr: "المدونة" },
  contact: { path: "/contact", nameEn: "Contact", nameAr: "تواصل معنا" },
} as const;

export type RegisteredSlug = keyof typeof PAGE_REGISTRY;

/** Home > This Page breadcrumb items, in the given language — every
 * non-home page's BreadcrumbList JSON-LD is built from this. */
export function breadcrumbItems(slug: Exclude<RegisteredSlug, "home">, lang: "en" | "ar") {
  const home = { name: lang === "ar" ? PAGE_REGISTRY.home.nameAr : PAGE_REGISTRY.home.nameEn, path: lang === "ar" ? "/ar" : "/" };
  const page = PAGE_REGISTRY[slug];
  const current = {
    name: lang === "ar" ? page.nameAr : page.nameEn,
    path: lang === "ar" ? `/ar${page.path}` : page.path,
  };
  return [home, current];
}
