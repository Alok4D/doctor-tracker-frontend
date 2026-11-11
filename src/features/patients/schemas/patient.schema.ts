import { z } from "zod";

export const patientFormSchema = z.object({
  name: z.string().min(2, "Patient name must be at least 2 characters"),
  age: z.number().min(0, "Age must be positive").max(120, "Please enter a valid age"),
  gender: z.enum(["Male", "Female", "Other"]),
  condition: z.string().min(2, "Condition/Diagnosis is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  doctorId: z.string().min(1, "Please assign a doctor"),
  status: z.enum(["Admitted", "Discharged", "Followup", "Transferred"]),
});

export type PatientFormData = z.infer<typeof patientFormSchema>;
