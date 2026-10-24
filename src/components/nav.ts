import {
  BookOpen,
  FileUp,
  LayoutDashboard,
  MessagesSquare,
  Users,
  type LucideIcon,
} from "lucide-react";

export type NavItem = { href: string; label: string; icon: LucideIcon; hint: string; also?: string[] };

export const isActive = (item: NavItem, pathname: string) =>
  [item.href, ...(item.also ?? [])].some((p) => pathname === p || pathname.startsWith(`${p}/`));

// Le pagine dell'app seguono i 4 passi del prodotto: Carica → Impara → Allenati → Migliora
export const NAV: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, hint: "Migliora" },
  { href: "/contenuti", label: "Contenuti", icon: FileUp, hint: "Carica" },
  { href: "/impara", label: "Impara", icon: BookOpen, hint: "Impara" },
  { href: "/roleplay", label: "Role play", icon: MessagesSquare, hint: "Allenati", also: ["/report"] },
  { href: "/team", label: "Team", icon: Users, hint: "Migliora" },
];
