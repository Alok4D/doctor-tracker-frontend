"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  useGetPatientByIdQuery,
  useUpdatePatientMutation,
  useDeletePatientMutation,
} from "@/lib/feature/patient/patientApi";
import { PatientDetails } from "@/features/patients/components/patient-details";
import { PatientSubmitPayload } from "@/features/patients/components/patient-form";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function PatientDetailPage({
  params,
}: {
  params: Promise<{ patientId: string }>;
}) {
  const router = useRouter();
  const { patientId } = use(params);

  const { data, isLoading, error } = useGetPatientByIdQuery(patientId);
  const [updatePatient] = useUpdatePatientMutation();
  const [deletePatient, { isLoading: isDeleting }] = useDeletePatientMutation();

  const patient = data?.data;

  const handleUpdate = async (formData: PatientSubmitPayload) => {
    try {
      await updatePatient({ id: patientId, body: formData }).unwrap();
      toast.success("Patient record updated successfully");
      return true;
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update patient");
      return false;
    }
  };

  const handleDelete = async () => {
    try {
      await deletePatient(patientId).unwrap();
      toast.success("Patient record deleted");
      router.push("/patients");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete patient");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-4 w-36" />

        {/* Patient Profile Banner Skeleton */}
        <div className="rounded-2xl border border-[#E5ECEE] bg-white p-6 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <Skeleton className="h-28 w-28 sm:h-32 sm:w-32 rounded-2xl shrink-0" />
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <Skeleton className="h-7 w-44" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                </div>
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-28" />
                <div className="flex flex-wrap gap-4 pt-1">
                  <Skeleton className="h-3.5 w-28" />
                  <Skeleton className="h-3.5 w-32" />
                  <Skeleton className="h-3.5 w-28" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Skeleton className="h-9 w-24 rounded-full" />
              <Skeleton className="h-9 w-20 rounded-full" />
            </div>
          </div>
        </div>

        {/* Clinical Summary & Assigned Physician Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-7 rounded-2xl border border-[#E5ECEE] bg-white p-6 shadow-xs space-y-5">
            <div className="border-b border-slate-100 pb-3 space-y-1.5">
              <Skeleton className="h-5 w-56" />
              <Skeleton className="h-3.5 w-72" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Skeleton className="h-20 rounded-xl" />
              <Skeleton className="h-20 rounded-xl" />
              <Skeleton className="h-20 rounded-xl" />
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl border border-[#E5ECEE] bg-white p-6 shadow-xs flex flex-col justify-between gap-5">
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div className="space-y-1.5">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-3.5 w-48" />
                </div>
                <Skeleton className="h-8 w-8 rounded-lg" />
              </div>
              <div className="rounded-xl border border-slate-100 p-4 flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-xl shrink-0" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            </div>
            <Skeleton className="h-9 w-full rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !patient) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <h2 className="text-base font-semibold text-slate-900">
          Patient not found
        </h2>
        <p className="mt-1 text-xs text-slate-500 mb-4">
          The requested patient record could not be found.
        </p>
        <Button
          size="sm"
          onClick={() => router.push("/patients")}
          className="gap-2 rounded-full"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to patients list</span>
        </Button>
      </div>
    );
  }

  return (
    <PatientDetails
      patient={patient}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      isDeleting={isDeleting}
    />
  );
}
