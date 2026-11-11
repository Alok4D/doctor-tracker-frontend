"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { doctorFormSchema, DoctorFormData } from "../schemas/doctor.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { DOCTOR_SPECIALIZATIONS } from "@/lib/constants";

interface DoctorFormProps {
  initialData?: Partial<DoctorFormData>;
  onSubmit: (data: DoctorFormData) => Promise<boolean | void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function DoctorForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: DoctorFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-slate-700 mb-1">
          Doctor name
        </label>
        <Input
          {...register("name")}
          placeholder="e.g. Dr. Jennifer Lawrence"
        />
        {errors.name && (
          <p className="mt-1 text-xs text-rose-600">{errors.name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
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
            <p className="mt-1 text-xs text-rose-600">
              {errors.specialization.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Status
          </label>
          <Select {...register("status")}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </Select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-700 mb-1">
          Hospital / Medical center
        </label>
        <Input
          {...register("hospital")}
          placeholder="e.g. Square Hospital Ltd."
        />
        {errors.hospital && (
          <p className="mt-1 text-xs text-rose-600">{errors.hospital.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Phone number
          </label>
          <Input {...register("phone")} placeholder="+880 1711..." />
          {errors.phone && (
            <p className="mt-1 text-xs text-rose-600">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Email address
          </label>
          <Input
            {...register("email")}
            type="email"
            placeholder="doctor@hospital.com"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-rose-600">{errors.email.message}</p>
          )}
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
          {isLoading ? "Saving..." : "Save doctor"}
        </Button>
      </div>
    </form>
  );
}
