import { z } from "zod";

export const doctorFormSchema = z.object({
  name: z.string().min(2, "Doctor name must be at least 2 characters"),
  specialization: z.string().min(2, "Specialization is required"),
  hospital: z.string().min(2, "Hospital name is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
  status: z.enum(["Active", "Inactive"]),
});

export type DoctorFormData = z.infer<typeof doctorFormSchema>;
