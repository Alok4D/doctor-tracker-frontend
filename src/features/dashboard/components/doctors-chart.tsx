"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Stethoscope } from "lucide-react";
import { useGetSpecialtyBreakdownQuery } from "@/lib/feature/dashboard/dashboardApi";
import { Skeleton } from "@/components/ui/skeleton";

const palette = [
  "#143B42",
  "#3F97A5",
  "#7ABEC7",
  "#B5DCE1",
  "#94A3B8",
  "#CBD5E1",
];

export function DoctorsBySpecialtyChart() {
  const { data, isLoading } = useGetSpecialtyBreakdownQuery();

  const specialtyData = (data?.data?.breakdown || []).map((item, idx) => ({
    ...item,
    color: palette[idx % palette.length],
  }));

  const totalDoctors = data?.data?.totalDoctors ?? 0;

  return (
    <div className="rounded-xl border border-[#E5ECEE] bg-white p-5 shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EBF6F6] text-[#3F97A5]">
          <Stethoscope className="h-4 w-4" />
        </div>
        <h3 className="text-sm font-bold text-[#143B42]">Doctors by Specialty</h3>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-4 py-4">
          <div className="sm:col-span-6 h-48 flex items-center justify-center">
            <div className="relative h-36 w-36 rounded-full border-[18px] border-slate-100 flex items-center justify-center">
              <Skeleton className="h-7 w-10 rounded-md" />
            </div>
          </div>
          <div className="sm:col-span-6 space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-2.5 w-2.5 rounded-full" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-3 w-10" />
              </div>
            ))}
          </div>
        </div>
      ) : specialtyData.length === 0 ? (
        <div className="h-56 flex items-center justify-center text-xs text-slate-400">
          No specialty data available
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-4 py-4">
          {/* Donut Chart with Centered Total */}
          <div className="sm:col-span-6 relative h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={specialtyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={74}
                  paddingAngle={3}
                  dataKey="count"
                  stroke="none"
                >
                  {specialtyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-[#143B42] leading-none">
                {totalDoctors}
              </span>
              <span className="text-[11px] font-medium text-slate-400 mt-1">
                Total
              </span>
            </div>
          </div>

          {/* Legend List on Right */}
          <div className="sm:col-span-6 space-y-2.5">
            {specialtyData.slice(0, 6).map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-slate-600 truncate max-w-[115px]">
                    {item.name}
                  </span>
                </div>
                <span className="font-semibold text-[#143B42]">
                  {item.count}{" "}
                  <span className="text-[11px] font-normal text-slate-400">
                    ({item.percentage})
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
