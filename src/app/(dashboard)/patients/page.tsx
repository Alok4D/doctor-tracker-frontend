"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";
import { usePatients } from "@/features/patients/hooks/use-patients";
import { PatientTable } from "@/features/patients/components/patient-table";
import { PatientSearch } from "@/features/patients/components/patient-search";
import { PatientFilters } from "@/features/patients/components/patient-filters";
import { PatientDialog } from "@/features/patients/components/patient-dialog";
import { IPatient } from "@/types/patient.types";
import { PatientFormData } from "@/features/patients/schemas/patient.schema";
import { PageHeader } from "@/components/shared/page-header";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

export default function PatientsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<IPatient | null>(null);

  const {
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
  } = usePatients();

  const handleOpenAdd = () => {
    setEditingPatient(null);
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (patient: IPatient) => {
    setEditingPatient(patient);
    setIsDialogOpen(true);
  };

  const handleSubmitPatient = async (data: PatientFormData) => {
    if (editingPatient) {
      return await editPatient(editingPatient._id, data);
    } else {
      return await addPatient(data);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Patients Management"
        description={`Centralized hospital patient records with condition filtering and physician assignments (${total} patients found).`}
      >
        <Button
          size="lg"
          onClick={handleOpenAdd}
          className="gap-1.5 rounded-xs bg-[#3F97A5] hover:bg-[#35818D]"
        >
          <UserPlus className="h-4 w-4" />
          <span>Register patient</span>
        </Button>
      </PageHeader>

      {/* Toolbar: Search & Condition/Doctor/Status filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <PatientSearch value={search} onChange={setSearch} />
        <PatientFilters
          condition={condition}
          onConditionChange={setCondition}
          doctorId={doctorId}
          onDoctorIdChange={setDoctorId}
          status={status}
          onStatusChange={setStatus}
          startDate={startDate}
          onStartDateChange={setStartDate}
          endDate={endDate}
          onEndDateChange={setEndDate}
        />
      </div>

      {/* Patients Master Table */}
      <PatientTable
        patients={patients}
        isLoading={isLoading}
        onEdit={handleOpenEdit}
        onDelete={removePatient}
        onAddNew={handleOpenAdd}
        showDoctorColumn={true}
      />

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {/* Register/Edit Patient Dialog */}
      <PatientDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        initialData={
          editingPatient
            ? {
                name: editingPatient.name,
                age: editingPatient.age,
                gender: editingPatient.gender,
                condition: editingPatient.condition,
                phone: editingPatient.phone,
                doctorId:
                  typeof editingPatient.doctorId === "object" && editingPatient.doctorId !== null
                    ? (editingPatient.doctorId as any)._id
                    : editingPatient.doctorId,
                status: editingPatient.status,
              }
            : undefined
        }
        title={editingPatient ? "Edit patient record" : "Register new patient"}
        description={
          editingPatient
            ? "Update patient diagnosis, condition, or assigned physician."
            : "Assign patient to a doctor and enter diagnosis information."
        }
        onSubmit={handleSubmitPatient}
      />
    </div>
  );
}
