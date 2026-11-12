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

  const chartData = (data?.data || []).slice(0, 5).map((item) => ({
    name: item.name.replace("Dr. ", ""),
    fullName: item.name,
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

      <div className="flex-1 min-h-[330px] w-full pt-5">
        {isLoading ? (
          <div className="h-full flex flex-col justify-between py-2">
            <div className="flex-1 flex items-end justify-around gap-4 px-4 pb-3 border-b border-slate-100">
              <Skeleton className="w-11 h-[78%] rounded-lg" />
              <Skeleton className="w-11 h-[58%] rounded-lg" />
              <Skeleton className="w-11 h-[90%] rounded-lg" />
              <Skeleton className="w-11 h-[42%] rounded-lg" />
              <Skeleton className="w-11 h-[66%] rounded-lg" />
            </div>
            <div className="flex justify-around px-4 pt-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-3 w-12" />
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
              barCategoryGap="24%"
              margin={{ top: 12, right: 12, left: -20, bottom: 4 }}
            >
              <CartesianGrid
                strokeDasharray="2 4"
                vertical={false}
                stroke="#E2E8F0"
              />
              <XAxis
                dataKey="name"
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
                cursor={{ fill: "#F4FAFA", radius: 8 }}
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #DCEAEB",
                  borderRadius: "10px",
                  fontSize: "12px",
                  boxShadow: "0 4px 12px rgba(20,59,66,0.08)",
                }}
                formatter={(value) => [`${value} Patients`, "Assigned"]}
                labelFormatter={(_, payload) =>
                  payload?.[0]?.payload?.fullName
                    ? `${payload[0].payload.fullName} (${payload[0].payload.specialization})`
                    : ""
                }
              />
              <Bar
                dataKey="patients"
                name="Assigned Patients"
                fill="#439BA8"
                activeBar={{ fill: "#194D54" }}
                radius={0}
                maxBarSize={56}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
