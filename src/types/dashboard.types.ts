export interface IDashboardStats {
  totalDoctors: number;
  activeDoctors: number;
  totalPatients: number;
  admittedPatients: number;
  avgPatientsPerDoctor: number;
  appointments: number;
  totalEarnings: string;
}

export interface IPatientsOverviewTrend {
  week: string;
  newPatients: number;
  returningPatients: number;
}

export interface IPatientsOverviewResponse {
  statusBreakdown: { _id: string; count: number }[];
  weeklyOverview: IPatientsOverviewTrend[];
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

