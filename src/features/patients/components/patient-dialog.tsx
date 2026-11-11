import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { PatientForm } from "./patient-form";
import { PatientFormData } from "../schemas/patient.schema";

interface PatientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: PatientFormData) => Promise<boolean | void>;
  initialData?: Partial<PatientFormData>;
  lockedDoctorId?: string;
  title?: string;
  description?: string;
}

export function PatientDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  lockedDoctorId,
  title = "Register new patient",
  description = "Assign patient to a doctor and enter diagnosis information.",
}: PatientDialogProps) {
  const handleSubmit = async (data: PatientFormData) => {
    const success = await onSubmit(data);
    if (success !== false) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogClose onClick={() => onOpenChange(false)} />
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <PatientForm
        initialData={initialData}
        lockedDoctorId={lockedDoctorId}
        onSubmit={handleSubmit}
        onCancel={() => onOpenChange(false)}
      />
    </Dialog>
  );
}
