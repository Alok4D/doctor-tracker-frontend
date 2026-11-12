"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BarChart3, Loader } from "lucide-react";
import { useGetPatientsOverviewQuery } from "@/lib/feature/dashboard/dashboardApi";

const defaultWeeklyData = [
  { week: "Week 1", newPatients: 70, returningPatients: 42 },
  { week: "Week 2", newPatients: 120, returningPatients: 90 },
  { week: "Week 3", newPatients: 155, returningPatients: 118 },
  { week: "Week 4", newPatients: 172, returningPatients: 105 },
];

export function PatientsOverviewChart() {
  const { data, isLoading } = useGetPatientsOverviewQuery();
  const chartData = data?.data?.weeklyOverview || defaultWeeklyData;

  return (
    <div className="rounded-xl border border-[#E5ECEE] bg-white p-5 shadow-xs flex flex-col justify-between h-full">
      {/* Header matching design */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EBF6F6] text-[#3F97A5]">
            <BarChart3 className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-bold text-[#143B42]">Patients Overview</h3>
        </div>

        <div className="flex items-center gap-4">
          {/* Legend */}
          <div className="flex items-center gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#3F97A5]" />
              <span>New Patients</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#143B42]" />
              <span>Returning Patients</span>
            </div>
          </div>

          {/* Timeframe dropdown */}
          <select className="h-8 rounded-full border border-[#DCEAEB] bg-[#F4FAFA] px-3 text-xs text-[#143B42] focus:outline-none focus:ring-1 focus:ring-[#3F97A5]">
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Quarter</option>
          </select>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 w-full pt-4 relative">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60">
            <Loader className="h-6 w-6 animate-spin text-[#3F97A5]" />
          </div>
        )}
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3F97A5" stopOpacity={0.28} />
                <stop offset="95%" stopColor="#3F97A5" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorReturning" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#143B42" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#143B42" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="week"
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              ticks={[0, 50, 100, 150, 200]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            />
            <Area
              type="monotone"
              dataKey="newPatients"
              name="New Patients"
              stroke="#3F97A5"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorNew)"
              dot={{ r: 3.5, fill: "#3F97A5", strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
            <Area
              type="monotone"
              dataKey="returningPatients"
              name="Returning Patients"
              stroke="#143B42"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorReturning)"
              dot={{ r: 3.5, fill: "#143B42", strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
