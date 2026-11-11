"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Doctor } from "@/features/doctors/types/doctor.types";
import { Patient } from "@/features/patients/types/patient.types";
import { PatientFormData } from "@/features/patients/schemas/patient.schema";
import { doctorService } from "@/features/doctors/services/doctor-api";
import { patientService } from "@/features/patients/services/patient-api";
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

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const doc = await doctorService.getDoctorById(doctorId);
        if (!doc) {
          toast.error("Doctor not found");
          return;
        }
        setDoctor(doc);
        const assignedPatients = await patientService.getPatientsByDoctorId(doctorId);
        setPatients(assignedPatients);
      } catch {
        toast.error("Failed to load doctor profile");
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [doctorId]);

  const handleAddPatient = async (data: PatientFormData) => {
    const newPat = await patientService.createPatient({
      ...data,
      doctorId,
    });
    setPatients((prev) => [newPat, ...prev]);
    toast.success("Patient assigned successfully");
    return true;
  };

  const handleDeletePatient = async (patientId: string) => {
    await patientService.deletePatient(patientId);
    setPatients((prev) => prev.filter((p) => p.id !== patientId));
    toast.success("Patient removed from this doctor");
  };

  if (isLoading) {
    return <LoadingSpinner size="lg" />;
  }

  if (!doctor) {
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
