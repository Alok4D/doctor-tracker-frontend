import { LayoutDashboard } from "lucide-react";
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
    iconSrc: "/icons/doctor-icons.png",
  },
  {
    title: "Patients",
    href: "/patients",
    iconSrc: "/icons/patients-icons.png",
  },
];
