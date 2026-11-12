"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Stethoscope, Loader } from "lucide-react";
import { useGetSpecialtyBreakdownQuery } from "@/lib/feature/dashboard/dashboardApi";

const palette = [
  "#143B42",
  "#3F97A5",
  "#7ABEC7",
  "#B5DCE1",
  "#94A3B8",
  "#CBD5E1",
];

const defaultSpecialtyData = [
  { name: "Cardiology", count: 6, percentage: "25%", color: "#143B42" },
  { name: "Neurology", count: 5, percentage: "21%", color: "#3F97A5" },
  { name: "Pediatrics", count: 5, percentage: "21%", color: "#7ABEC7" },
  { name: "General Medicine", count: 8, percentage: "33%", color: "#B5DCE1" },
];

export function DoctorsBySpecialtyChart() {
  const { data, isLoading } = useGetSpecialtyBreakdownQuery();

  const specialtyData =
    data?.data?.breakdown && data.data.breakdown.length > 0
      ? data.data.breakdown.map((item, idx) => ({
          ...item,
          color: palette[idx % palette.length],
        }))
      : defaultSpecialtyData;

  const totalDoctors =
    data?.data?.totalDoctors ||
    specialtyData.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="rounded-xl border border-[#E5ECEE] bg-white p-5 shadow-xs flex flex-col justify-between h-full">
      {/* Header matching design */}
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EBF6F6] text-[#3F97A5]">
          <Stethoscope className="h-4 w-4" />
        </div>
        <h3 className="text-sm font-bold text-[#143B42]">Doctors by Specialty</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-4 py-4 relative">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60">
            <Loader className="h-6 w-6 animate-spin text-[#3F97A5]" />
          </div>
        )}
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
    </div>
  );
}
