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
import { Users } from "lucide-react";
import { useGetPatientsPerDoctorQuery } from "@/lib/feature/dashboard/dashboardApi";
import { Skeleton } from "@/components/ui/skeleton";

export function PatientsPerDoctorChart() {
  
  const { data, isLoading } = useGetPatientsPerDoctorQuery();

  const chartData = (data?.data || []).slice(0, 6).map((item) => ({
    name: item.name.replace("Dr. ", ""),
    patients: item.patientCount,
    specialization: item.specialization,
  }));

  return (
    <div className="rounded-xl border border-[#E5ECEE] bg-white p-5 shadow-xs flex flex-col justify-between h-full">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EBF6F6] text-[#3F97A5]">
            <Users className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#143B42]">
              Patients per Doctor
            </h3>
            <p className="text-[11px] text-slate-400">
              Active patient caseload distribution
            </p>
          </div>
        </div>
      </div>

      <div className="h-56 w-full pt-4">
        {isLoading ? (
          <div className="h-full flex flex-col justify-between py-2">
            <div className="flex-1 flex items-end justify-around gap-3 px-4 pb-3 border-b border-l border-slate-100">
              <Skeleton className="w-7 h-[45%] rounded-t-md" />
              <Skeleton className="w-7 h-[80%] rounded-t-md" />
              <Skeleton className="w-7 h-[60%] rounded-t-md" />
              <Skeleton className="w-7 h-[90%] rounded-t-md" />
              <Skeleton className="w-7 h-[50%] rounded-t-md" />
              <Skeleton className="w-7 h-[70%] rounded-t-md" />
            </div>
            <div className="flex justify-around px-4 pt-2">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-3 w-10" />
              ))}
            </div>
          </div>
        ) : chartData.length === 0 ? (
          <div className="h-full flex items-center justify-center text-xs text-slate-400">
            No workload data available
          </div>
        ) : (
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
                fill="#3F97A5"
                radius={[6, 6, 0, 0]}
                barSize={28}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
