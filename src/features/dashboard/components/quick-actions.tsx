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
    <div className="rounded-xl border border-[#E5ECEE] bg-white p-5 shadow-xs h-full flex flex-col justify-between">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
        <h3 className="text-sm font-bold text-[#143B42]">Quick Actions</h3>
      </div>

      <div className="grid grid-cols-2 gap-3 my-auto">
        {/* Add Doctor Button */}
        <button
          type="button"
          onClick={onAddDoctor}
          className="flex flex-col items-center justify-center p-4 rounded-xl border border-[#CBE6E8] bg-[#F4FAFA] hover:bg-[#EBF6F6] transition-colors text-center group cursor-pointer"
        >
          <div className="h-9 w-9 rounded-lg bg-[#3F97A5] text-white flex items-center justify-center mb-2 group-hover:scale-105 transition-transform shadow-2xs">
            <UserCheck className="h-4 w-4" />
          </div>
          <span className="text-xs font-semibold text-[#143B42]">Add Doctor</span>
        </button>

        {/* Add Patient Button */}
        <button
          type="button"
          onClick={onAddPatient}
          className="flex flex-col items-center justify-center p-4 rounded-xl border border-emerald-200/70 bg-emerald-50/50 hover:bg-emerald-50 transition-colors text-center group cursor-pointer"
        >
          <div className="h-9 w-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center mb-2 group-hover:scale-105 transition-transform shadow-2xs">
            <UserPlus className="h-4 w-4" />
          </div>
          <span className="text-xs font-semibold text-[#143B42]">Add Patient</span>
        </button>

        {/* View Patients */}
        <Link
          href="/patients"
          className="flex flex-col items-center justify-center p-4 rounded-xl border border-[#D4E6E8] bg-[#F4F8F9] hover:bg-[#EBF3F5] transition-colors text-center group"
        >
          <div className="h-9 w-9 rounded-lg bg-[#143B42] text-white flex items-center justify-center mb-2 group-hover:scale-105 transition-transform shadow-2xs">
            <Calendar className="h-4 w-4" />
          </div>
          <span className="text-xs font-semibold text-[#143B42]">View Patients</span>
        </Link>

        {/* View Doctors */}
        <Link
          href="/doctors"
          className="flex flex-col items-center justify-center p-4 rounded-xl border border-[#CBE6E8] bg-[#F5FAFA] hover:bg-[#EBF6F6] transition-colors text-center group"
        >
          <div className="h-9 w-9 rounded-lg bg-[#2C7B88] text-white flex items-center justify-center mb-2 group-hover:scale-105 transition-transform shadow-2xs">
            <BarChart2 className="h-4 w-4" />
          </div>
          <span className="text-xs font-semibold text-[#143B42]">All Doctors</span>
        </Link>
      </div>
    </div>
  );
}
