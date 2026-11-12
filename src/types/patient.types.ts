import { IDoctor } from "./doctor.types";

export type PatientStatus = "Admitted" | "Discharged" | "Followup" | "Transferred";
export type PatientGender = "Male" | "Female" | "Other";

export interface IPatient {
  _id: string;
  name: string;
  age: number;
  gender: PatientGender;
  condition: string;
  phone: string;
  doctorId: string | IDoctor;
  status: PatientStatus;
  admissionDate?: string;
  avatarUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IPatientFilterParams {
  searchTerm?: string;
  condition?: string;
  doctorId?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface ICreatePatientPayload {
  name: string;
  age: number;
  gender: PatientGender;
  condition: string;
  phone: string;
  doctorId: string;
  status: PatientStatus;
  admissionDate?: string;
  avatarUrl?: string;
  photo?: File | null;
}

export interface IUpdatePatientPayload extends Partial<ICreatePatientPayload> {}

export interface IPatientListResponse {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: IPatient[];
}

