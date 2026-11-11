"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { PatientFormData } from "@/features/patients/schemas/patient.schema";
import {
  useGetDoctorByIdQuery,
} from "@/lib/feature/doctor/doctorApi";
import {
  useCreatePatientMutation,
  useDeletePatientMutation,
} from "@/lib/feature/patient/patientApi";
import { DoctorDetails } from "@/features/doctors/components/doctor-details";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
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

  const handleAddPatient = async (formData: PatientFormData) => {
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
    return <LoadingSpinner size="lg" />;
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
