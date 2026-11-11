"use client";

import { useState, useEffect, useCallback } from "react";
import { Patient, PatientFilterParams } from "../types/patient.types";
import { PatientFormData } from "../schemas/patient.schema";
import { patientService } from "../services/patient-api";
import { useDebounce } from "@/hooks/use-debounce";
import { toast } from "sonner";

export function usePatients(initialDoctorId?: string) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [condition, setCondition] = useState("all");
  const [doctorId, setDoctorId] = useState(initialDoctorId || "all");
  const [status, setStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  const debouncedSearch = useDebounce(search, 300);

  const fetchPatients = useCallback(async () => {
    setIsLoading(true);
    try {
      const params: PatientFilterParams = {
        page,
        limit,
        search: debouncedSearch,
        condition,
        doctorId: initialDoctorId || doctorId,
        status,
      };
      const res = await patientService.getPatients(params);
      setPatients(res.data);
      setTotal(res.pagination.total);
      setTotalPages(res.pagination.totalPages);
    } catch {
      toast.error("Failed to fetch patients list");
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, debouncedSearch, condition, doctorId, status, initialDoctorId]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const addPatient = async (data: PatientFormData) => {
    try {
      await patientService.createPatient(data);
      toast.success("Patient registered successfully");
      fetchPatients();
      return true;
    } catch {
      toast.error("Failed to add patient");
      return false;
    }
  };

  const editPatient = async (id: string, data: Partial<PatientFormData>) => {
    try {
      await patientService.updatePatient(id, data);
      toast.success("Patient updated successfully");
      fetchPatients();
      return true;
    } catch {
      toast.error("Failed to update patient");
      return false;
    }
  };

  const removePatient = async (id: string) => {
    try {
      await patientService.deletePatient(id);
      toast.success("Patient removed");
      fetchPatients();
      return true;
    } catch {
      toast.error("Failed to remove patient");
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
    fetchPatients,
    addPatient,
    editPatient,
    removePatient,
  };
}

