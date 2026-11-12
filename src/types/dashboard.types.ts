export interface IDashboardStats {
  totalDoctors: number;
  activeDoctors: number;
  totalPatients: number;
  admittedPatients: number;
  avgPatientsPerDoctor: number;
}

export interface IDateStatItem {
  date: string;
  totalPatients: number;
  admittedPatients: number;
  otherPatients: number;
}

export interface IPatientsOverviewResponse {
  statusBreakdown: { _id: string; count: number }[];
  dateStats: IDateStatItem[];
}

export interface ISpecialtyBreakdownItem {
  name: string;
  count: number;
  percentage: string;
  color: string;
}

export interface ISpecialtyBreakdownResponse {
  totalDoctors: number;
  breakdown: ISpecialtyBreakdownItem[];
}

export interface IPatientsPerDoctor {
  _id: string;
  name: string;
  specialization: string;
  hospital: string;
  patientCount: number;
}
