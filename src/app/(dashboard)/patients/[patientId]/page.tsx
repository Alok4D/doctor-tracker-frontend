"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  User,
  Phone,
  Calendar,
  HeartPulse,
  UserCheck,
  Shield,
} from "lucide-react";
import { useGetPatientByIdQuery } from "@/lib/feature/patient/patientApi";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function PatientDetailPage({
  params,
}: {
  params: Promise<{ patientId: string }>;
}) {
  const router = useRouter();
  const { patientId } = use(params);
  const { data, isLoading, error } = useGetPatientByIdQuery(patientId);

  const patient = data?.data;

  if (isLoading) {
    return <LoadingSpinner size="lg" />;
  }

  if (error || !patient) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <h2 className="text-base font-semibold text-slate-900">Patient not found</h2>
        <p className="mt-1 text-xs text-slate-500 mb-4">
          The requested patient record could not be found.
        </p>
        <Button size="sm" onClick={() => router.push("/patients")} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to patients list</span>
        </Button>
      </div>
    );
  }

  const doctorName =
    typeof patient.doctorId === "object" && patient.doctorId !== null
      ? (patient.doctorId as any).name
      : "Assigned Physician";

  const doctorSpecialty =
    typeof patient.doctorId === "object" && patient.doctorId !== null
      ? (patient.doctorId as any).specialization
      : "";

  const doctorId =
    typeof patient.doctorId === "object" && patient.doctorId !== null
      ? (patient.doctorId as any)._id
      : null;

  return (
    <div className="space-y-6">
      <Link
        href="/patients"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to patients list</span>
      </Link>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-5">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-base font-bold text-slate-700">
              {patient.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">{patient.name}</h1>
                <Badge variant="default">{patient.status}</Badge>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Patient ID: {patient._id.slice(-6)}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <User className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Demographics</p>
              <p className="text-sm font-semibold text-slate-800 mt-0.5">
                {patient.age} years old, {patient.gender}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <HeartPulse className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Medical Condition</p>
              <p className="text-sm font-semibold text-slate-800 mt-0.5">
                {patient.condition}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <UserCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Assigned Physician</p>
              {doctorId ? (
                <Link
                  href={`/doctors/${doctorId}`}
                  className="text-sm font-semibold text-blue-600 hover:underline mt-0.5 block"
                >
                  {doctorName} {doctorSpecialty && `(${doctorSpecialty})`}
                </Link>
              ) : (
                <p className="text-sm font-semibold text-slate-800 mt-0.5">
                  {doctorName}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-slate-100 text-slate-600">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Phone</p>
              <p className="text-sm font-semibold text-slate-800 mt-0.5">
                {patient.phone}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Admission Date</p>
              <p className="text-sm font-semibold text-slate-800 mt-0.5">
                {patient.admissionDate || (patient.createdAt ? new Date(patient.createdAt).toLocaleDateString() : "Recent")}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-violet-50 text-violet-600">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Coverage</p>
              <p className="text-sm font-semibold text-slate-800 mt-0.5">
                Care Guide Standard Medical Plan
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
