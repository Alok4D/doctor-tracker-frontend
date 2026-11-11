"use client";

import Link from "next/link";
import {
  Users,
  ArrowRight,
  UserPlus,
  UserCheck,
  Calendar,
  BarChart2,
  Sparkles,
} from "lucide-react";

interface RecentPatientsProps {
  onAddDoctorClick?: () => void;
  onAddPatientClick?: () => void;
}

const mockRecentPatients = [
  {
    id: "PID-001234",
    name: "Sarah Ahmed",
    deptOrId: "PID-001234",
    date: "Apr 27, 2025",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: "PID-001233",
    name: "Md. Rahim Khan",
    deptOrId: "General Medicine",
    date: "Apr 27, 2025",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: "PID-001232",
    name: "Fatema Akter",
    deptOrId: "PID-001232",
    date: "Apr 26, 2025",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: "PID-001231",
    name: "Tanvir Hasan",
    deptOrId: "PID-001231",
    date: "Apr 26, 2025",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
  },
];

export function RecentPatientsAndActions({
  onAddDoctorClick,
  onAddPatientClick,
}: RecentPatientsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
      {/* Recent Patients Table (approx 65% width) */}
      <div className="lg:col-span-7 rounded-xl border border-slate-200/90 bg-white p-5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Users className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Recent Patients</h3>
          </div>

          <Link
            href="/patients"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
          >
            <span>View All</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <tbody className="divide-y divide-slate-100">
              {mockRecentPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-slate-50/70 transition-colors">
                  {/* Avatar + Name */}
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full overflow-hidden border border-slate-200 shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={patient.avatar}
                          alt={patient.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="font-semibold text-slate-800">
                        {patient.name}
                      </span>
                    </div>
                  </td>

                  {/* ID / Dept */}
                  <td className="py-3 text-slate-500 font-medium">
                    {patient.deptOrId}
                  </td>

                  {/* Date */}
                  <td className="py-3 text-slate-400">
                    {patient.date}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3 text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                      {patient.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions (approx 35% width) */}
      <div className="lg:col-span-5 rounded-xl border border-slate-200/90 bg-white p-5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <Sparkles className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Quick Actions</h3>
        </div>

        <div className="grid grid-cols-2 gap-3 h-full items-stretch">
          {/* Action 1: Add Doctor */}
          <button
            onClick={onAddDoctorClick}
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-blue-100 bg-blue-50/50 hover:bg-blue-100/70 text-blue-700 transition-all gap-2 text-center group cursor-pointer"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white shadow-2xs group-hover:scale-105 transition-transform">
              <UserPlus className="h-5 w-5" />
            </div>
            <span className="text-xs font-semibold">Add Doctor</span>
          </button>

          {/* Action 2: Add Patient */}
          <button
            onClick={onAddPatientClick}
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-emerald-100 bg-emerald-50/50 hover:bg-emerald-100/70 text-emerald-700 transition-all gap-2 text-center group cursor-pointer"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-2xs group-hover:scale-105 transition-transform">
              <UserCheck className="h-5 w-5" />
            </div>
            <span className="text-xs font-semibold">Add Patient</span>
          </button>

          {/* Action 3: View Appointments */}
          <Link
            href="/dashboard"
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-purple-100 bg-purple-50/50 hover:bg-purple-100/70 text-purple-700 transition-all gap-2 text-center group cursor-pointer"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600 text-white shadow-2xs group-hover:scale-105 transition-transform">
              <Calendar className="h-5 w-5" />
            </div>
            <span className="text-xs font-semibold">View Appointments</span>
          </Link>

          {/* Action 4: View Analytics */}
          <Link
            href="/dashboard"
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-orange-100 bg-orange-50/50 hover:bg-orange-100/70 text-orange-700 transition-all gap-2 text-center group cursor-pointer"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600 text-white shadow-2xs group-hover:scale-105 transition-transform">
              <BarChart2 className="h-5 w-5" />
            </div>
            <span className="text-xs font-semibold">View Analytics</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
