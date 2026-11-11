"use client";

import { LucideIcon } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

interface SparklineStatsCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: LucideIcon;
  sparklineData: { v: number }[];
  theme: "blue" | "emerald" | "purple" | "orange";
}

const themeStyles = {
  blue: {
    bg: "bg-blue-50/40 border-blue-100",
    iconBg: "bg-blue-100 text-blue-600",
    stroke: "#3b82f6",
    fill: "#93c5fd",
  },
  emerald: {
    bg: "bg-emerald-50/40 border-emerald-100",
    iconBg: "bg-emerald-100 text-emerald-600",
    stroke: "#10b981",
    fill: "#a7f3d0",
  },
  purple: {
    bg: "bg-purple-50/40 border-purple-100",
    iconBg: "bg-purple-100 text-purple-600",
    stroke: "#8b5cf6",
    fill: "#ddd6fe",
  },
  orange: {
    bg: "bg-orange-50/40 border-orange-100",
    iconBg: "bg-orange-100 text-orange-600",
    stroke: "#f97316",
    fill: "#fed7aa",
  },
};

export function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  sparklineData,
  theme = "blue",
}: SparklineStatsCardProps) {
  const styles = themeStyles[theme];

  return (
    <div
      className={cn(
        "relative rounded-xl border bg-white p-4 shadow-xs overflow-hidden flex flex-col justify-between",
        styles.bg
      )}
    >
      <div className="flex items-center gap-3">
        {/* Icon box */}
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl shrink-0 shadow-2xs",
            styles.iconBg
          )}
        >
          <Icon className="h-5 w-5 stroke-2" />
        </div>

        {/* Value and Title */}
        <div>
          <p className="text-xs font-medium text-slate-500">{title}</p>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl font-bold tracking-tight text-slate-900">
              {value}
            </span>
            <span className="text-xs font-semibold text-emerald-600">
              {change}
            </span>
          </div>
        </div>
      </div>

      {/* Sparkline Wave Chart at bottom */}
      <div className="h-10 w-full mt-2 -mb-1 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={sparklineData}>
            <defs>
              <linearGradient id={`grad-${theme}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={styles.fill} stopOpacity={0.6} />
                <stop offset="100%" stopColor={styles.fill} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="v"
              stroke={styles.stroke}
              strokeWidth={2}
              fill={`url(#grad-${theme})`}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
