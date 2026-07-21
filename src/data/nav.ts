export interface NavItem {
  label: string;
  href: string;
}

// Single source of truth for the primary nav — mirrors the old nav.js NAV_ITEMS.
export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Dr. Ayman Tarek", href: "/dr-ayman-tarek" },
  { label: "Services", href: "/services" },
  { label: "Videos", href: "/videos" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const SITE_BRAND = {
  icon: "neurology",
  name: "Dr. Ayman Tarek",
};
