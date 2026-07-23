import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  FileText,
  HelpCircle,
  Quote,
  Image as ImageIcon,
  Search,
  Settings,
  Users,
  Home,
  Stethoscope,
  Video,
  Newspaper,
  Phone,
} from "lucide-react";

export interface AdminNavLeaf {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface AdminNavGroup {
  label: string;
  icon: LucideIcon;
  children: AdminNavLeaf[];
}

export type AdminNavItem = AdminNavLeaf | AdminNavGroup;

export const ADMIN_NAV: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  {
    label: "Pages",
    icon: FileText,
    children: [
      { label: "Home", href: "/admin/pages/home", icon: Home },
      { label: "Dr. Ayman Tarek", href: "/admin/pages/dr-ayman-tarek", icon: Stethoscope },
      { label: "Services", href: "/admin/pages/services", icon: Stethoscope },
      { label: "Videos", href: "/admin/pages/videos", icon: Video },
      { label: "Blog", href: "/admin/pages/blog", icon: Newspaper },
      { label: "Contact", href: "/admin/pages/contact", icon: Phone },
    ],
  },
  { label: "FAQ", href: "/admin/faq", icon: HelpCircle },
  { label: "Testimonials", href: "/admin/testimonials", icon: Quote },
  { label: "Media Library", href: "/admin/media", icon: ImageIcon },
  { label: "SEO", href: "/admin/seo", icon: Search },
  { label: "Site Settings", href: "/admin/settings", icon: Settings },
  { label: "Users", href: "/admin/users", icon: Users },
];

export function isNavGroup(item: AdminNavItem): item is AdminNavGroup {
  return "children" in item;
}
