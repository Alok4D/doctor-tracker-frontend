"use client";

import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { PATIENT_CONDITIONS } from "@/lib/constants";
import { useGetDoctorsQuery } from "@/lib/feature/doctor/doctorApi";
import { X } from "lucide-react";

interface PatientFiltersProps {
  condition: string;
  onConditionChange: (val: string) => void;
  doctorId: string;
  onDoctorIdChange: (val: string) => void;
  status: string;
  onStatusChange: (val: string) => void;
  startDate?: string;
  onStartDateChange?: (val: string) => void;
  endDate?: string;
  onEndDateChange?: (val: string) => void;
}

export function PatientFilters({
  condition,
  onConditionChange,
  doctorId,
  onDoctorIdChange,
  status,
  onStatusChange,
  startDate = "",
  onStartDateChange,
  endDate = "",
  onEndDateChange,
}: PatientFiltersProps) {
  const { data: doctorsData } = useGetDoctorsQuery({ limit: 100 });
  const doctorsList = doctorsData?.data || [];

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Select
        value={condition}
        onChange={(e) => onConditionChange(e.target.value)}
        className="w-40 text-xs bg-white"
      >
        <option value="all">All conditions</option>
        {PATIENT_CONDITIONS.map((cond) => (
          <option key={cond} value={cond}>
            {cond}
          </option>
        ))}
      </Select>

      <Select
        value={doctorId}
        onChange={(e) => onDoctorIdChange(e.target.value)}
        className="w-44 text-xs bg-white"
      >
        <option value="all">All doctors</option>
        {doctorsList.map((doc) => (
          <option key={doc._id} value={doc._id}>
            {doc.name}
          </option>
        ))}
      </Select>

      <Select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="w-32 text-xs bg-white"
      >
        <option value="all">All status</option>
        <option value="Admitted">Admitted</option>
        <option value="Followup">Followup</option>
        <option value="Discharged">Discharged</option>
        <option value="Transferred">Transferred</option>
      </Select>

      {onStartDateChange && onEndDateChange && (
        <div className="flex items-center gap-1.5">
          <Input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            title="Start Date"
            className="w-36 h-9 text-xs bg-white"
          />
          <span className="text-xs text-slate-400">to</span>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            title="End Date"
            className="w-36 h-9 text-xs bg-white"
          />
          {(startDate || endDate) && (
            <button
              type="button"
              onClick={() => {
                onStartDateChange("");
                onEndDateChange("");
              }}
              className="p-1.5 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
              title="Clear date filter"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
