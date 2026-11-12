"use client";

import { useMemo, useState } from "react";
import {
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { useGetPatientsOverviewQuery } from "@/lib/feature/dashboard/dashboardApi";
import { Skeleton } from "@/components/ui/skeleton";

export function PatientsOverviewChart() {
  const [timeframe, setTimeframe] = useState("all");
  const { data, isLoading, isFetching } = useGetPatientsOverviewQuery(timeframe);
  const rawStats = data?.data?.dateStats || [];

  const chartData = useMemo(() => {
    let runningTotal = 0;
    return rawStats.map((item) => {
      runningTotal += item.totalPatients;
      return {
        date: item.date,
        dailyPatients: item.totalPatients,
        admittedPatients: item.admittedPatients,
        cumulativeTotal: runningTotal,
      };
    });
  }, [rawStats]);

  return (
    <div className="rounded-xl border border-[#E5ECEE] bg-white p-5 shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EBF6F6] text-[#3F97A5]">
            <TrendingUp className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#143B42]">
              Date-based Statistics
            </h3>
            <p className="text-[11px] text-slate-400">
              Cumulative growth &amp; daily patient volume
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Legend */}
          <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-600">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#194D54]" />
              <span>Cumulative</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-[#7AE4F2]" />
              <span>On Date</span>
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

      {/* Composed Growth + Daily Volume Chart */}
      <div className="h-[265px] w-full pt-4">
        {isLoading || isFetching ? (
          <div className="h-full w-full flex flex-col justify-between py-2">
            <div className="flex-1 flex items-end justify-around gap-3 px-4 pb-4 border-b border-l border-slate-100">
              <Skeleton className="flex-1 h-[20%] rounded-t-md" />
              <Skeleton className="flex-1 h-[32%] rounded-t-md" />
              <Skeleton className="flex-1 h-[45%] rounded-t-md" />
              <Skeleton className="flex-1 h-[58%] rounded-t-md" />
              <Skeleton className="flex-1 h-[72%] rounded-t-md" />
              <Skeleton className="flex-1 h-[88%] rounded-t-md" />
            </div>
            <div className="flex justify-between px-6 pt-3">
              {Array.from({ length: 6 }).map((_, i) => (
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
            <ComposedChart
              data={chartData}
              margin={{ top: 12, right: 16, left: -20, bottom: 4 }}
            >
              <defs>
                <linearGradient id="cumulativeTeal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3F97A5" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#3F97A5" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="2 4"
                vertical={false}
                stroke="#E2E8F0"
              />
              <XAxis
                dataKey="date"
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
              <Bar
                dataKey="dailyPatients"
                name="Patients on Date"
                fill="#7AE4F2"
                radius={[6, 6, 0, 0]}
                maxBarSize={24}
              />
              <Area
                type="monotone"
                dataKey="cumulativeTotal"
                name="Cumulative Total"
                stroke="#194D54"
                strokeWidth={2.5}
                fill="url(#cumulativeTeal)"
                dot={{
                  r: 3,
                  fill: "#194D54",
                  stroke: "#ffffff",
                  strokeWidth: 1.5,
                }}
                activeDot={{
                  r: 5.5,
                  fill: "#3F97A5",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
