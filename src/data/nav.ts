export interface NavItem {
  label: string;
  href: string;
}

// Single source of truth for the primary nav — mirrors the old nav.js NAV_ITEMS.
export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Cosmetic Surgery", href: "/dr-ayman-tarek" },
  { label: "Videos", href: "/videos" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const SITE_BRAND = {
  icon: "neurology",
  name: "Dr. Ayman Tarek",
};
