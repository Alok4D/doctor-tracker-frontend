import baseApi from "@/lib/api/baseApi";
import { ApiResponse } from "@/types/api.types";
import {
  IDashboardStats,
  IPatientsOverviewResponse,
  ISpecialtyBreakdownResponse,
  IPatientsPerDoctor,
} from "@/types/dashboard.types";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET Summary Stats
    getDashboardStats: builder.query<ApiResponse<IDashboardStats>, void>({
      query: () => ({
        url: "/dashboard/stats",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),

    // GET Patients Overview (Weekly Trend)
    getPatientsOverview: builder.query<ApiResponse<IPatientsOverviewResponse>, void>({
      query: () => ({
        url: "/dashboard/patients-overview",
        method: "GET",
      }),
      providesTags: ["Dashboard", "Patient"],
    }),

    // GET Doctors by Specialty Breakdown
    getSpecialtyBreakdown: builder.query<ApiResponse<ISpecialtyBreakdownResponse>, void>({
      query: () => ({
        url: "/dashboard/specialty-stats",
        method: "GET",
      }),
      providesTags: ["Dashboard", "Doctor"],
    }),

    // GET Patients per Doctor Workload
    getPatientsPerDoctor: builder.query<ApiResponse<IPatientsPerDoctor[]>, void>({
      query: () => ({
        url: "/dashboard/patients-per-doctor",
        method: "GET",
      }),
      providesTags: ["Dashboard", "Doctor", "Patient"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetDashboardStatsQuery,
  useGetPatientsOverviewQuery,
  useGetSpecialtyBreakdownQuery,
  useGetPatientsPerDoctorQuery,
} = dashboardApi;

