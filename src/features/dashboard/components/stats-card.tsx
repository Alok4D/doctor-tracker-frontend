"use client";

import { LucideIcon, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface StatsCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: LucideIcon;
  isLoading?: boolean;
  className?: string;
}


export function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  isLoading = false,
  className,
}: StatsCardProps) {
  if (isLoading) {
    return (
      <div
        className={cn(
          "rounded-2xl border border-[#E5ECEE] bg-white shadow-2xs overflow-hidden flex flex-col justify-between",
          className
        )}
      >
        <div className="p-3.5 sm:p-5 flex items-start justify-between gap-2 sm:gap-3">
          <div className="space-y-2.5 flex-1">
            <Skeleton className="h-3.5 w-20 sm:w-24 rounded-md" />
            <Skeleton className="h-7 sm:h-8 w-14 sm:w-16 rounded-md" />
          </div>
          <Skeleton className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl shrink-0" />
        </div>
        <div className="bg-[#F2F8F8] px-3.5 py-2 sm:px-5 sm:py-2.5 flex items-center gap-2 sm:gap-2.5 border-t border-[#E8F4F4]">
          <Skeleton className="h-4 w-4 sm:h-5 sm:w-5 rounded-full shrink-0" />
          <Skeleton className="h-3 sm:h-3.5 w-24 sm:w-32 rounded-md" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-[#E5ECEE] bg-white shadow-2xs overflow-hidden flex flex-col justify-between transition-colors hover:border-[#CBE6E8]",
        className
      )}
    >
      {/* Top Metric Area */}
      <div className="p-3.5 sm:p-5 flex items-start justify-between gap-2 sm:gap-3">
        <div className="min-w-0">
          <p className="text-xs sm:text-[13px] font-medium text-slate-500 truncate">
            {title}
          </p>
          <p className="text-2xl sm:text-[28px] leading-tight font-bold tracking-tight text-[#19464E] mt-1 sm:mt-1.5">
            {value}
          </p>
        </div>

        <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-[#19464E] text-white shrink-0 shadow-2xs">
          <Icon className="h-4 w-4 sm:h-5 sm:w-5 stroke-[1.75]" />
        </div>
      </div>

      {/* Bottom Soft-Mint Trend Strip */}
      <div className="bg-[#D8ECEC]/75 px-3.5 py-2 sm:px-5 sm:py-2.5 flex items-center gap-2 sm:gap-2.5 border-t border-[#E8F4F4]">
        <span className="flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-[#4598A6] text-white shrink-0">
          <ArrowUpRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 stroke-[2.5]" />
        </span>
        <span className="text-[11px] sm:text-xs font-medium text-[#19464E] truncate">
          {change}
        </span>
      </div>
    </div>
  );
}
