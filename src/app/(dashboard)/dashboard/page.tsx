"use client";

import { useState } from "react";
import {
  UserCheck,
  Users,
  Activity,
  HeartPulse,
  CalendarDays,
} from "lucide-react";
import { StatsCard } from "@/features/dashboard/components/stats-card";
import { PatientsOverviewChart } from "@/features/dashboard/components/patients-chart";
import { PatientsPerDoctorChart } from "@/features/dashboard/components/patients-per-doctor-chart";
import { useGetDashboardStatsQuery } from "@/lib/feature/dashboard/dashboardApi";

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("all");

  const { data: statsData, isLoading: isLoadingStats, isFetching: isFetchingStats } =
    useGetDashboardStatsQuery(timeRange);

  const stats = statsData?.data;
  const statsLoading = isLoadingStats || isFetchingStats;

  return (
    <div className="space-y-6">
      {/* Dashboard Top Header & Date Range Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-medium tracking-tight text-[#143B42]">
            Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time hospital analytics: doctors, patients, caseloads, and date-based statistics.
          </p>
        </div>

        {/* Date-based Statistics Filter */}
        <div className="inline-flex items-center gap-2 rounded-md border border-[#DCEAEB] bg-white px-4 py-2.5 text-sm font-medium text-[#143B42] hover:bg-[#F4FAFA] transition-colors cursor-pointer self-start sm:self-auto shadow-sm">
          <CalendarDays className="h-4 w-4 text-[#3F97A5]" />
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-transparent border-none text-xs font-medium text-[#143B42] focus:outline-none cursor-pointer pr-1"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Row 1: Core KPI Metric Cards (Total Doctors, Total Patients, Patients per Doctor, Admitted Patients) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatsCard
          title="Total Doctors"
          value={stats?.totalDoctors ?? 0}
          change =  {"All active physicians"}
          icon={UserCheck}
          isLoading={statsLoading}
        />
        <StatsCard
          title="Total Patients"
          value={stats?.totalPatients ?? 0}
          change="Registered in selected period"
          icon={Users}
          isLoading={statsLoading}
        />
        <StatsCard
          title="Avg. Patients / Doctor"
          value={stats?.avgPatientsPerDoctor ?? 0}
          change="Average doctor workload"
          icon={Activity}
          isLoading={statsLoading}
        />
        <StatsCard
          title="Admitted Patients"
          value={stats?.admittedPatients ?? 0}
          change="Currently under inpatient care"
          icon={HeartPulse}
          isLoading={statsLoading}
        />
      </div>

      {/* Row 2: Data Visualization Charts (Patients per Doctor + Date-based Statistics) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-6">
          <PatientsPerDoctorChart />
        </div>
        <div className="lg:col-span-6">
          <PatientsOverviewChart />
        </div>
      </div>
    </div>
  );
}
