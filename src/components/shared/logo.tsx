import Link from "next/link";
import { Activity } from "lucide-react";
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
      className={cn("flex items-center gap-2.5 transition-opacity hover:opacity-95", className)}
    >
      <div
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-lg shadow-xs",
          white ? "bg-white text-blue-600" : "bg-blue-600 text-white"
        )}
      >
        <Activity className="h-5 w-5 stroke-[2.5]" />
      </div>
      {!isCollapsed && (
        <div className="flex flex-col">
          <span
            className={cn(
              "text-base font-bold tracking-tight leading-tight",
              white ? "text-white" : "text-slate-900"
            )}
          >
            Doctor Tracker
          </span>
          <span
            className={cn(
              "text-[10px] font-medium leading-none",
              white ? "text-blue-100" : "text-slate-400"
            )}
          >
            Care Guide Hospital Admin
          </span>
        </div>
      )}
    </Link>
  );
}

