export interface IDoctor {
  _id: string;
  name: string;
  specialization: string;
  hospital: string;
  phone: string;
  email: string;
  status: "Active" | "Inactive";
  avatarUrl?: string;
  patientCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IDoctorFilterParams {
  searchTerm?: string;
  specialization?: string;
  hospital?: string;
  status?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface ICreateDoctorPayload {
  name: string;
  specialization: string;
  hospital: string;
  phone: string;
  email: string;
  status?: "Active" | "Inactive";
  avatarUrl?: string;
}

export interface IUpdateDoctorPayload extends Partial<ICreateDoctorPayload> {}

export interface IDoctorListResponse {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: IDoctor[];
}

export interface IDoctorPatientsResponse {
  doctor: IDoctor;
  patients: any[];
}

