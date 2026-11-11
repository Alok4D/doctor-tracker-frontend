import { Doctor, DoctorFilterParams } from "../types/doctor.types";
import { DoctorFormData } from "../schemas/doctor.schema";

export const INITIAL_MOCK_DOCTORS: Doctor[] = [
  {
    id: "doc-1",
    name: "Dr. Nazar Becks",
    specialization: "Gynecologist",
    hospital: "City Central Hospital",
    phone: "+880 1711 234567",
    email: "nazar.becks@careguide.com",
    status: "Active",
    patientCount: 42,
    avatarUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=120&auto=format&fit=crop&q=80",
    createdAt: "2026-01-15",
  },
  {
    id: "doc-2",
    name: "Dr. John Darwin",
    specialization: "Radiologist & ECG",
    hospital: "Apex Diagnostic Center",
    phone: "+880 1712 345678",
    email: "john.darwin@careguide.com",
    status: "Active",
    patientCount: 68,
    avatarUrl: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=120&auto=format&fit=crop&q=80",
    createdAt: "2026-02-01",
  },
  {
    id: "doc-3",
    name: "Dr. Alex Hales",
    specialization: "General Physician",
    hospital: "Care Guide Specialized Hospital",
    phone: "+880 1713 456789",
    email: "alex.hales@careguide.com",
    status: "Inactive",
    patientCount: 25,
    avatarUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=120&auto=format&fit=crop&q=80",
    createdAt: "2026-02-14",
  },
  {
    id: "doc-4",
    name: "Dr. Sarah Jenkins",
    specialization: "Cardiologist",
    hospital: "National Heart Foundation",
    phone: "+880 1714 567890",
    email: "sarah.jenkins@careguide.com",
    status: "Active",
    patientCount: 94,
    avatarUrl: "https://images.unsplash.com/photo-1594824813575-b65076cf4722?w=120&auto=format&fit=crop&q=80",
    createdAt: "2026-03-05",
  },
  {
    id: "doc-5",
    name: "Dr. Merina Farah",
    specialization: "Neurologist",
    hospital: "Neuroscience Medical Institute",
    phone: "+880 1715 678901",
    email: "merina.farah@careguide.com",
    status: "Active",
    patientCount: 53,
    avatarUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=120&auto=format&fit=crop&q=80",
    createdAt: "2026-03-20",
  },
  {
    id: "doc-6",
    name: "Dr. Tariq Ahmed",
    specialization: "Orthopedic Surgeon",
    hospital: "Metropolitan Trauma Center",
    phone: "+880 1716 789012",
    email: "tariq.ahmed@careguide.com",
    status: "Active",
    patientCount: 37,
    avatarUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=120&auto=format&fit=crop&q=80",
    createdAt: "2026-04-10",
  },
];

let mockDoctorsState = [...INITIAL_MOCK_DOCTORS];

export const doctorService = {
  getDoctors: async (params: DoctorFilterParams = {}) => {
    await new Promise((r) => setTimeout(r, 200));
    let filtered = [...mockDoctorsState];

    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(
        (doc) =>
          doc.name.toLowerCase().includes(q) ||
          doc.specialization.toLowerCase().includes(q) ||
          doc.hospital.toLowerCase().includes(q) ||
          doc.email.toLowerCase().includes(q)
      );
    }

    if (params.specialization && params.specialization !== "all") {
      filtered = filtered.filter(
        (doc) => doc.specialization === params.specialization
      );
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

  getDoctorById: async (id: string) => {
    await new Promise((r) => setTimeout(r, 150));
    return mockDoctorsState.find((doc) => doc.id === id) || null;
  },

  createDoctor: async (data: DoctorFormData) => {
    await new Promise((r) => setTimeout(r, 300));
    const newDoctor: Doctor = {
      id: `doc-${Date.now()}`,
      ...data,
      patientCount: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };
    mockDoctorsState = [newDoctor, ...mockDoctorsState];
    return newDoctor;
  },

  deleteDoctor: async (id: string) => {
    await new Promise((r) => setTimeout(r, 200));
    mockDoctorsState = mockDoctorsState.filter((d) => d.id !== id);
    return true;
  },
};
