"use client";

import { Trash2, Edit2, Phone, Calendar } from "lucide-react";
import { Patient } from "../types/patient.types";
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
  patients: Patient[];
  isLoading?: boolean;
  onEdit?: (patient: Patient) => void;
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

  const getStatusVariant = (status: Patient["status"]) => {
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
          {patients.map((patient) => (
            <TableRow key={patient.id}>
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
                    <span className="font-medium text-slate-900">
                      {patient.name}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {patient.id}
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
                    {patient.doctorName || "Assigned Doctor"}
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
                  {patient.admissionDate}
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
                  {onEdit && (
                    <button
                      onClick={() => onEdit(patient)}
                      className="rounded-md p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      title="Edit patient"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => onDelete(patient.id)}
                    className="rounded-md p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Delete patient"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

