import { Patient, PatientFilterParams } from "../types/patient.types";
import { PatientFormData } from "../schemas/patient.schema";
import { INITIAL_MOCK_DOCTORS } from "@/features/doctors/services/doctor-api";

export const INITIAL_MOCK_PATIENTS: Patient[] = [
  {
    id: "pat-1001",
    name: "Sarah Ahmed",
    age: 34,
    gender: "Female",
    condition: "Gynecologist Consultation",
    phone: "+880 1812 112233",
    doctorId: "doc-1",
    doctorName: "Dr. Nazar Becks",
    status: "Admitted",
    admissionDate: "2026-03-01",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: "pat-1002",
    name: "Merina Farah",
    age: 45,
    gender: "Female",
    condition: "Radiologist & ECG Scan",
    phone: "+880 1813 223344",
    doctorId: "doc-2",
    doctorName: "Dr. John Darwin",
    status: "Admitted",
    admissionDate: "2026-03-03",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: "pat-1003",
    name: "John Doe",
    age: 29,
    gender: "Male",
    condition: "General Physician Checkup",
    phone: "+880 1814 334455",
    doctorId: "doc-3",
    doctorName: "Dr. Alex Hales",
    status: "Followup",
    admissionDate: "2026-03-05",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: "pat-1004",
    name: "Rahim Chowdhury",
    age: 58,
    gender: "Male",
    condition: "Cardiovascular Disease",
    phone: "+880 1815 445566",
    doctorId: "doc-4",
    doctorName: "Dr. Sarah Jenkins",
    status: "Admitted",
    admissionDate: "2026-03-10",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: "pat-1005",
    name: "Farhana Islam",
    age: 41,
    gender: "Female",
    condition: "Diabetes Type 2",
    phone: "+880 1816 556677",
    doctorId: "doc-3",
    doctorName: "Dr. Alex Hales",
    status: "Discharged",
    admissionDate: "2026-03-12",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: "pat-1006",
    name: "Kamal Hossain",
    age: 62,
    gender: "Male",
    condition: "Chronic Migraine",
    phone: "+880 1817 667788",
    doctorId: "doc-5",
    doctorName: "Dr. Merina Farah",
    status: "Followup",
    admissionDate: "2026-03-15",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: "pat-1007",
    name: "Tania Sultana",
    age: 26,
    gender: "Female",
    condition: "Post-Op Recovery",
    phone: "+880 1818 778899",
    doctorId: "doc-6",
    doctorName: "Dr. Tariq Ahmed",
    status: "Transferred",
    admissionDate: "2026-03-18",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: "pat-1008",
    name: "Anisur Rahman",
    age: 50,
    gender: "Male",
    condition: "Hypertension",
    phone: "+880 1819 889900",
    doctorId: "doc-4",
    doctorName: "Dr. Sarah Jenkins",
    status: "Admitted",
    admissionDate: "2026-03-22",
    avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80",
  },
];

let mockPatientsState = [...INITIAL_MOCK_PATIENTS];

export const patientService = {
  getPatients: async (params: PatientFilterParams = {}) => {
    await new Promise((r) => setTimeout(r, 200));
    let filtered = [...mockPatientsState];

    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.phone.toLowerCase().includes(q) ||
          p.condition.toLowerCase().includes(q) ||
          (p.doctorName && p.doctorName.toLowerCase().includes(q))
      );
    }

    if (params.condition && params.condition !== "all") {
      filtered = filtered.filter((p) => p.condition === params.condition);
    }

    if (params.doctorId && params.doctorId !== "all") {
      filtered = filtered.filter((p) => p.doctorId === params.doctorId);
    }

    if (params.status && params.status !== "all") {
      filtered = filtered.filter((p) => p.status === params.status);
    }

    const page = params.page || 1;
    const limit = params.limit || 10;
    const startIndex = (page - 1) * limit;
    const paginated = filtered.slice(startIndex, startIndex + limit);

    return {
      data: paginated,
      pagination: {
        total: filtered.length,
        page,
        limit,
        totalPages: Math.ceil(filtered.length / limit) || 1,
        hasPrevPage: page > 1,
        hasNextPage: startIndex + limit < filtered.length,
      },
    };
  },

  getPatientsByDoctorId: async (doctorId: string) => {
    await new Promise((r) => setTimeout(r, 150));
    return mockPatientsState.filter((p) => p.doctorId === doctorId);
  },

  getPatientById: async (id: string) => {
    await new Promise((r) => setTimeout(r, 100));
    return mockPatientsState.find((p) => p.id === id) || null;
  },

  createPatient: async (data: PatientFormData) => {
    await new Promise((r) => setTimeout(r, 250));
    const assignedDoctor = INITIAL_MOCK_DOCTORS.find(
      (d) => d.id === data.doctorId
    );

    const newPatient: Patient = {
      id: `pat-${1000 + mockPatientsState.length + 1}`,
      ...data,
      doctorName: assignedDoctor?.name || "Assigned Doctor",
      admissionDate: new Date().toISOString().split("T")[0],
    };
    mockPatientsState = [newPatient, ...mockPatientsState];
    return newPatient;
  },

  updatePatient: async (id: string, data: Partial<PatientFormData>) => {
    await new Promise((r) => setTimeout(r, 200));
    const index = mockPatientsState.findIndex((p) => p.id === id);
    if (index === -1) return null;

    let doctorName = mockPatientsState[index].doctorName;
    if (data.doctorId) {
      const doc = INITIAL_MOCK_DOCTORS.find((d) => d.id === data.doctorId);
      if (doc) doctorName = doc.name;
    }

    mockPatientsState[index] = {
      ...mockPatientsState[index],
      ...data,
      doctorName,
    };
    return mockPatientsState[index];
  },

  deletePatient: async (id: string) => {
    await new Promise((r) => setTimeout(r, 150));
    mockPatientsState = mockPatientsState.filter((p) => p.id !== id);
    return true;
  },
};
