"use client";

import { useMemo, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CalendarDays } from "lucide-react";
import { useGetPatientsOverviewQuery } from "@/lib/feature/dashboard/dashboardApi";
import { Skeleton } from "@/components/ui/skeleton";
import { IDateStatItem } from "@/types/dashboard.types";

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatDateBuckets(rawStats: IDateStatItem[], timeframe: string) {
  if (!rawStats.length) return [];

  // For 'year' (already YYYY-MM) or small ranges (<= 6 points), format labels cleanly
  if (timeframe === "year" || timeframe === "7d" || rawStats.length <= 6) {
    return rawStats.map((item) => {
      const parts = item.date.split("-");
      if (parts.length === 2) {
        const monthIdx = Number(parts[1]) - 1;
        return {
          label: `${MONTH_NAMES[monthIdx] || parts[1]} ${parts[0].slice(2)}`,
          totalPatients: item.totalPatients,
          admittedPatients: item.admittedPatients,
        };
      }
      if (parts.length === 3) {
        const monthIdx = Number(parts[1]) - 1;
        return {
          label: `${MONTH_NAMES[monthIdx] || parts[1]} ${Number(parts[2])}`,
          totalPatients: item.totalPatients,
          admittedPatients: item.admittedPatients,
        };
      }
      return {
        label: item.date,
        totalPatients: item.totalPatients,
        admittedPatients: item.admittedPatients,
      };
    });
  }

  // Group daily records into clean weekly buckets (W1-W4/W5 per month) for readable waves
  const buckets = new Map<
    string,
    { label: string; totalPatients: number; admittedPatients: number }
  >();

  for (const item of rawStats) {
    const [yearStr, monthStr, dayStr] = item.date.split("-");
    const monthIdx = Number(monthStr) - 1;
    const day = Number(dayStr);

    if (!yearStr || Number.isNaN(monthIdx) || Number.isNaN(day)) {
      const existing = buckets.get(item.date) || {
        label: item.date,
        totalPatients: 0,
        admittedPatients: 0,
      };
      existing.totalPatients += item.totalPatients;
      existing.admittedPatients += item.admittedPatients;
      buckets.set(item.date, existing);
      continue;
    }

    const weekNum = Math.min(4, Math.ceil(day / 7));
    const key = `${yearStr}-${monthStr}-W${weekNum}`;
    const label = `${MONTH_NAMES[monthIdx] || monthStr} W${weekNum}`;

    const existing = buckets.get(key) || {
      label,
      totalPatients: 0,
      admittedPatients: 0,
    };
    existing.totalPatients += item.totalPatients;
    existing.admittedPatients += item.admittedPatients;
    buckets.set(key, existing);
  }

  return Array.from(buckets.values());
}

export function PatientsOverviewChart() {
  const [timeframe, setTimeframe] = useState("all");
  const { data, isLoading, isFetching } = useGetPatientsOverviewQuery(timeframe);
  const rawStats = data?.data?.dateStats || [];

  const chartData = useMemo(
    () => formatDateBuckets(rawStats, timeframe),
    [rawStats, timeframe]
  );

  return (
    <div className="rounded-xl border border-[#E5ECEE] bg-white p-5 shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EBF6F6] text-[#3F97A5]">
            <CalendarDays className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-[#143B42]">
              Date-based Statistics
            </h3>
            <p className="text-[11px] text-slate-400">
              Patient admissions by date
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Legend */}
          <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-600">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#3F97A5]" />
              <span>Total</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#143B42]" />
              <span>Admitted</span>
            </div>
          </div>

          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="h-8 rounded-full border border-[#DCEAEB] bg-[#F4FAFA] px-3 text-xs text-[#143B42] focus:outline-none focus:ring-1 focus:ring-[#3F97A5]"
          >
            <option value="all">All Time</option>
            <option value="30d">Last 30 Days</option>
            <option value="7d">Last 7 Days</option>
            <option value="year">This Year (Monthly)</option>
          </select>
        </div>
      </div>

      {/* Smooth Dual Area Chart */}
      <div className="h-[265px] w-full pt-4">
        {isLoading || isFetching ? (
          <div className="h-full w-full flex flex-col justify-between py-2">
            <div className="flex-1 flex items-end justify-around gap-3 px-4 pb-4 border-b border-l border-slate-100">
              <Skeleton className="flex-1 h-[38%] rounded-t-md" />
              <Skeleton className="flex-1 h-[62%] rounded-t-md" />
              <Skeleton className="flex-1 h-[46%] rounded-t-md" />
              <Skeleton className="flex-1 h-[84%] rounded-t-md" />
              <Skeleton className="flex-1 h-[54%] rounded-t-md" />
            </div>
            <div className="flex justify-between px-6 pt-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-3 w-12" />
              ))}
            </div>
          </div>
        ) : chartData.length === 0 ? (
          <div className="h-full flex items-center justify-center text-xs text-slate-400">
            No date-based statistics found for this range
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 12, right: 14, left: -20, bottom: 4 }}
            >
              <defs>
                <linearGradient id="totalGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3F97A5" stopOpacity={0.32} />
                  <stop offset="95%" stopColor="#3F97A5" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="admittedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#143B42" stopOpacity={0.22} />
                  <stop offset="95%" stopColor="#143B42" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="2 4"
                vertical={false}
                stroke="#E2E8F0"
              />
              <XAxis
                dataKey="label"
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                dy={6}
              />
              <YAxis
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #DCEAEB",
                  borderRadius: "10px",
                  fontSize: "12px",
                  boxShadow: "0 4px 12px rgba(20,59,66,0.08)",
                }}
              />
              <Area
                type="monotone"
                dataKey="totalPatients"
                name="Total Patients"
                stroke="#3F97A5"
                strokeWidth={2.5}
                fill="url(#totalGrad)"
                dot={{
                  r: 3.5,
                  fill: "#3F97A5",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 5.5,
                  fill: "#3F97A5",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
              />
              <Area
                type="monotone"
                dataKey="admittedPatients"
                name="Admitted"
                stroke="#143B42"
                strokeWidth={2}
                fill="url(#admittedGrad)"
                dot={{
                  r: 3,
                  fill: "#143B42",
                  stroke: "#ffffff",
                  strokeWidth: 1.5,
                }}
                activeDot={{
                  r: 5,
                  fill: "#143B42",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
