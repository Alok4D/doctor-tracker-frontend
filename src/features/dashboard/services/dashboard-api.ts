import { DashboardStats, PatientBreakdownItem, DoctorWorkloadItem } from "../types/dashboard.types";

export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    return {
      totalPatients: 3550,
      patientsChange: "+15% vs past month",
      totalDoctors: 100,
      doctorsChange: "+20% vs past month",
      appointments: 1079,
      appointmentsChange: "-5% vs past month",
      totalEarnings: "$55,000",
      earningsChange: "+22% vs past month",
    };
  },

  getPatientBreakdown: async (): Promise<PatientBreakdownItem[]> => {
    return [
      { name: "Admitted", value: 1340, color: "#2563eb" },
      { name: "Discharged", value: 1550, color: "#94a3b8" },
      { name: "Transferred", value: 85, color: "#64748b" },
      { name: "Followup", value: 575, color: "#38bdf8" },
    ];
  },

  getDoctorWorkload: async (): Promise<DoctorWorkloadItem[]> => {
    return [
      { name: "Doctors", patients: 680 },
      { name: "Nurses", patients: 590 },
      { name: "Volunteers", patients: 1600 },
      { name: "Pharmacists", patients: 1400 },
      { name: "Dietitians", patients: 580 },
      { name: "Others", patients: 190 },
    ];
  },
};
