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
import { IDoctor } from "@/types/doctor.types";
import { IPatient } from "@/types/patient.types";
import { PatientSubmitPayload } from "@/features/patients/components/patient-form";
import { PatientTable } from "@/features/patients/components/patient-table";
import { PatientDialog } from "@/features/patients/components/patient-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import Image from "next/image";

interface DoctorDetailsProps {
  doctor: IDoctor;
  patients: IPatient[];
  onAddPatient: (data: PatientSubmitPayload) => Promise<boolean | void>;
  onDeletePatient: (patientId: string) => void;
}

export function DoctorDetails({
  doctor,
  patients,
  onAddPatient,
  onDeletePatient,
}: DoctorDetailsProps) {
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const docId = doctor._id;

  return (
    <div className="space-y-6">
      {/* Back link & Top bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/doctors"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#3F97A5] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to all doctors</span>
        </Link>
      </div>

      {/* Doctor Profile Banner Card */}
      <div className="rounded-xl border border-[#E5ECEE] bg-white p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="h-28 w-28 sm:h-32 sm:w-32  flex items-center justify-center text-2xl font-bold text-[#143B42] shrink-0 overflow-hidden shadow-2xs">
              {doctor.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <Image
                  src={doctor.avatarUrl}
                  alt={doctor.name}
                  className="h-full w-full object-cover object-top"
                  height={100}
                  width={200}
                />
              ) : (
                doctor.name.slice(0, 2).toUpperCase()
              )}
            </div>

            <div className="space-y-2.5">
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#143B42] tracking-tight">
                    {doctor.name}
                  </h2>
                  <Badge
                    variant={doctor.status === "Active" ? "success" : "destructive"}
                  >
                    {doctor.status}
                  </Badge>
                </div>
                <p className="text-sm font-semibold text-[#3F97A5] mt-0.5">
                  {doctor.specialization}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs text-slate-600 pt-1">
                <span className="flex items-center gap-2">
                  <Building2 className="h-3.5 w-3.5 text-[#3F97A5] shrink-0" />
                  <span className="truncate">{doctor.hospital}</span>
                </span>
                <span className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-[#3F97A5] shrink-0" />
                  <span>{doctor.phone}</span>
                </span>
                <span className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-[#3F97A5] shrink-0" />
                  <span className="truncate">{doctor.email}</span>
                </span>
                {doctor.createdAt && (
                  <span className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-[#3F97A5] shrink-0" />
                    <span>
                      Joined: {new Date(doctor.createdAt).toLocaleDateString()}
                    </span>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center rounded-md border border-[#DCEAEB] bg-[#F4FAFA] px-5 py-3.5 shrink-0">
            <span className="text-lg font-medium text-slate-500">
              Assigned Patients
            </span>
            <div className="flex items-center gap-2 text-2xl font-bold text-[#143B42] mt-1">
              <Users className="h-5 w-5 text-[#3F97A5]" />
              <span>{patients.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Corresponding Patients Section */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-xl font-medium text-slate-900">
              Assigned Patients for {doctor.name}
            </h3>
            <p className="text-sm text-slate-500">
              Manage and track medical records assigned to this physician.
            </p>
          </div>

          <Button
            size="lg"
            onClick={() => setIsAddPatientOpen(true)}
            className="gap-1.5 rounded-xs"
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
        lockedDoctorId={docId}
        title={`Assign patient to ${doctor.name}`}
        description="Fill in the patient's medical condition and contact info."
        onSubmit={async (data) => {
          const ok = await onAddPatient({ ...data, doctorId: docId });
          if (ok !== false) {
            setIsAddPatientOpen(false);
          }
        }}
      />
    </div>
  );
}
