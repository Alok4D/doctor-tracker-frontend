"use client";

import Link from "next/link";
import { Trash2, Edit2, Phone, Calendar, ExternalLink } from "lucide-react";
import { IPatient } from "@/types/patient.types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/shared/empty-state";

interface PatientTableProps {
  patients: IPatient[];
  isLoading?: boolean;
  onEdit?: (patient: IPatient) => void;
  onDelete: (id: string) => void;
  onAddNew?: () => void;
  showDoctorColumn?: boolean;
}

export function PatientTable({
  patients,
  isLoading = false,
  onEdit,
  onDelete,
  onAddNew,
  showDoctorColumn = true,
}: PatientTableProps) {
  if (isLoading) {
    return (
      <div className="space-y-2 p-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-12 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (patients.length === 0) {
    return (
      <EmptyState
        title="No patients found"
        description="Try adjusting your filter options or register a new patient."
        actionLabel={onAddNew ? "Register new patient" : undefined}
        onAction={onAddNew}
      />
    );
  }

  const getStatusVariant = (status: IPatient["status"]) => {
    switch (status) {
      case "Admitted":
        return "default";
      case "Followup":
        return "warning";
      case "Discharged":
        return "secondary";
      case "Transferred":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[240px]">Patient name</TableHead>
            <TableHead>Age & Gender</TableHead>
            <TableHead>Medical condition</TableHead>
            {showDoctorColumn && <TableHead>Assigned doctor</TableHead>}
            <TableHead>Contact</TableHead>
            <TableHead>Admission date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => {
            const id = patient._id;
            const doctorName =
              typeof patient.doctorId === "object" && patient.doctorId !== null
                ? (patient.doctorId as any).name
                : "Assigned Doctor";

            return (
              <TableRow key={id}>
                {/* Patient Avatar + Name */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-semibold text-slate-700 shrink-0 overflow-hidden">
                      {patient.avatarUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={patient.avatarUrl}
                          alt={patient.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        patient.name.slice(0, 2).toUpperCase()
                      )}
                    </div>
                    <div className="flex flex-col">
                      <Link
                        href={`/patients/${id}`}
                        className="font-medium text-slate-900 hover:text-blue-600 transition-colors flex items-center gap-1 group"
                      >
                        <span>{patient.name}</span>
                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                      <span className="text-[11px] text-slate-400">
                        ID: {id.slice(-6)}
                      </span>
                    </div>
                  </div>
                </TableCell>

                {/* Age & Gender */}
                <TableCell>
                  <span className="text-xs text-slate-700 font-medium">
                    {patient.age} yrs, {patient.gender}
                  </span>
                </TableCell>

                {/* Condition */}
                <TableCell>
                  <span className="text-xs font-medium text-slate-800">
                    {patient.condition}
                  </span>
                </TableCell>

                {/* Assigned Doctor */}
                {showDoctorColumn && (
                  <TableCell>
                    <span className="inline-flex items-center rounded-md px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium border border-blue-200/50">
                      {doctorName}
                    </span>
                  </TableCell>
                )}

                {/* Contact */}
                <TableCell>
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-600">
                    <Phone className="h-3 w-3 text-slate-400" />
                    {patient.phone}
                  </span>
                </TableCell>

                {/* Admission Date */}
                <TableCell>
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                    <Calendar className="h-3 w-3 text-slate-400" />
                    {patient.admissionDate || (patient.createdAt ? new Date(patient.createdAt).toLocaleDateString() : "Recent")}
                  </span>
                </TableCell>

                {/* Status */}
                <TableCell>
                  <Badge variant={getStatusVariant(patient.status)}>
                    <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                    <span>{patient.status}</span>
                  </Badge>
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/patients/${id}`}
                      className="rounded-md p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      title="View details"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                    {onEdit && (
                      <button
                        type="button"
                        onClick={() => onEdit(patient)}
                        className="rounded-md p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                        title="Edit patient"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onDelete(id)}
                      className="rounded-md p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Delete patient"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
