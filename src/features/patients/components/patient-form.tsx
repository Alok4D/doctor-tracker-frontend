"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { patientFormSchema, PatientFormData } from "../schemas/patient.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { PhotoUpload } from "@/components/shared/photo-upload";
import { PATIENT_CONDITIONS, GENDERS } from "@/lib/constants";
import { useGetDoctorsQuery } from "@/lib/feature/doctor/doctorApi";

export type PatientSubmitPayload = PatientFormData & { photo?: File | null };

interface PatientFormProps {
  initialData?: Partial<PatientFormData>;
  initialAvatarUrl?: string;
  lockedDoctorId?: string;
  onSubmit: (data: PatientSubmitPayload) => Promise<boolean | void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function PatientForm({
  initialData,
  initialAvatarUrl,
  lockedDoctorId,
  onSubmit,
  onCancel,
  isLoading = false,
}: PatientFormProps) {
  const [photo, setPhoto] = useState<File | null>(null);
  const { data: doctorsData } = useGetDoctorsQuery({ limit: 100 });
  const doctorsList = doctorsData?.data || [];

  const defaultDoctorId =
    lockedDoctorId ||
    initialData?.doctorId ||
    (doctorsList.length > 0 ? doctorsList[0]._id : "");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      age: initialData?.age || 30,
      gender: initialData?.gender || "Male",
      condition: initialData?.condition || PATIENT_CONDITIONS[0],
      phone: initialData?.phone || "",
      doctorId: defaultDoctorId,
      status: initialData?.status || "Admitted",
    },
  });

  const currentDoctorId = watch("doctorId");

  useEffect(() => {
    if (!currentDoctorId && !lockedDoctorId && !initialData?.doctorId && doctorsList.length > 0) {
      setValue("doctorId", doctorsList[0]._id);
    }
  }, [currentDoctorId, lockedDoctorId, initialData?.doctorId, doctorsList, setValue]);

  const busy = isLoading || isSubmitting;

  const handleFormSubmit = async (data: PatientFormData) => {
    await onSubmit({
      ...data,
      photo,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <PhotoUpload
        initialUrl={initialAvatarUrl}
        value={photo}
        onChange={setPhoto}
        label="Patient photo (Optional)"
      />

      <div>
        <label className="block text-xs font-medium text-slate-700 mb-1">
          Patient full name
        </label>
        <Input {...register("name")} placeholder="e.g. John Doe" />
        {errors.name && (
          <p className="mt-1 text-xs text-rose-600">{errors.name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Age
          </label>
          <Input
            type="number"
            {...register("age", { valueAsNumber: true })}
            placeholder="e.g. 42"
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
            {GENDERS.map((g) => (
              <option key={g} value={g}>
                {g}
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
            {doctorsList.map((doc) => (
              <option key={doc._id} value={doc._id}>
                {doc.name} ({doc.specialization})
              </option>
            ))}
            {doctorsList.length === 0 && (
              <option value="">No doctors available</option>
            )}
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
        <Button
        className="rounded-xs"
          type="button"
          variant="outline"
          size="lg"
          onClick={onCancel}
          disabled={busy}
        >
          Cancel
        </Button>
        <Button
         className="rounded-xs"
        type="submit" size="lg" disabled={busy}>
          {busy ? "Saving..." : "Save patient record"}
        </Button>
      </div>
    </form>
  );
}
