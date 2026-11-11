"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Stethoscope } from "lucide-react";

const specialtyData = [
  { name: "Cardiology", count: 6, percentage: "25%", color: "#2563eb" },
  { name: "Neurology", count: 5, percentage: "21%", color: "#10b981" },
  { name: "Pediatrics", count: 5, percentage: "21%", color: "#a855f7" },
  { name: "General Medicine", count: 8, percentage: "33%", color: "#f97316" },
];

export function DoctorsBySpecialtyChart() {
  
  const totalDoctors = specialtyData.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-xs flex flex-col justify-between h-full">
      {/* Header matching image */}
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <Stethoscope className="h-4 w-4" />
        </div>
        <h3 className="text-sm font-bold text-slate-900">Doctors by Specialty</h3>
      </div>

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
            <span className="text-2xl font-bold text-slate-900 leading-none">
              {totalDoctors}
            </span>
            <span className="text-[11px] font-medium text-slate-400 mt-1">
              Total
            </span>
          </div>
        </div>

        {/* Legend List on Right */}
        <div className="sm:col-span-6 space-y-3">
          {specialtyData.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-medium text-slate-700">{item.name}</span>
              </div>
              <span className="font-semibold text-slate-600">
                {item.count} ({item.percentage})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
