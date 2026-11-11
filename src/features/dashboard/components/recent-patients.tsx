import Link from "next/link";
import { Doctor } from "@/features/doctors/types/doctor.types";
import { Patient } from "@/features/patients/types/patient.types";
import { Trash2, Edit2, ArrowRight } from "lucide-react";

interface RecentTablesProps {
  doctors: Doctor[];
  patients: Patient[];
  onDeleteDoctor?: (id: string) => void;
  onDeletePatient?: (id: string) => void;
}

export function RecentTables({
  doctors,
  patients,
  onDeleteDoctor,
  onDeletePatient,
}: RecentTablesProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* Top Doctors Card */}
      <div className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
          <h3 className="text-sm font-bold text-slate-900">Top Doctors</h3>
          <Link
            href="/doctors"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>View all</span>
            <ArrowRight className="h-3 w-3" />
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
              {doctors.slice(0, 4).map((doctor) => (
                <tr key={doctor.id} className="hover:bg-slate-50/70">
                  <td className="py-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="h-7 w-7 rounded-full bg-blue-100 text-blue-700 font-semibold flex items-center justify-center text-[10px] shrink-0 overflow-hidden">
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
                        href={`/doctors/${doctor.id}`}
                        className="font-medium text-slate-800 hover:text-blue-600"
                      >
                        {doctor.name}
                      </Link>
                    </div>
                  </td>
                  <td className="py-2.5 text-slate-500">{doctor.specialization}</td>
                  <td className="py-2.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium ${
                        doctor.status === "Active"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          doctor.status === "Active"
                            ? "bg-blue-600"
                            : "bg-slate-400"
                        }`}
                      />
                      {doctor.status}
                    </span>
                  </td>
                  <td className="py-2.5 text-right">
                    <div className="inline-flex items-center gap-1 text-slate-400">
                      <button
                        onClick={() => onDeleteDoctor?.(doctor.id)}
                        className="hover:text-rose-600 p-1 rounded"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Patients Card */}
      <div className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
          <h3 className="text-sm font-bold text-slate-900">New Patients</h3>
          <Link
            href="/patients"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>View all</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-semibold">
                <th className="pb-2.5">Name</th>
                <th className="pb-2.5">Department</th>
                <th className="pb-2.5">Status</th>
                <th className="pb-2.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {patients.slice(0, 4).map((patient) => (
                <tr key={patient.id} className="hover:bg-slate-50/70">
                  <td className="py-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="h-7 w-7 rounded-full bg-slate-100 text-slate-700 font-semibold flex items-center justify-center text-[10px] shrink-0 overflow-hidden">
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
                      <span className="font-medium text-slate-800">
                        {patient.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-2.5 text-slate-500">{patient.condition}</td>
                  <td className="py-2.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium ${
                        patient.status === "Admitted"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          patient.status === "Admitted"
                            ? "bg-blue-600"
                            : "bg-amber-500"
                        }`}
                      />
                      {patient.status}
                    </span>
                  </td>
                  <td className="py-2.5 text-right">
                    <div className="inline-flex items-center gap-1 text-slate-400">
                      <button className="hover:text-blue-600 p-1 rounded">
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => onDeletePatient?.(patient.id)}
                        className="hover:text-rose-600 p-1 rounded"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

