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
    // GET Summary Stats (supports optional date range: all, today, 7d, 30d, year)
    getDashboardStats: builder.query<ApiResponse<IDashboardStats>, string | void>({
      query: (range) => ({
        url: range ? `/dashboard/stats?range=${range}` : "/dashboard/stats",
        method: "GET",
      }),
      providesTags: ["Dashboard", "Doctor", "Patient"],
    }),

    // GET Date-based Patient Statistics
    getPatientsOverview: builder.query<ApiResponse<IPatientsOverviewResponse>, string | void>({
      query: (timeframe) => ({
        url: timeframe
          ? `/dashboard/patients-overview?timeframe=${timeframe}`
          : "/dashboard/patients-overview",
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
