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
  
    getDashboardStats: builder.query<ApiResponse<IDashboardStats>, string | void>({
      query: (range) => ({
        url: range ? `/dashboard/stats?range=${range}` : "/dashboard/stats",
        method: "GET",
      }),
      providesTags: ["Dashboard", "Doctor", "Patient"],
    }),

   
    getPatientsOverview: builder.query<ApiResponse<IPatientsOverviewResponse>, string | void>({
      query: (timeframe) => ({
        url: timeframe
          ? `/dashboard/patients-overview?timeframe=${timeframe}`
          : "/dashboard/patients-overview",
        method: "GET",
      }),
      providesTags: ["Dashboard", "Patient"],
    }),

   
    getSpecialtyBreakdown: builder.query<ApiResponse<ISpecialtyBreakdownResponse>, void>({
      query: () => ({
        url: "/dashboard/specialty-stats",
        method: "GET",
      }),
      providesTags: ["Dashboard", "Doctor"],
    }),

    
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
