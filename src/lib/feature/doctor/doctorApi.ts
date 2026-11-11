import baseApi from "@/lib/api/baseApi";
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
    // GET All Doctors with Filtering & Pagination
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

    // GET Single Doctor by ID (returns { doctor, patients, patientCount })
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

    // GET Doctor's Assigned Patients
    getDoctorPatients: builder.query<ApiResponse<IPatient[]>, string>({
      query: (id) => ({
        url: `/doctors/${id}/patients`,
        method: "GET",
      }),
      providesTags: ["Doctor", "Patient"],
    }),

    // POST Create Doctor
    createDoctor: builder.mutation<ApiResponse<IDoctor>, ICreateDoctorPayload>({
      query: (payload) => ({
        url: "/doctors",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Doctor", "Dashboard"],
    }),

    // PATCH Update Doctor
    updateDoctor: builder.mutation<
      ApiResponse<IDoctor>,
      { id: string; body: IUpdateDoctorPayload }
    >({
      query: ({ id, body }) => ({
        url: `/doctors/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Doctor", id }, "Doctor", "Dashboard"],
    }),

    // DELETE Doctor
    deleteDoctor: builder.mutation<ApiResponse<IDoctor>, string>({
      query: (id) => ({
        url: `/doctors/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Doctor", "Dashboard"],
    }),

    // POST Assign Patient to Doctor
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

    // DELETE Remove Patient from Doctor
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
