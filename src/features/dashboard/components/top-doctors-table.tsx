"use client";

import Link from "next/link";
import { ArrowRight, Trash2, Eye } from "lucide-react";
import { IDoctor } from "@/types/doctor.types";
import { Badge } from "@/components/ui/badge";

interface TopDoctorsTableProps {
  doctors: IDoctor[];
  isLoading?: boolean;
  onDeleteDoctor?: (id: string) => void;
}

export function TopDoctorsTable({
  doctors,
  isLoading,
  onDeleteDoctor,
}: TopDoctorsTableProps) {
  return (
    <div className="rounded-xl border border-[#E5ECEE] bg-white p-5 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
        <h3 className="text-sm font-bold text-[#143B42]">Top Doctors</h3>
        <Link
          href="/doctors"
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
              <th className="pb-2.5">Doctor</th>
              <th className="pb-2.5">Department</th>
              <th className="pb-2.5">Status</th>
              <th className="pb-2.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {doctors.slice(0, 5).map((doctor) => {
              const docId = doctor._id;
              return (
                <tr
                  key={docId}
                  className="hover:bg-slate-50/70 transition-colors"
                >
                  <td className="py-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="h-7 w-7 rounded-full bg-[#EBF6F6] text-[#143B42] font-semibold flex items-center justify-center text-[10px] shrink-0 overflow-hidden">
                        {doctor.avatarUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={doctor.avatarUrl}
                            alt={doctor.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          doctor.name.slice(0, 2)
                        )}
                      </div>
                      <Link
                        href={`/doctors/${docId}`}
                        className="font-medium text-slate-800 hover:text-[#3F97A5] transition-colors"
                      >
                        {doctor.name}
                      </Link>
                    </div>
                  </td>
                  <td className="py-2.5 text-slate-600">
                    {doctor.specialization}
                  </td>
                  <td className="py-2.5">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          doctor.status === "Active"
                            ? "bg-[#3F97A5]"
                            : "bg-slate-400"
                        }`}
                      />
                      <span
                        className={`font-medium ${
                          doctor.status === "Active"
                            ? "text-[#3F97A5]"
                            : "text-slate-500"
                        }`}
                      >
                        {doctor.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-2.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/doctors/${docId}`}
                        className="p-1 rounded text-slate-400 hover:text-[#3F97A5] hover:bg-[#EBF6F6] transition-colors"
                        title="View Doctor Profile"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </Link>
                      {onDeleteDoctor && (
                        <button
                          type="button"
                          onClick={() => onDeleteDoctor(docId)}
                          className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Doctor"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
            {doctors.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="py-4 text-center text-slate-400 text-xs"
                >
                  {isLoading ? "Loading doctors..." : "No doctors found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

