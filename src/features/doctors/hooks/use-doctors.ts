"use client";

import { useState } from "react";
import { DoctorFormData } from "../schemas/doctor.schema";
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
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("all");

  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading } = useGetDoctorsQuery({
    page,
    limit,
    searchTerm: debouncedSearch || undefined,
    specialization: specialization === "all" ? undefined : specialization,
  });

  const [createDoctorMutation] = useCreateDoctorMutation();
  const [deleteDoctorMutation] = useDeleteDoctorMutation();

  const doctors = data?.data?.data || [];
  const meta = data?.data?.meta;
  const total = meta?.total ?? doctors.length;
  const totalPages = meta?.totalPage ?? 1;

  const addDoctor = async (formData: DoctorFormData) => {
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
    isLoading,
    addDoctor,
    removeDoctor,
  };
}
