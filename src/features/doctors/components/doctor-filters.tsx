import { Select } from "@/components/ui/select";
import { DOCTOR_SPECIALIZATIONS } from "@/lib/constants";

interface DoctorFiltersProps {
  specialization: string;
  onSpecializationChange: (val: string) => void;
}

export function DoctorFilters({
  specialization,
  onSpecializationChange,
}: DoctorFiltersProps) {
  return (
    <div className="flex items-center gap-2">
      <Select
        value={specialization}
        onChange={(e) => onSpecializationChange(e.target.value)}
        className="w-48 text-xs bg-white"
      >
        <option value="all">All specializations</option>
        {DOCTOR_SPECIALIZATIONS.map((spec) => (
          <option key={spec} value={spec}>
            {spec}
          </option>
        ))}
      </Select>
    </div>
  );
}

