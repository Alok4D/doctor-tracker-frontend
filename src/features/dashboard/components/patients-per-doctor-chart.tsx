"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Users, Loader } from "lucide-react";
import { useGetPatientsPerDoctorQuery } from "@/lib/feature/dashboard/dashboardApi";

export function PatientsPerDoctorChart() {
  const { data, isLoading } = useGetPatientsPerDoctorQuery();

  const chartData = (data?.data || []).slice(0, 6).map((item) => ({
    name: item.name.replace("Dr. ", ""),
    patients: item.patientCount,
    specialization: item.specialization,
  }));

  return (
    <div className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-xs flex flex-col justify-between h-full">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <Users className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Patients per Doctor
            </h3>
            <p className="text-[11px] text-slate-400">
              Active patient caseload distribution
            </p>
          </div>
        </div>
      </div>

      <div className="h-56 w-full pt-4 relative">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60">
            <Loader className="h-6 w-6 animate-spin text-blue-600" />
          </div>
        )}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -24, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
            />
            <XAxis
              dataKey="name"
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
              allowDecimals={false}
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
            <Bar
              dataKey="patients"
              name="Assigned Patients"
              fill="#2563eb"
              radius={[6, 6, 0, 0]}
              barSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

