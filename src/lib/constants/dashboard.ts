import { BadgePercent, KeyRound, Box, UserRound, Wallet, MessageCircleQuestionMark } from "lucide-react";

export const dashboardNavigation = [
  { label: "Dashboard", icon: KeyRound, available: false },
  { label: "Product", icon: Box, available: false },
  { label: "Customers", href: "/dashboard/customers", icon: UserRound, available: true },
  { label: "Income", icon: Wallet, available: false },
  { label: "Promote", icon: BadgePercent, available: false },
  { label: "Help", icon: MessageCircleQuestionMark, available: false },
] as const;

export const dashboardUser = {
  name: "Evano",
  role: "Project Manager",
  avatarFallback: "EV",
};

export const dashboardBrand = {
  name: "Dashboard",
  version: "v.01",
} as const;
