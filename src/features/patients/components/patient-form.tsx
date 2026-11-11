"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { patientFormSchema, PatientFormData } from "../schemas/patient.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { PATIENT_CONDITIONS, GENDERS } from "@/lib/constants";
import { INITIAL_MOCK_DOCTORS } from "@/features/doctors/services/doctor-api";

interface PatientFormProps {
  initialData?: Partial<PatientFormData>;
  lockedDoctorId?: string;
  onSubmit: (data: PatientFormData) => Promise<boolean | void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function PatientForm({
  initialData,
  lockedDoctorId,
  onSubmit,
  onCancel,
  isLoading = false,
}: PatientFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      age: initialData?.age || 30,
      gender: initialData?.gender || "Male",
      condition: initialData?.condition || PATIENT_CONDITIONS[0],
      phone: initialData?.phone || "",
      doctorId: lockedDoctorId || initialData?.doctorId || INITIAL_MOCK_DOCTORS[0].id,
      status: initialData?.status || "Admitted",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-slate-700 mb-1">
          Patient full name
        </label>
        <Input {...register("name")} placeholder="e.g. John Doe" />
        {errors.name && (
          <p className="mt-1 text-xs text-rose-600">{errors.name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Age
          </label>
          <Input
            type="number"
            {...register("age", { valueAsNumber: true })}
            placeholder="e.g. 35"
          />
          {errors.age && (
            <p className="mt-1 text-xs text-rose-600">{errors.age.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Gender
          </label>
          <Select {...register("gender")}>
            {GENDERS.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Medical condition / Diagnosis
          </label>
          <Select {...register("condition")}>
            {PATIENT_CONDITIONS.map((cond) => (
              <option key={cond} value={cond}>
                {cond}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Status
          </label>
          <Select {...register("status")}>
            <option value="Admitted">Admitted</option>
            <option value="Followup">Followup</option>
            <option value="Discharged">Discharged</option>
            <option value="Transferred">Transferred</option>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Contact phone
          </label>
          <Input {...register("phone")} placeholder="+880 1812..." />
          {errors.phone && (
            <p className="mt-1 text-xs text-rose-600">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Assigned doctor
          </label>
          <Select
            {...register("doctorId")}
            disabled={Boolean(lockedDoctorId)}
          >
            {INITIAL_MOCK_DOCTORS.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.name} ({doc.specialization})
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" size="sm" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save patient record"}
        </Button>
      </div>
    </form>
  );
}
