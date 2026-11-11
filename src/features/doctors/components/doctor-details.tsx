"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  UserPlus,
  Phone,
  Mail,
  Building2,
  Calendar,
  Users,
} from "lucide-react";
import { Doctor } from "../types/doctor.types";
import { Patient } from "@/features/patients/types/patient.types";
import { PatientFormData } from "@/features/patients/schemas/patient.schema";
import { PatientTable } from "@/features/patients/components/patient-table";
import { PatientDialog } from "@/features/patients/components/patient-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface DoctorDetailsProps {
  doctor: Doctor;
  patients: Patient[];
  onAddPatient: (data: PatientFormData) => Promise<boolean | void>;
  onDeletePatient: (patientId: string) => void;
}

export function DoctorDetails({
  doctor,
  patients,
  onAddPatient,
  onDeletePatient,
}: DoctorDetailsProps) {
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Back link & Top bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/doctors"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to all doctors</span>
        </Link>
      </div>

      {/* Doctor Profile Banner Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-blue-100 border-2 border-blue-200 flex items-center justify-center text-lg font-bold text-blue-700 shrink-0 overflow-hidden">
              {doctor.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={doctor.avatarUrl}
                  alt={doctor.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                doctor.name.slice(0, 2).toUpperCase()
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">
                  {doctor.name}
                </h2>
                <Badge
                  variant={doctor.status === "Active" ? "success" : "secondary"}
                >
                  {doctor.status}
                </Badge>
              </div>
              <p className="text-xs font-medium text-blue-600 mt-0.5">
                {doctor.specialization}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-2">
                <span className="flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5 text-slate-400" />
                  {doctor.hospital}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-slate-400" />
                  {doctor.phone}
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-slate-400" />
                  {doctor.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  Joined: {doctor.createdAt}
                </span>
              </div>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 sm:border-l border-slate-100 pt-3 sm:pt-0 sm:pl-6 shrink-0">
            <span className="text-xs text-slate-400">Assigned Patients</span>
            <div className="flex items-center gap-1.5 text-2xl font-bold text-blue-600 mt-0.5">
              <Users className="h-5 w-5" />
              <span>{patients.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Corresponding Patients Section */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Assigned Patients for {doctor.name}
            </h3>
            <p className="text-xs text-slate-500">
              Manage and track medical records assigned to this physician.
            </p>
          </div>

          <Button
            size="sm"
            onClick={() => setIsAddPatientOpen(true)}
            className="gap-1.5"
          >
            <UserPlus className="h-4 w-4" />
            <span>Add patient to doctor</span>
          </Button>
        </div>

        <PatientTable
          patients={patients}
          showDoctorColumn={false}
          onDelete={onDeletePatient}
          onAddNew={() => setIsAddPatientOpen(true)}
        />
      </div>

      {/* Dialog to assign new patient to this doctor */}
      <PatientDialog
        open={isAddPatientOpen}
        onOpenChange={setIsAddPatientOpen}
        lockedDoctorId={doctor.id}
        title={`Assign patient to ${doctor.name}`}
        description="Fill in the patient's medical condition and contact info."
        onSubmit={async (data) => {
          const ok = await onAddPatient({ ...data, doctorId: doctor.id });
          if (ok !== false) {
            toast.success(`Patient assigned to ${doctor.name}`);
            setIsAddPatientOpen(false);
          }
        }}
      />
    </div>
  );
}
