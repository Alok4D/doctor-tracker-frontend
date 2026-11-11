export type SortOrder = "asc" | "desc";

export interface DateRangeFilter {
  startDate?: string;
  endDate?: string;
}

export type MedicalCondition =
  | "Cardiology"
  | "Neurology"
  | "Diabetes"
  | "Hypertension"
  | "Orthopedic"
  | "General"
  | "Pediatric"
  | "Dermatology";

