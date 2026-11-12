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
import { TopDoctorsTable } from "@/features/dashboard/components/top-doctors-table";
import { RecentPatientsTable } from "@/features/dashboard/components/recent-patients-table";
import { QuickActions } from "@/features/dashboard/components/quick-actions";
import { PatientsPerDoctorChart } from "@/features/dashboard/components/patients-per-doctor-chart";
import { DoctorDialog } from "@/features/doctors/components/doctor-dialog";
import { PatientDialog } from "@/features/patients/components/patient-dialog";
import { DoctorSubmitPayload } from "@/features/doctors/components/doctor-form";
import { PatientSubmitPayload } from "@/features/patients/components/patient-form";
import { IPatient } from "@/types/patient.types";
import {
  useGetDashboardStatsQuery,
} from "@/lib/feature/dashboard/dashboardApi";
import {
  useGetDoctorsQuery,
  useCreateDoctorMutation,
  useDeleteDoctorMutation,
} from "@/lib/feature/doctor/doctorApi";
import {
  useGetPatientsQuery,
  useCreatePatientMutation,
  useUpdatePatientMutation,
  useDeletePatientMutation,
} from "@/lib/feature/patient/patientApi";
import { toast } from "sonner";

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("Last 30 Days");
  const [isAddDoctorOpen, setIsAddDoctorOpen] = useState(false);
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<IPatient | null>(null);

  // RTK Queries
  const { data: statsData } = useGetDashboardStatsQuery();
  const { data: doctorsData, isLoading: isLoadingDoctors } = useGetDoctorsQuery({ limit: 5 });
  const { data: patientsData, isLoading: isLoadingPatients } = useGetPatientsQuery({ limit: 5 });

  // RTK Mutations
  const [createDoctor] = useCreateDoctorMutation();
  const [deleteDoctor] = useDeleteDoctorMutation();
  const [createPatient] = useCreatePatientMutation();
  const [updatePatient] = useUpdatePatientMutation();
  const [deletePatient] = useDeletePatientMutation();

  const stats = statsData?.data;
  const topDoctors = doctorsData?.data || [];
  const recentPatients = patientsData?.data || [];

  // Sparkline data
  const sparklineDoctors = [
    { v: 16 }, { v: 18 }, { v: 21 }, { v: 19 }, { v: 22 }, { v: 20 }, { v: 24 },
  ];
  const sparklinePatients = [
    { v: 920 }, { v: 990 }, { v: 1040 }, { v: 1010 }, { v: 1140 }, { v: 1190 }, { v: 1250 },
  ];
  const sparklineAppointments = [
    { v: 680 }, { v: 740 }, { v: 710 }, { v: 800 }, { v: 830 }, { v: 870 }, { v: 892 },
  ];
  const sparklineActive = [
    { v: 18 }, { v: 19 }, { v: 21 }, { v: 20 }, { v: 22 }, { v: 21 }, { v: 22 },
  ];

  const handleCreateDoctor = async (data: DoctorSubmitPayload) => {
    try {
      await createDoctor(data).unwrap();
      toast.success("Doctor created successfully!");
      setIsAddDoctorOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create doctor");
    }
  };

  const handleDeleteDoctor = async (id: string) => {
    try {
      await deleteDoctor(id).unwrap();
      toast.success("Doctor removed successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete doctor");
    }
  };

  const handleCreateOrUpdatePatient = async (data: PatientSubmitPayload) => {
    try {
      if (editingPatient) {
        await updatePatient({
          id: editingPatient._id,
          body: data,
        }).unwrap();
        toast.success("Patient record updated successfully!");
      } else {
        await createPatient(data).unwrap();
        toast.success("Patient registered successfully!");
      }
      setIsAddPatientOpen(false);
      setEditingPatient(null);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to save patient record");
    }
  };

  const handleDeletePatient = async (id: string) => {
    try {
      await deletePatient(id).unwrap();
      toast.success("Patient record removed");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete patient");
    }
  };

  const handleEditPatient = (patient: IPatient) => {
    setEditingPatient(patient);
    setIsAddPatientOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Top Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Dashboard
            </h1>
            <span className="text-xl">👋</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Welcome back! Here&apos;s what&apos;s happening with your healthcare system today.
          </p>
        </div>

        {/* Time Period Filter Pill Button */}
        <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer self-start sm:self-auto">
          <CalendarDays className="h-4 w-4 text-slate-500" />
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-transparent border-none text-xs font-medium text-slate-700 focus:outline-none cursor-pointer pr-1"
          >
            <option value="Today">Today</option>
            <option value="Last 7 Days">Last 7 Days</option>
            <option value="Last 30 Days">Last 30 Days</option>
            <option value="This Year">This Year</option>
          </select>
        </div>
      </div>

      {/* Row 1: Four Sparkline KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Doctors"
          value={stats?.totalDoctors ?? 24}
          change="+ 12%"
          icon={UserCheck}
          sparklineData={sparklineDoctors}
          theme="blue"
        />
        <StatsCard
          title="Total Patients"
          value={stats?.totalPatients ?? 1250}
          change="+ 8%"
          icon={Users}
          sparklineData={sparklinePatients}
          theme="emerald"
        />
        <StatsCard
          title="Appointments"
          value={stats?.appointments ?? 892}
          change="+ 15%"
          icon={Calendar}
          sparklineData={sparklineAppointments}
          theme="purple"
        />
        <StatsCard
          title="Active Doctors"
          value={stats?.activeDoctors ?? 22}
          change="+ 5%"
          icon={CheckCircle2}
          sparklineData={sparklineActive}
          theme="orange"
        />
      </div>

      {/* Row 2: Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7">
          <PatientsOverviewChart />
        </div>
        <div className="lg:col-span-5">
          <DoctorsBySpecialtyChart />
        </div>
      </div>

      {/* Row 3: Top Doctors & New Patients Table Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <TopDoctorsTable
          doctors={topDoctors}
          isLoading={isLoadingDoctors}
          onDeleteDoctor={handleDeleteDoctor}
        />
        <RecentPatientsTable
          patients={recentPatients}
          isLoading={isLoadingPatients}
          onDeletePatient={handleDeletePatient}
          onEditPatient={handleEditPatient}
        />
      </div>

      {/* Row 4: Patients per Doctor Chart & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7">
          <PatientsPerDoctorChart />
        </div>
        <div className="lg:col-span-5">
          <QuickActions
            onAddDoctor={() => setIsAddDoctorOpen(true)}
            onAddPatient={() => {
              setEditingPatient(null);
              setIsAddPatientOpen(true);
            }}
          />
        </div>
      </div>

      {/* Add Doctor Dialog */}
      <DoctorDialog
        open={isAddDoctorOpen}
        onOpenChange={setIsAddDoctorOpen}
        onSubmit={handleCreateDoctor}
      />

      {/* Add / Edit Patient Dialog */}
      <PatientDialog
        open={isAddPatientOpen}
        onOpenChange={(open) => {
          setIsAddPatientOpen(open);
          if (!open) setEditingPatient(null);
        }}
        onSubmit={handleCreateOrUpdatePatient}
        initialAvatarUrl={editingPatient?.avatarUrl}
        initialData={
          editingPatient
            ? {
                name: editingPatient.name,
                age: editingPatient.age,
                gender: editingPatient.gender,
                condition: editingPatient.condition,
                phone: editingPatient.phone,
                doctorId:
                  typeof editingPatient.doctorId === "object"
                    ? editingPatient.doctorId._id
                    : editingPatient.doctorId,
                status: editingPatient.status,
              }
            : undefined
        }
        title={editingPatient ? "Edit Patient Record" : "Register New Patient"}
        description={
          editingPatient
            ? "Update clinical data and doctor assignment."
            : "Assign patient to a doctor and enter diagnosis information."
        }
      />
    </div>
  );
}
