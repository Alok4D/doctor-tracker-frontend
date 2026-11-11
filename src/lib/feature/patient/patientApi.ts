import baseApi from "@/lib/api/baseApi";
import { ApiResponse } from "@/types/api.types";
import {
  IPatient,
  IPatientFilterParams,
  ICreatePatientPayload,
  IUpdatePatientPayload,
} from "@/types/patient.types";

export const patientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET All Patients with Filtering & Pagination
    getPatients: builder.query<ApiResponse<IPatient[]>, IPatientFilterParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params) {
          if (params.searchTerm) queryParams.append("searchTerm", params.searchTerm);
          if (params.condition && params.condition !== "All")
            queryParams.append("condition", params.condition);
          if (params.status && params.status !== "All")
            queryParams.append("status", params.status);
          if (params.doctorId && params.doctorId !== "All")
            queryParams.append("doctorId", params.doctorId);
          if (params.startDate) queryParams.append("startDate", params.startDate);
          if (params.endDate)
            queryParams.append(
              "endDate",
              params.endDate.includes("T")
                ? params.endDate
                : `${params.endDate}T23:59:59.999Z`
            );
          if (params.page) queryParams.append("page", params.page.toString());
          if (params.limit) queryParams.append("limit", params.limit.toString());
          if (params.sortBy) queryParams.append("sortBy", params.sortBy);
          if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder);
        }

        const queryString = queryParams.toString();
        return {
          url: queryString ? `/patients?${queryString}` : "/patients",
          method: "GET",
        };
      },
      providesTags: ["Patient"],
    }),

    // GET Single Patient by ID
    getPatientById: builder.query<ApiResponse<IPatient>, string>({
      query: (id) => ({
        url: `/patients/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Patient", id }, "Patient"],
    }),

    // POST Create Patient
    createPatient: builder.mutation<ApiResponse<IPatient>, ICreatePatientPayload>({
      query: (payload) => ({
        url: "/patients",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Patient", "Doctor", "Dashboard"],
    }),

    // PATCH Update Patient
    updatePatient: builder.mutation<
      ApiResponse<IPatient>,
      { id: string; body: IUpdatePatientPayload }
    >({
      query: ({ id, body }) => ({
        url: `/patients/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Patient", id },
        "Patient",
        "Doctor",
        "Dashboard",
      ],
    }),

    // DELETE Patient
    deletePatient: builder.mutation<ApiResponse<IPatient>, string>({
      query: (id) => ({
        url: `/patients/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Patient", "Doctor", "Dashboard"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetPatientsQuery,
  useGetPatientByIdQuery,
  useCreatePatientMutation,
  useUpdatePatientMutation,
  useDeletePatientMutation,
} = patientApi;
