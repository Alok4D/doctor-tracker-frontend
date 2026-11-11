"use client";

import { useState, useEffect, useCallback } from "react";
import { Doctor, DoctorFilterParams } from "../types/doctor.types";
import { DoctorFormData } from "../schemas/doctor.schema";
import { doctorService } from "../services/doctor-api";
import { useDebounce } from "@/hooks/use-debounce";
import { toast } from "sonner";

export function useDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  const debouncedSearch = useDebounce(search, 300);

  const fetchDoctors = useCallback(async () => {
    setIsLoading(true);
    try {
      const params: DoctorFilterParams = {
        page,
        limit,
        search: debouncedSearch,
        specialization,
      };
      const res = await doctorService.getDoctors(params);
      setDoctors(res.data);
      setTotal(res.pagination.total);
      setTotalPages(res.pagination.totalPages);
    } catch {
      toast.error("Failed to fetch doctors list");
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, debouncedSearch, specialization]);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const addDoctor = async (data: DoctorFormData) => {
    try {
      await doctorService.createDoctor(data);
      toast.success("Doctor added successfully");
      fetchDoctors();
      return true;
    } catch {
      toast.error("Failed to add doctor");
      return false;
    }
  };

  const removeDoctor = async (id: string) => {
    try {
      await doctorService.deleteDoctor(id);
      toast.success("Doctor removed");
      fetchDoctors();
      return true;
    } catch {
      toast.error("Failed to remove doctor");
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
    fetchDoctors,
    addDoctor,
    removeDoctor,
  };
}
