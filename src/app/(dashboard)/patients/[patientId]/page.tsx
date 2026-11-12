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
import { LoadingSpinner } from "@/components/shared/loading-spinner";
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
    return <LoadingSpinner size="lg" />;
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
