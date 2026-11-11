export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  hospital: string;
  phone: string;
  email: string;
  status: "Active" | "Inactive";
  patientCount: number;
  avatarUrl?: string;
  createdAt: string;
}

export interface DoctorFilterParams {
  search?: string;
  specialization?: string;
  dateRange?: string;
  page?: number;
  limit?: number;
}

