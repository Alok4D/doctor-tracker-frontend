import { SearchInput } from "@/components/shared/search-input";

interface PatientSearchProps {
  value: string;
  onChange: (val: string) => void;
}

export function PatientSearch({ value, onChange }: PatientSearchProps) {
  return (
    <SearchInput
      value={value}
      onChange={onChange}
      placeholder="Search by patient name, phone, condition..."
      className="max-w-md"
    />
  );
}

