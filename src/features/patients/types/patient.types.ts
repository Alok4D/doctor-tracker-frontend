export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  condition: string;
  phone: string;
  doctorId: string;
  doctorName?: string;
  status: "Admitted" | "Discharged" | "Followup" | "Transferred";
  admissionDate: string;
  avatarUrl?: string;
}

export interface PatientFilterParams {
  search?: string;
  condition?: string;
  doctorId?: string;
  status?: string;
  page?: number;
  limit?: number;
}
