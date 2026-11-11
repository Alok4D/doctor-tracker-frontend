"use client";

import Link from "next/link";
import { UserPlus, UserCheck, Calendar, BarChart2 } from "lucide-react";

interface QuickActionsProps {
  onAddDoctor: () => void;
  onAddPatient: () => void;
}

export function QuickActions({
  onAddDoctor,
  onAddPatient,
}: QuickActionsProps) {
  return (
    <div className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-xs">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
        <h3 className="text-sm font-bold text-slate-900">Quick Actions</h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Add Doctor Button */}
        <button
          type="button"
          onClick={onAddDoctor}
          className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-blue-100 bg-blue-50/50 hover:bg-blue-100/60 transition-colors text-center group cursor-pointer"
        >
          <div className="h-9 w-9 rounded-lg bg-blue-600 text-white flex items-center justify-center mb-2 group-hover:scale-105 transition-transform shadow-2xs">
            <UserCheck className="h-4 w-4" />
          </div>
          <span className="text-xs font-semibold text-blue-900">Add Doctor</span>
        </button>

        {/* Add Patient Button */}
        <button
          type="button"
          onClick={onAddPatient}
          className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-emerald-100 bg-emerald-50/50 hover:bg-emerald-100/60 transition-colors text-center group cursor-pointer"
        >
          <div className="h-9 w-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center mb-2 group-hover:scale-105 transition-transform shadow-2xs">
            <UserPlus className="h-4 w-4" />
          </div>
          <span className="text-xs font-semibold text-emerald-900">Add Patient</span>
        </button>

        {/* View Appointments */}
        <Link
          href="/patients"
          className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-purple-100 bg-purple-50/50 hover:bg-purple-100/60 transition-colors text-center group"
        >
          <div className="h-9 w-9 rounded-lg bg-purple-600 text-white flex items-center justify-center mb-2 group-hover:scale-105 transition-transform shadow-2xs">
            <Calendar className="h-4 w-4" />
          </div>
          <span className="text-xs font-semibold text-purple-900">View Patients</span>
        </Link>

        {/* View Doctors */}
        <Link
          href="/doctors"
          className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-orange-100 bg-orange-50/50 hover:bg-orange-100/60 transition-colors text-center group"
        >
          <div className="h-9 w-9 rounded-lg bg-orange-500 text-white flex items-center justify-center mb-2 group-hover:scale-105 transition-transform shadow-2xs">
            <BarChart2 className="h-4 w-4" />
          </div>
          <span className="text-xs font-semibold text-orange-900">All Doctors</span>
        </Link>
      </div>
    </div>
  );
}

