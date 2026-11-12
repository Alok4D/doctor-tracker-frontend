"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { PatientSubmitPayload } from "@/features/patients/components/patient-form";
import {
  useGetDoctorByIdQuery,
} from "@/lib/feature/doctor/doctorApi";
import {
  useCreatePatientMutation,
  useDeletePatientMutation,
} from "@/lib/feature/patient/patientApi";
import { DoctorDetails } from "@/features/doctors/components/doctor-details";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function DoctorProfilePage({
  params,
}: {
  params: Promise<{ doctorId: string }>;
}) {
  const router = useRouter();
  const { doctorId } = use(params);

  const { data, isLoading, error } = useGetDoctorByIdQuery(doctorId);
  const [createPatientMutation] = useCreatePatientMutation();
  const [deletePatientMutation] = useDeletePatientMutation();

  const doctor = data?.data?.doctor;
  const patients = data?.data?.patients || [];

  const handleAddPatient = async (formData: PatientSubmitPayload) => {
    try {
      await createPatientMutation({
        ...formData,
        doctorId,
      }).unwrap();
      toast.success("Patient assigned successfully to this doctor");
      return true;
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to assign patient");
      return false;
    }
  };

  const handleDeletePatient = async (patientId: string) => {
    try {
      await deletePatientMutation(patientId).unwrap();
      toast.success("Patient removed from this doctor");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to remove patient");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-4 w-32" />

        {/* Doctor Profile Banner Skeleton */}
        <div className="rounded-xl border border-[#E5ECEE] bg-white p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <Skeleton className="h-28 w-28 sm:h-32 sm:w-32 rounded-lg shrink-0" />
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <Skeleton className="h-7 w-48" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="h-4 w-32" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 pt-1">
                  <Skeleton className="h-3.5 w-40" />
                  <Skeleton className="h-3.5 w-32" />
                  <Skeleton className="h-3.5 w-44" />
                  <Skeleton className="h-3.5 w-36" />
                </div>
              </div>
            </div>
            <Skeleton className="h-20 w-40 rounded-md shrink-0" />
          </div>
        </div>

        {/* Assigned Patients Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="space-y-1.5">
            <Skeleton className="h-5 w-52" />
            <Skeleton className="h-3.5 w-64" />
          </div>
          <Skeleton className="h-9 w-40 rounded-full" />
        </div>

        {/* Assigned Patients Table Skeleton */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center justify-between gap-4 py-2 border-b border-slate-100 last:border-0">
              <div className="flex items-center gap-3">
                <Skeleton className="h-9 w-9 rounded-full shrink-0" />
                <div className="space-y-1.5">
                  <Skeleton className="h-3.5 w-28" />
                  <Skeleton className="h-2.5 w-16" />
                </div>
              </div>
              <Skeleton className="h-3.5 w-20 hidden sm:block" />
              <Skeleton className="h-3.5 w-28 hidden md:block" />
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-7 w-16 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <h2 className="text-base font-semibold text-slate-900">Doctor not found</h2>
        <p className="mt-1 text-xs text-slate-500 mb-4">
          The requested doctor profile could not be located.
        </p>
        <Button size="sm" onClick={() => router.push("/doctors")} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to doctors list</span>
        </Button>
      </div>
    );
  }

  return (
    <DoctorDetails
      doctor={doctor}
      patients={patients}
      onAddPatient={handleAddPatient}
      onDeletePatient={handleDeletePatient}
    />
  );
}
