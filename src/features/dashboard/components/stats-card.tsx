import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  change: string;
  isPositive?: boolean;
  icon: LucideIcon;
  iconVariant?: "primary" | "secondary";
}

export function StatsCard({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
  iconVariant = "primary",
}: StatsCardProps) {
  return (
    <div className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-xs flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500">{title}</p>
          <h3 className="mt-1.5 text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </h3>
        </div>
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg shrink-0",
            iconVariant === "primary"
              ? "bg-blue-600 text-white"
              : "bg-blue-50 border border-blue-100 text-blue-600"
          )}
        >
          <Icon className="h-5 w-5 stroke-[2]" />
        </div>
      </div>

      <div className="mt-3 flex items-center gap-1.5">
        <span
          className={cn(
            "text-xs font-semibold",
            isPositive ? "text-emerald-600" : "text-rose-600"
          )}
        >
          {change}
        </span>
      </div>
    </div>
  );
}

