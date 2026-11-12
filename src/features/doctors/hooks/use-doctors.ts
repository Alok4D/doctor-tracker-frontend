"use client";

import { useState } from "react";
import { DoctorSubmitPayload } from "../components/doctor-form";
import {
  useGetDoctorsQuery,
  useCreateDoctorMutation,
  useDeleteDoctorMutation,
} from "@/lib/feature/doctor/doctorApi";
import { useDebounce } from "@/hooks/use-debounce";
import { toast } from "sonner";

export function useDoctors() {
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [search, setSearchState] = useState("");
  const [specialization, setSpecializationState] = useState("all");
  const [status, setStatusState] = useState("all");
  const [startDate, setStartDateState] = useState("");
  const [endDate, setEndDateState] = useState("");

  const debouncedSearch = useDebounce(search, 300);

  const setSearch = (val: string) => {
    setSearchState(val);
    setPage(1);
  };

  const setSpecialization = (val: string) => {
    setSpecializationState(val);
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

  const { data, isLoading } = useGetDoctorsQuery({
    page,
    limit,
    searchTerm: debouncedSearch || undefined,
    specialization: specialization === "all" ? undefined : specialization,
    status: status === "all" ? undefined : status,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
  });

  const [createDoctorMutation] = useCreateDoctorMutation();
  const [deleteDoctorMutation] = useDeleteDoctorMutation();

  const doctors = data?.data || [];
  const meta = data?.meta;
  const total = meta?.total ?? doctors.length;
  const totalPages = meta?.totalPage ?? 1;

  const addDoctor = async (formData: DoctorSubmitPayload) => {
    try {
      await createDoctorMutation(formData).unwrap();
      toast.success("Doctor added successfully");
      return true;
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to add doctor");
      return false;
    }
  };

  const removeDoctor = async (id: string) => {
    try {
      await deleteDoctorMutation(id).unwrap();
      toast.success("Doctor removed successfully");
      return true;
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to remove doctor");
      return false;
    }
  };

  return {
    doctors,
    total,
    totalPages,
    page,
    setPage,
    search,
    setSearch,
    specialization,
    setSpecialization,
    status,
    setStatus,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    isLoading,
    addDoctor,
    removeDoctor,
  };
}
