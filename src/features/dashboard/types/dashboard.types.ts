export interface DashboardStats {
  totalPatients: number;
  patientsChange: string;
  totalDoctors: number;
  doctorsChange: string;
  appointments: number;
  appointmentsChange: string;
  totalEarnings: string;
  earningsChange: string;
}

export interface PatientBreakdownItem {
  name: string;
  value: number;
  color: string;
}

export interface DoctorWorkloadItem {
  name: string;
  patients: number;
}

