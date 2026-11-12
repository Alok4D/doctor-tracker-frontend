import baseApi from "@/lib/api/baseApi";
import { toFormData } from "@/lib/utils/form-data";
import { ApiResponse } from "@/types/api.types";
import {
  IDoctor,
  IDoctorFilterParams,
  ICreateDoctorPayload,
  IUpdateDoctorPayload,
} from "@/types/doctor.types";
import { IPatient } from "@/types/patient.types";

export const doctorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
  
    getDoctors: builder.query<ApiResponse<IDoctor[]>, IDoctorFilterParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params) {
          if (params.searchTerm) queryParams.append("searchTerm", params.searchTerm);
          if (params.specialization && params.specialization !== "All")
            queryParams.append("specialization", params.specialization);
          if (params.status && params.status !== "All")
            queryParams.append("status", params.status);
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
          url: queryString ? `/doctors?${queryString}` : "/doctors",
          method: "GET",
        };
      },
      providesTags: ["Doctor"],
    }),

    
    getDoctorById: builder.query<
      ApiResponse<{ doctor: IDoctor; patients: IPatient[]; patientCount: number }>,
      string
    >({
      query: (id) => ({
        url: `/doctors/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Doctor", id }, "Doctor", "Patient"],
    }),

    
    getDoctorPatients: builder.query<ApiResponse<IPatient[]>, string>({
      query: (id) => ({
        url: `/doctors/${id}/patients`,
        method: "GET",
      }),
      providesTags: ["Doctor", "Patient"],
    }),

   
    createDoctor: builder.mutation<ApiResponse<IDoctor>, ICreateDoctorPayload>({
      query: (payload) => ({
        url: "/doctors",
        method: "POST",
        body: toFormData(payload),
      }),
      invalidatesTags: ["Doctor", "Dashboard"],
    }),

   
    updateDoctor: builder.mutation<
      ApiResponse<IDoctor>,
      { id: string; body: IUpdateDoctorPayload }
    >({
      query: ({ id, body }) => ({
        url: `/doctors/${id}`,
        method: "PATCH",
        body: toFormData(body),
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Doctor", id }, "Doctor", "Dashboard"],
    }),

   
    deleteDoctor: builder.mutation<ApiResponse<IDoctor>, string>({
      query: (id) => ({
        url: `/doctors/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Doctor", "Dashboard"],
    }),

   
    assignPatientToDoctor: builder.mutation<
      ApiResponse<any>,
      { doctorId: string; patientId: string }
    >({
      query: ({ doctorId, patientId }) => ({
        url: `/doctors/${doctorId}/patients`,
        method: "POST",
        body: { patientId },
      }),
      invalidatesTags: ["Doctor", "Patient", "Dashboard"],
    }),

   
    removePatientFromDoctor: builder.mutation<
      ApiResponse<any>,
      { doctorId: string; patientId: string }
    >({
      query: ({ doctorId, patientId }) => ({
        url: `/doctors/${doctorId}/patients/${patientId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Doctor", "Patient", "Dashboard"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetDoctorsQuery,
  useGetDoctorByIdQuery,
  useGetDoctorPatientsQuery,
  useCreateDoctorMutation,
  useUpdateDoctorMutation,
  useDeleteDoctorMutation,
  useAssignPatientToDoctorMutation,
  useRemovePatientFromDoctorMutation,
} = doctorApi;
