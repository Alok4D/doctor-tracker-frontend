"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { PatientBreakdownItem } from "../types/dashboard.types";
import { MoreHorizontal } from "lucide-react";

interface PatientsChartProps {
  data: PatientBreakdownItem[];
  totalPatients: number;
}

export function PatientsChart({ data, totalPatients }: PatientsChartProps) {
  return (
    <div className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-xs flex flex-col justify-between h-full">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-sm font-bold text-slate-900">Patients</h3>
        <button
          className="rounded p-1 text-slate-400 hover:text-slate-600"
          aria-label="Options"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4 py-4">
        {/* Donut Chart with Centered Total */}
        <div className="relative h-48 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={75}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[11px] font-medium text-slate-400">
              Total Patients
            </span>
            <span className="text-xl font-bold text-slate-800">
              {totalPatients.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Legend List */}
        <div className="space-y-2.5">
          {data.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-medium text-slate-600">{item.name}</span>
              </div>
              <span className="font-semibold text-slate-800">
                {item.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

