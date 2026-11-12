"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { doctorFormSchema, DoctorFormData } from "../schemas/doctor.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { PhotoUpload } from "@/components/shared/photo-upload";
import { DOCTOR_SPECIALIZATIONS } from "@/lib/constants";

export type DoctorSubmitPayload = DoctorFormData & { photo?: File | null };

interface DoctorFormProps {
  initialData?: Partial<DoctorFormData>;
  initialAvatarUrl?: string;
  onSubmit: (data: DoctorSubmitPayload) => Promise<boolean | void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function DoctorForm({
  initialData,
  initialAvatarUrl,
  onSubmit,
  onCancel,
  isLoading = false,
}: DoctorFormProps) {
  const [photo, setPhoto] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DoctorFormData>({
    resolver: zodResolver(doctorFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      specialization: initialData?.specialization || DOCTOR_SPECIALIZATIONS[0],
      hospital: initialData?.hospital || "",
      phone: initialData?.phone || "",
      email: initialData?.email || "",
      status: initialData?.status || "Active",
    },
  });

  const busy = isLoading || isSubmitting;

  const handleFormSubmit = async (data: DoctorFormData) => {
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
        label="Doctor photo (Optional)"
      />

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Doctor name
        </label>
        <Input
          {...register("name")}
          placeholder="e.g. Dr. Jennifer Lawrence"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-rose-600">{errors.name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Specialization
          </label>
          <Select {...register("specialization")}>
            {DOCTOR_SPECIALIZATIONS.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </Select>
          {errors.specialization && (
            <p className="mt-1 text-sm text-rose-600">
              {errors.specialization.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Status
          </label>
          <Select {...register("status")}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </Select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Hospital / Medical center
        </label>
        <Input
          {...register("hospital")}
          placeholder="e.g. Square Hospital Ltd."
        />
        {errors.hospital && (
          <p className="mt-1 text-sm text-rose-600">{errors.hospital.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Phone number
          </label>
          <Input {...register("phone")} placeholder="+880 1711..." />
          {errors.phone && (
            <p className="mt-1 text-sm text-rose-600">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Email address
          </label>
          <Input
            {...register("email")}
            type="email"
            placeholder="doctor@hospital.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-rose-600">{errors.email.message}</p>
          )}
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
        <Button type="submit" size="lg" disabled={busy}
        className="rounded-xs"
        >
          {busy ? "Saving..." : "Save doctor"}
        </Button>
      </div>
    </form>
  );
}
