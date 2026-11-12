"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";
import { useDoctors } from "@/features/doctors/hooks/use-doctors";
import { DoctorTable } from "@/features/doctors/components/doctor-table";
import { DoctorSearch } from "@/features/doctors/components/doctor-search";
import { DoctorFilters } from "@/features/doctors/components/doctor-filters";
import { DoctorDialog } from "@/features/doctors/components/doctor-dialog";
import { PageHeader } from "@/components/shared/page-header";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

export default function DoctorsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
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
  } = useDoctors();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Doctors Management"
        description={`Manage hospital physicians and view assigned patients (${total} doctors found).`}
      >
        <Button
          size="sm"
          onClick={() => setIsDialogOpen(true)}
          className="gap-1.5 rounded-full bg-[#3F97A5] hover:bg-[#35818D]"
        >
          <UserPlus className="h-4 w-4" />
          <span>Add doctor</span>
        </Button>
      </PageHeader>

      {/* Toolbar: Search, Specialization, Status & Date filter */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <DoctorSearch value={search} onChange={setSearch} />
        <DoctorFilters
          specialization={specialization}
          onSpecializationChange={setSpecialization}
          status={status}
          onStatusChange={setStatus}
          startDate={startDate}
          onStartDateChange={setStartDate}
          endDate={endDate}
          onEndDateChange={setEndDate}
        />
      </div>

      {/* Doctors Table */}
      <DoctorTable
        doctors={doctors}
        isLoading={isLoading}
        onDelete={removeDoctor}
        onAddNew={() => setIsDialogOpen(true)}
      />

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {/* Add Doctor Dialog */}
      <DoctorDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={addDoctor}
      />
    </div>
  );
}
