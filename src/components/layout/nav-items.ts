import {
  LayoutDashboard,
  UserCheck,
  Users,
  Settings,
} from "lucide-react";
import { NavItem } from "@/types/navigation.types";

export const primaryNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Doctors",
    href: "/doctors",
    icon: UserCheck,
  },
  {
    title: "Patients",
    href: "/patients",
    icon: Users,
  },
];

