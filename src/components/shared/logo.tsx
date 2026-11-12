import Link from "next/link";
import { BrandLogo } from "./brand-logo";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  isCollapsed?: boolean;
  white?: boolean;
}

export function Logo({ className, isCollapsed = false, white = false }: LogoProps) {
  return (
    <Link
      href="/dashboard"
      className={cn("flex items-center transition-opacity hover:opacity-95", className)}
    >
      <BrandLogo
        showText={!isCollapsed}
        textClassName={white ? "text-white" : "text-[#143B42]"}
      />
    </Link>
  );
}
