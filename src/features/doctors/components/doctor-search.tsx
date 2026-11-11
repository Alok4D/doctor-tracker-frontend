import { SearchInput } from "@/components/shared/search-input";

interface DoctorSearchProps {
  value: string;
  onChange: (val: string) => void;
}

export function DoctorSearch({ value, onChange }: DoctorSearchProps) {
  return (
    <SearchInput
      value={value}
      onChange={onChange}
      placeholder="Search by doctor name, hospital, specialization..."
      className="max-w-md"
    />
  );
}
