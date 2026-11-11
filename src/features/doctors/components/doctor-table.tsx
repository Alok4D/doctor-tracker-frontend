"use client";

import Link from "next/link";
import { Trash2, ExternalLink, Users, Phone, Mail } from "lucide-react";
import { IDoctor } from "@/types/doctor.types";
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

interface DoctorTableProps {
  doctors: IDoctor[];
  isLoading?: boolean;
  onDelete: (id: string) => void;
  onAddNew?: () => void;
}

export function DoctorTable({
  doctors,
  isLoading = false,
  onDelete,
  onAddNew,
}: DoctorTableProps) {
  if (isLoading) {
    return (
      <div className="space-y-2 p-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-12 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <EmptyState
        title="No doctors found"
        description="Try adjusting your search criteria or add a new doctor record."
        actionLabel={onAddNew ? "Add new doctor" : undefined}
        onAction={onAddNew}
      />
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[280px]">Doctor name</TableHead>
            <TableHead>Specialization</TableHead>
            <TableHead>Hospital</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Assigned patients</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {doctors.map((doctor) => {
            const id = doctor._id;
            return (
              <TableRow key={id}>
                {/* Doctor Avatar + Name */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-blue-50 border border-blue-200/60 flex items-center justify-center text-xs font-semibold text-blue-700 shrink-0 overflow-hidden">
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
                    <div className="flex flex-col">
                      <Link
                        href={`/doctors/${id}`}
                        className="font-medium text-slate-900 hover:text-blue-600 transition-colors flex items-center gap-1 group"
                      >
                        <span>{doctor.name}</span>
                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                      <span className="text-[11px] text-slate-400">
                        ID: {id.slice(-6)}
                      </span>
                    </div>
                  </div>
                </TableCell>

                {/* Specialization */}
                <TableCell>
                  <span className="text-xs font-medium text-slate-700">
                    {doctor.specialization}
                  </span>
                </TableCell>

                {/* Hospital */}
                <TableCell>
                  <span className="text-xs text-slate-600">{doctor.hospital}</span>
                </TableCell>

                {/* Contact */}
                <TableCell>
                  <div className="flex flex-col text-xs text-slate-500 gap-0.5">
                    <span className="flex items-center gap-1.5">
                      <Phone className="h-3 w-3 text-slate-400" />
                      {doctor.phone}
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <Mail className="h-3 w-3" />
                      {doctor.email}
                    </span>
                  </div>
                </TableCell>

                {/* Assigned Patients Count */}
                <TableCell>
                  <Link
                    href={`/doctors/${id}`}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50/70 border border-blue-100 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition-colors"
                  >
                    <Users className="h-3.5 w-3.5" />
                    <span>{doctor.patientCount ?? 0} patients</span>
                  </Link>
                </TableCell>

                {/* Status */}
                <TableCell>
                  <Badge
                    variant={doctor.status === "Active" ? "success" : "secondary"}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        doctor.status === "Active"
                          ? "bg-emerald-500"
                          : "bg-slate-400"
                      }`}
                    />
                    <span>{doctor.status}</span>
                  </Badge>
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/doctors/${id}`}
                      className="p-1.5 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      title="View Details"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => onDelete(id)}
                      className="p-1.5 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Delete Doctor"
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
