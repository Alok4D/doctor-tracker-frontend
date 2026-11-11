"use client";

import { Select } from "@/components/ui/select";
import { PATIENT_CONDITIONS } from "@/lib/constants";
import { useGetDoctorsQuery } from "@/lib/feature/doctor/doctorApi";

interface PatientFiltersProps {
  condition: string;
  onConditionChange: (val: string) => void;
  doctorId: string;
  onDoctorIdChange: (val: string) => void;
  status: string;
  onStatusChange: (val: string) => void;
}

export function PatientFilters({
  condition,
  onConditionChange,
  doctorId,
  onDoctorIdChange,
  status,
  onStatusChange,
}: PatientFiltersProps) {
  const { data: doctorsData } = useGetDoctorsQuery({ limit: 100 });
  const doctorsList = doctorsData?.data?.data || [];

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
        className="w-36 text-xs bg-white"
      >
        <option value="all">All status</option>
        <option value="Admitted">Admitted</option>
        <option value="Followup">Followup</option>
        <option value="Discharged">Discharged</option>
        <option value="Transferred">Transferred</option>
      </Select>
    </div>
  );
}
