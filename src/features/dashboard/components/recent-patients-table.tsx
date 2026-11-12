"use client";

import Link from "next/link";
import { ArrowRight, Trash2, Edit2, Eye } from "lucide-react";
import { IPatient } from "@/types/patient.types";
import { Skeleton } from "@/components/ui/skeleton";

interface RecentPatientsTableProps {
  patients: IPatient[];
  isLoading?: boolean;
  onDeletePatient?: (id: string) => void;
  onEditPatient?: (patient: IPatient) => void;
}

export function RecentPatientsTable({
  patients,
  isLoading,
  onDeletePatient,
  onEditPatient,
}: RecentPatientsTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Admitted":
        return "text-[#3F97A5] bg-[#3F97A5]";
      case "Discharged":
        return "text-slate-500 bg-slate-400";
      case "Followup":
        return "text-amber-600 bg-amber-500";
      case "Transferred":
        return "text-purple-600 bg-purple-500";
      default:
        return "text-slate-500 bg-slate-400";
    }
  };

  return (
    <div className="rounded-xl border border-[#E5ECEE] bg-white p-5 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
        <h3 className="text-sm font-bold text-[#143B42]">New Patients</h3>
        <Link
          href="/patients"
          className="text-xs font-semibold text-[#3F97A5] hover:text-[#143B42] flex items-center gap-1 group"
        >
          <span>View all</span>
          <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-semibold">
              <th className="pb-2.5">Name</th>
              <th className="pb-2.5">Condition / Dept</th>
              <th className="pb-2.5">Status</th>
              <th className="pb-2.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i}>
                  <td className="py-2.5">
                    <div className="flex items-center gap-2.5">
                      <Skeleton className="h-7 w-7 rounded-full shrink-0" />
                      <Skeleton className="h-3.5 w-28" />
                    </div>
                  </td>
                  <td className="py-2.5">
                    <Skeleton className="h-3.5 w-24" />
                  </td>
                  <td className="py-2.5">
                    <Skeleton className="h-4 w-16 rounded-full" />
                  </td>
                  <td className="py-2.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Skeleton className="h-6 w-6 rounded-md" />
                      <Skeleton className="h-6 w-6 rounded-md" />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <>
                {patients.slice(0, 5).map((patient) => {
              const patId = patient._id;
              const statusStyles = getStatusColor(patient.status);
              const [textColor, dotColor] = statusStyles.split(" ");

              return (
                <tr
                  key={patId}
                  className="hover:bg-slate-50/70 transition-colors"
                >
                  <td className="py-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="h-7 w-7 rounded-full bg-emerald-100 text-emerald-700 font-semibold flex items-center justify-center text-[10px] shrink-0 overflow-hidden">
                        {patient.avatarUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={patient.avatarUrl}
                            alt={patient.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          patient.name.slice(0, 2)
                        )}
                      </div>
                      <Link
                        href={`/patients/${patId}`}
                        className="font-medium text-slate-800 hover:text-[#3F97A5] transition-colors"
                      >
                        {patient.name}
                      </Link>
                    </div>
                  </td>
                  <td className="py-2.5 text-slate-600">{patient.condition}</td>
                  <td className="py-2.5">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${dotColor}`}
                      />
                      <span className={`font-medium ${textColor}`}>
                        {patient.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-2.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/patients/${patId}`}
                        className="p-1 rounded text-slate-400 hover:text-[#3F97A5] hover:bg-[#EBF6F6] transition-colors"
                        title="View Details"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </Link>
                      {onEditPatient && (
                        <button
                          type="button"
                          onClick={() => onEditPatient(patient)}
                          className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                      {onDeletePatient && (
                        <button
                          type="button"
                          onClick={() => onDeletePatient(patId)}
                          className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
            {!isLoading && patients.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="py-4 text-center text-slate-400 text-xs"
                >
                  No patients found
                </td>
              </tr>
            )}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

