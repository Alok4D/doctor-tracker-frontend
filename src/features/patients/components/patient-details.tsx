"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Phone,
  Calendar,
  HeartPulse,
  UserCheck,
  Shield,
  Edit2,
  Trash2,
  Building2,
  ExternalLink,
} from "lucide-react";
import { IPatient } from "@/types/patient.types";
import { IDoctor } from "@/types/doctor.types";
import {
  PatientForm,
  PatientSubmitPayload,
} from "@/features/patients/components/patient-form";
import { PatientDialog } from "@/features/patients/components/patient-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PatientDetailsProps {
  patient: IPatient;
  onUpdate: (data: PatientSubmitPayload) => Promise<boolean | void>;
  onDelete: () => Promise<void>;
  isDeleting?: boolean;
}

export function PatientDetails({
  patient,
  onUpdate,
  onDelete,
  isDeleting = false,
}: PatientDetailsProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const assignedDoctor =
    typeof patient.doctorId === "object" && patient.doctorId !== null
      ? (patient.doctorId as IDoctor)
      : null;

  const getStatusVariant = (status: IPatient["status"]) => {
    switch (status) {
      case "Admitted":
        return "default";
      case "Followup":
        return "warning";
      case "Discharged":
        return "outline";
      case "Transferred":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/patients"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#3F97A5] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to patients list</span>
        </Link>
      </div>

      {/* Patient Profile Banner Card */}
      <div className="rounded-2xl border border-[#E5ECEE] bg-white p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            {/* Portrait Avatar */}
            <div className="h-28 w-28 sm:h-32 sm:w-32 rounded-2xl bg-[#F4FAFA] border border-[#CBE6E8] flex items-center justify-center text-2xl font-bold text-[#143B42] shrink-0 overflow-hidden shadow-2xs">
              {patient.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={patient.avatarUrl}
                  alt={patient.name}
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                patient.name.slice(0, 2).toUpperCase()
              )}
            </div>

            {/* Primary Info */}
            <div className="space-y-2.5">
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-xl sm:text-2xl font-bold text-[#143B42] tracking-tight">
                    {patient.name}
                  </h1>
                  <Badge variant={getStatusVariant(patient.status)}>
                    {patient.status}
                  </Badge>
                </div>
                <p className="text-sm font-semibold text-[#3F97A5] mt-0.5">
                  {patient.condition}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Patient ID: {patient._id.slice(-8).toUpperCase()}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-600 pt-1">
                <span className="flex items-center gap-2">
                  <User className="h-3.5 w-3.5 text-[#3F97A5] shrink-0" />
                  <span>
                    {patient.age} years old, {patient.gender}
                  </span>
                </span>
                <span className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-[#3F97A5] shrink-0" />
                  <span>{patient.phone}</span>
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-[#3F97A5] shrink-0" />
                  <span>
                    Admitted:{" "}
                    {patient.admissionDate ||
                      (patient.createdAt
                        ? new Date(patient.createdAt).toLocaleDateString()
                        : "Recent")}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            <Button
              size="lg"
              variant="outline"
              onClick={() => setIsEditOpen(true)}
              className="rounded-md gap-1.5"
            >
              <Edit2 className="h-3.5 w-3.5 text-[#3F97A5]" />
              <span>Edit record</span>
            </Button>
            <Button
              size="lg"
              variant="destructive"
              onClick={onDelete}
              disabled={isDeleting}
              className="rounded-md gap-1.5"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>{isDeleting ? "Removing..." : "Delete"}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Clinical Details & Assigned Physician Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Clinical Summary Cards */}
        <div className="lg:col-span-7 rounded-2xl border border-[#E5ECEE] bg-white p-6 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-lg font-medium text-[#143B42]">
              Clinical & Admission Summary
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Patient demographics, diagnosis, and care plan overview
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-[#DCEAEB] bg-[#F7FAFA] p-4 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#EBF6F6] text-[#3F97A5] shrink-0">
                <User className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[11px] text-slate-500 font-medium">
                  Demographics
                </p>
                <p className="text-sm font-semibold text-[#143B42] mt-0.5">
                  {patient.age} years, {patient.gender}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-[#DCEAEB] bg-[#F7FAFA] p-4 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
                <HeartPulse className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[11px] text-slate-500 font-medium">
                  Medical Condition
                </p>
                <p className="text-sm font-semibold text-[#143B42] mt-0.5">
                  {patient.condition}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-[#DCEAEB] bg-[#F7FAFA] p-4 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-50 text-amber-600 shrink-0">
                <Calendar className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[11px] text-slate-500 font-medium">
                  Admission Date
                </p>
                <p className="text-sm font-semibold text-[#143B42] mt-0.5">
                  {patient.admissionDate ||
                    (patient.createdAt
                      ? new Date(patient.createdAt).toLocaleDateString()
                      : "Recent")}
                </p>
              </div>
            </div>

          
          </div>
        </div>

        {/* Right: Assigned Physician Card */}
        <div className="lg:col-span-5 rounded-2xl border border-[#E5ECEE] bg-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-100 pb-3 mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-[#143B42]">
                  Assigned Physician
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Attending doctor managing this patient
                </p>
              </div>
              <div className="p-2 rounded-lg bg-[#EBF6F6] text-[#3F97A5]">
                <UserCheck className="h-4 w-4" />
              </div>
            </div>

            {assignedDoctor ? (
              <div className="rounded-xl border border-[#DCEAEB] bg-[#F4FAFA] p-4 space-y-3">
                <div className="flex items-center gap-3.5">
                  <div className="h-12 w-12 rounded-xl bg-white border border-[#CBE6E8] flex items-center justify-center text-sm font-bold text-[#143B42] overflow-hidden shrink-0">
                    {assignedDoctor.avatarUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={assignedDoctor.avatarUrl}
                        alt={assignedDoctor.name}
                        className="h-full w-full object-cover object-top"
                      />
                    ) : (
                      assignedDoctor.name.slice(0, 2).toUpperCase()
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[#143B42] truncate">
                      {assignedDoctor.name}
                    </p>
                    <p className="text-xs font-medium text-[#3F97A5] truncate">
                      {assignedDoctor.specialization}
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 pt-1 border-t border-[#DCEAEB]">
                  {assignedDoctor.hospital && (
                    <p className="flex items-center gap-2">
                      <Building2 className="h-3.5 w-3.5 text-[#3F97A5] shrink-0" />
                      <span className="truncate">{assignedDoctor.hospital}</span>
                    </p>
                  )}
                  {assignedDoctor.phone && (
                    <p className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 text-[#3F97A5] shrink-0" />
                      <span>{assignedDoctor.phone}</span>
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-xs text-slate-500">
                Physician details unavailable.
              </div>
            )}
          </div>

          {assignedDoctor && (
            <Link
              href={`/doctors/${assignedDoctor._id}`}
              className="mt-4 inline-flex items-center justify-center gap-2 w-full rounded-full border border-[#CBE6E8] bg-[#EBF6F6]/60 hover:bg-[#EBF6F6] px-4 py-2.5 text-xs font-semibold text-[#143B42] transition-colors"
            >
              <span>View Doctor Profile & Patients</span>
              <ExternalLink className="h-3.5 w-3.5 text-[#3F97A5]" />
            </Link>
          )}
        </div>
      </div>

      {/* Edit Patient Dialog */}
      <PatientDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        initialAvatarUrl={patient.avatarUrl}
        initialData={{
          name: patient.name,
          age: patient.age,
          gender: patient.gender,
          condition: patient.condition,
          phone: patient.phone,
          doctorId: assignedDoctor?._id || (patient.doctorId as string),
          status: patient.status,
        }}
        title="Edit patient record"
        description="Update patient diagnosis, status, photo, or assigned physician."
        onSubmit={async (data) => {
          const ok = await onUpdate(data);
          if (ok !== false) {
            setIsEditOpen(false);
          }
        }}
      />
    </div>
  );
}

