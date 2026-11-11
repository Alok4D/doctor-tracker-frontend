"use client";

import { useState } from "react";
import { Users, UserCheck, Calendar, Receipt, LayoutGrid } from "lucide-react";
import { StatsCard } from "@/features/dashboard/components/stats-card";
import { PatientsChart } from "@/features/dashboard/components/patients-chart";
import { DoctorsChart } from "@/features/dashboard/components/doctors-chart";
import { RecentTables } from "@/features/dashboard/components/recent-patients";
import { DashboardHeaderControls } from "@/features/dashboard/components/date-filter";
import { INITIAL_MOCK_DOCTORS } from "@/features/doctors/services/doctor-api";
import { INITIAL_MOCK_PATIENTS } from "@/features/patients/services/patient-api";
import { toast } from "sonner";

export default function DashboardPage() {
  const [timeframe, setTimeframe] = useState("last_week");
  const [doctors, setDoctors] = useState(INITIAL_MOCK_DOCTORS);
  const [patients, setPatients] = useState(INITIAL_MOCK_PATIENTS);

  const patientBreakdown = [
    { name: "Admitted", value: 1340, color: "#2563eb" },
    { name: "Discharged", value: 1550, color: "#94a3b8" },
    { name: "Transferred", value: 85, color: "#64748b" },
    { name: "Followup", value: 575, color: "#38bdf8" },
  ];

  const workloadData = [
    { name: "Doctors", patients: 680 },
    { name: "Nurses", patients: 590 },
    { name: "Volunteers", patients: 1600 },
    { name: "Pharmacists", patients: 1400 },
    { name: "Dietitians", patients: 580 },
    { name: "Others", patients: 190 },
  ];

  const handleDeleteDoctor = (id: string) => {
    setDoctors((prev) => prev.filter((d) => d.id !== id));
    toast.success("Doctor record deleted");
  };

  const handleDeletePatient = (id: string) => {
    setPatients((prev) => prev.filter((p) => p.id !== id));
    toast.success("Patient record deleted");
  };

  const handleExport = () => {
    toast.info("Exporting hospital overview report (CSV)...");
  };

  return (
    <div className="space-y-6">
      {/* Top Header Bar matching user's image */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <LayoutGrid className="h-5 w-5 text-blue-600" />
          <h1 className="text-lg font-bold text-slate-900 tracking-tight">
            Dashboard Overview
          </h1>
        </div>

        <DashboardHeaderControls
          timeframe={timeframe}
          onTimeframeChange={setTimeframe}
          onExport={handleExport}
        />
      </div>

      {/* Row 1: 4 KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Patients"
          value="3,550"
          change="+150% vs past month"
          isPositive={true}
          icon={Users}
        />
        <StatsCard
          title="Total Doctors"
          value="100"
          change="+20% vs past month"
          isPositive={true}
          icon={UserCheck}
        />
        <StatsCard
          title="Appointments"
          value="1,079"
          change="-5% vs past month"
          isPositive={false}
          icon={Calendar}
        />
        <StatsCard
          title="Total Earnings"
          value="$55,000"
          change="+220% vs past month"
          isPositive={true}
          icon={Receipt}
        />
      </div>

      {/* Row 2: Analytics & Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-5">
          <PatientsChart data={patientBreakdown} totalPatients={3550} />
        </div>
        <div className="lg:col-span-7">
          <DoctorsChart data={workloadData} />
        </div>
      </div>

      {/* Row 3: Quick Tables matching design image */}
      <RecentTables
        doctors={doctors}
        patients={patients}
        onDeleteDoctor={handleDeleteDoctor}
        onDeletePatient={handleDeletePatient}
      />
    </div>
  );
}
