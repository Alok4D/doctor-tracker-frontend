"use client";

import { useState } from "react";
import {
  UserCheck,
  Users,
  Calendar,
  CheckCircle2,
  CalendarDays,
} from "lucide-react";
import { StatsCard } from "@/features/dashboard/components/stats-card";
import { PatientsOverviewChart } from "@/features/dashboard/components/patients-chart";
import { DoctorsBySpecialtyChart } from "@/features/dashboard/components/doctors-chart";
import { RecentTables } from "@/features/dashboard/components/recent-patients";
import { DoctorDialog } from "@/features/doctors/components/doctor-dialog";
import { PatientDialog } from "@/features/patients/components/patient-dialog";
import { useDoctors } from "@/features/doctors/hooks/use-doctors";
import { usePatients } from "@/features/patients/hooks/use-patients";
import { INITIAL_MOCK_DOCTORS } from "@/features/doctors/services/doctor-api";
import { INITIAL_MOCK_PATIENTS } from "@/features/patients/services/patient-api";
import { Patient } from "@/features/patients/types/patient.types";
import { toast } from "sonner";

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("Last 30 Days");
  const [isAddDoctorOpen, setIsAddDoctorOpen] = useState(false);
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);

  const [topDoctors, setTopDoctors] = useState(INITIAL_MOCK_DOCTORS);
  const [recentPatients, setRecentPatients] = useState(INITIAL_MOCK_PATIENTS);

  const { addDoctor } = useDoctors();
  const { addPatient, editPatient } = usePatients();

  // Wave sparkline data for 4 KPI cards matching screenshot
  const sparklineDoctors = [
    { v: 16 },
    { v: 18 },
    { v: 21 },
    { v: 19 },
    { v: 22 },
    { v: 20 },
    { v: 24 },
  ];
  const sparklinePatients = [
    { v: 920 },
    { v: 990 },
    { v: 1040 },
    { v: 1010 },
    { v: 1140 },
    { v: 1190 },
    { v: 1250 },
  ];
  const sparklineAppointments = [
    { v: 680 },
    { v: 740 },
    { v: 710 },
    { v: 800 },
    { v: 830 },
    { v: 870 },
    { v: 892 },
  ];
  const sparklineActive = [
    { v: 18 },
    { v: 19 },
    { v: 21 },
    { v: 20 },
    { v: 22 },
    { v: 21 },
    { v: 22 },
  ];

  const handleDeleteDoctor = (id: string) => {
    setTopDoctors((prev) => prev.filter((d) => d.id !== id));
    toast.success("Doctor record deleted");
  };

  const handleDeletePatient = (id: string) => {
    setRecentPatients((prev) => prev.filter((p) => p.id !== id));
    toast.success("Patient record deleted");
  };

  const handleEditPatient = (patient: Patient) => {
    setEditingPatient(patient);
    setIsAddPatientOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Greeting matching user's image */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <span>Dashboard</span>
            <span className="text-xl">👋</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Welcome back! Here&apos;s what&apos;s happening with your healthcare system today.
          </p>
        </div>

        {/* Date Filter Dropdown */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 h-9 rounded-xl border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 shadow-2xs">
            <CalendarDays className="h-4 w-4 text-slate-500" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer pr-2"
            >
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Row 1: 4 Colored KPI Cards with Sparklines */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Doctors"
          value="24"
          change="↑ 12%"
          icon={UserCheck}
          sparklineData={sparklineDoctors}
          theme="blue"
        />

        <StatsCard
          title="Total Patients"
          value="1,250"
          change="↑ 8%"
          icon={Users}
          sparklineData={sparklinePatients}
          theme="emerald"
        />

        <StatsCard
          title="Appointments"
          value="892"
          change="↑ 15%"
          icon={Calendar}
          sparklineData={sparklineAppointments}
          theme="purple"
        />

        <StatsCard
          title="Active Doctors"
          value="22"
          change="↑ 5%"
          icon={CheckCircle2}
          sparklineData={sparklineActive}
          theme="orange"
        />
      </div>

      {/* Row 2: Charts (Patients Overview on left + Doctors by Specialty on right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-7">
          <PatientsOverviewChart />
        </div>
        <div className="lg:col-span-5">
          <DoctorsBySpecialtyChart />
        </div>
      </div>

      {/* Row 3: Top Doctors & New Patients Side-by-Side Tables (Matching Screenshot) */}
      <RecentTables
        doctors={topDoctors}
        patients={recentPatients}
        onDeleteDoctor={handleDeleteDoctor}
        onDeletePatient={handleDeletePatient}
        onEditPatient={handleEditPatient}
      />

      {/* Interactive Dialogs */}
      <DoctorDialog
        open={isAddDoctorOpen}
        onOpenChange={setIsAddDoctorOpen}
        onSubmit={addDoctor}
      />

      <PatientDialog
        open={isAddPatientOpen}
        onOpenChange={(open) => {
          setIsAddPatientOpen(open);
          if (!open) setEditingPatient(null);
        }}
        initialData={
          editingPatient
            ? {
                name: editingPatient.name,
                age: editingPatient.age,
                gender: editingPatient.gender,
                condition: editingPatient.condition,
                phone: editingPatient.phone,
                doctorId: editingPatient.doctorId,
                status: editingPatient.status,
              }
            : undefined
        }
        onSubmit={async (data) => {
          if (editingPatient) {
            await editPatient(editingPatient.id, data);
          } else {
            await addPatient(data);
          }
        }}
      />
    </div>
  );
}
