"use client";

import { useState } from "react";
import { PatientSubmitPayload } from "../components/patient-form";
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
  const [search, setSearchState] = useState("");
  const [condition, setConditionState] = useState("all");
  const [doctorId, setDoctorIdState] = useState(initialDoctorId || "all");
  const [status, setStatusState] = useState("all");
  const [startDate, setStartDateState] = useState("");
  const [endDate, setEndDateState] = useState("");

  const debouncedSearch = useDebounce(search, 300);

  const setSearch = (val: string) => {
    setSearchState(val);
    setPage(1);
  };

  const setCondition = (val: string) => {
    setConditionState(val);
    setPage(1);
  };

  const setDoctorId = (val: string) => {
    setDoctorIdState(val);
    setPage(1);
  };

  const setStatus = (val: string) => {
    setStatusState(val);
    setPage(1);
  };

  const setStartDate = (val: string) => {
    setStartDateState(val);
    setPage(1);
  };

  const setEndDate = (val: string) => {
    setEndDateState(val);
    setPage(1);
  };

  const { data, isLoading } = useGetPatientsQuery({
    page,
    limit,
    searchTerm: debouncedSearch || undefined,
    condition: condition === "all" ? undefined : condition,
    doctorId: doctorId === "all" ? undefined : doctorId,
    status: status === "all" ? undefined : status,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
  });

  const [createPatientMutation] = useCreatePatientMutation();
  const [updatePatientMutation] = useUpdatePatientMutation();
  const [deletePatientMutation] = useDeletePatientMutation();

  const patients = data?.data || [];
  const meta = data?.meta;
  const total = meta?.total ?? patients.length;
  const totalPages = meta?.totalPage ?? 1;

  const addPatient = async (formData: PatientSubmitPayload) => {
    try {
      await createPatientMutation(formData).unwrap();
      toast.success("Patient registered successfully");
      return true;
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to add patient");
      return false;
    }
  };

  const editPatient = async (id: string, formData: Partial<PatientSubmitPayload>) => {
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
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    isLoading,
    addPatient,
    editPatient,
    removePatient,
  };
}
