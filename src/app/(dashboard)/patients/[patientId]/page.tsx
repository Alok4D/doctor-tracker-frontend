"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, User, Phone, Calendar, HeartPulse, UserCheck, Shield } from "lucide-react";
import { Patient } from "@/features/patients/types/patient.types";
import { patientService } from "@/features/patients/services/patient-api";
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
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPatient() {
      setIsLoading(true);
      const data = await patientService.getPatientById(patientId);
      setPatient(data);
      setIsLoading(false);
    }
    loadPatient();
  }, [patientId]);

  if (isLoading) {
    return <LoadingSpinner size="lg" />;
  }

  if (!patient) {
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
              <p className="text-xs text-slate-400 mt-0.5">Patient ID: {patient.id}</p>
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
              <p className="text-sm font-semibold text-slate-800 mt-0.5">
                {patient.doctorName || "Assigned Doctor"}
              </p>
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
                {patient.admissionDate}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-violet-50 text-violet-600">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Insurance / Coverage</p>
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
