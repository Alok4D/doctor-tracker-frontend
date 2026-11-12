"use client";

import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { DOCTOR_SPECIALIZATIONS } from "@/lib/constants";
import { X } from "lucide-react";

interface DoctorFiltersProps {
  specialization: string;
  onSpecializationChange: (val: string) => void;
  status?: string;
  onStatusChange?: (val: string) => void;
  startDate?: string;
  onStartDateChange?: (val: string) => void;
  endDate?: string;
  onEndDateChange?: (val: string) => void;
}

export function DoctorFilters({
  specialization,
  onSpecializationChange,
  status = "all",
  onStatusChange,
  startDate = "",
  onStartDateChange,
  endDate = "",
  onEndDateChange,
}: DoctorFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
      <Select
        value={specialization}
        onChange={(e) => onSpecializationChange(e.target.value)}
        className="flex-1 min-w-[140px] sm:w-44 text-xs bg-white"
      >
        <option value="all">All specializations</option>
        {DOCTOR_SPECIALIZATIONS.map((spec) => (
          <option key={spec} value={spec}>
            {spec}
          </option>
        ))}
      </Select>

      {onStatusChange && (
        <Select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="flex-1 min-w-[110px] sm:w-32 text-xs bg-white"
        >
          <option value="all">All status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </Select>
      )}

      {onStartDateChange && onEndDateChange && (
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <Input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            title="Start Date"
            className="flex-1 sm:w-36 h-9 text-xs bg-white"
          />
          <span className="text-xs text-slate-400 shrink-0">to</span>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            title="End Date"
            className="flex-1 sm:w-36 h-9 text-xs bg-white"
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
