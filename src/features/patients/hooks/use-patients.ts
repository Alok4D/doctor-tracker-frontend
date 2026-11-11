"use client";

import { useState } from "react";
import { PatientFormData } from "../schemas/patient.schema";
import {
  useGetPatientsQuery,
  useCreatePatientMutation,
  useUpdatePatientMutation,
  useDeletePatientMutation,
} from "@/lib/feature/patient/patientApi";
import { useDebounce } from "@/hooks/use-debounce";
import { toast } from "sonner";

export function usePatients(initialDoctorId?: string) {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [condition, setCondition] = useState("all");
  const [doctorId, setDoctorId] = useState(initialDoctorId || "all");
  const [status, setStatus] = useState("all");

  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading } = useGetPatientsQuery({
    page,
    limit,
    searchTerm: debouncedSearch || undefined,
    condition: condition === "all" ? undefined : condition,
    doctorId: doctorId === "all" ? undefined : doctorId,
    status: status === "all" ? undefined : status,
  });

  const [createPatientMutation] = useCreatePatientMutation();
  const [updatePatientMutation] = useUpdatePatientMutation();
  const [deletePatientMutation] = useDeletePatientMutation();

  const patients = data?.data?.data || [];
  const meta = data?.data?.meta;
  const total = meta?.total ?? patients.length;
  const totalPages = meta?.totalPage ?? 1;

  const addPatient = async (formData: PatientFormData) => {
    try {
      await createPatientMutation(formData).unwrap();
      toast.success("Patient registered successfully");
      return true;
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to add patient");
      return false;
    }
  };

  const editPatient = async (id: string, formData: Partial<PatientFormData>) => {
    try {
      await updatePatientMutation({
        id,
        body: formData,
      }).unwrap();
      toast.success("Patient updated successfully");
      return true;
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update patient");
      return false;
    }
  };

  const removePatient = async (id: string) => {
    try {
      await deletePatientMutation(id).unwrap();
      toast.success("Patient removed successfully");
      return true;
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to remove patient");
      return false;
    }
  };

  return {
    patients,
    total,
    totalPages,
    page,
    setPage,
    search,
    setSearch,
    condition,
    setCondition,
    doctorId,
    setDoctorId,
    status,
    setStatus,
    isLoading,
    addPatient,
    editPatient,
    removePatient,
  };
}
