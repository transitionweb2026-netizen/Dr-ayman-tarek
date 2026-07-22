export interface NavItem {
  /** Dot-path into the translation dictionary's `nav` namespace. */
  labelKey: string;
  href: string;
}

// Single source of truth for the primary nav — mirrors the old nav.js NAV_ITEMS.
export const NAV_ITEMS: NavItem[] = [
  { labelKey: "nav.home", href: "/" },
  { labelKey: "nav.drAymanTarek", href: "/dr-ayman-tarek" },
  { labelKey: "nav.services", href: "/services" },
  { labelKey: "nav.videos", href: "/videos" },
  { labelKey: "nav.blog", href: "/blog" },
  { labelKey: "nav.contact", href: "/contact" },
];

export const SITE_BRAND = {
  icon: "neurology",
};
