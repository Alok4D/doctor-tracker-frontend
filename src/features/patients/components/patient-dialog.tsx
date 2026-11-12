import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { PatientForm, PatientSubmitPayload } from "./patient-form";
import { PatientFormData } from "../schemas/patient.schema";

interface PatientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: PatientSubmitPayload) => Promise<boolean | void>;
  initialData?: Partial<PatientFormData>;
  initialAvatarUrl?: string;
  lockedDoctorId?: string;
  title?: string;
  description?: string;
}

export function PatientDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  initialAvatarUrl,
  lockedDoctorId,
  title = "Register new patient",
  description = "Assign patient to a doctor and enter diagnosis information.",
}: PatientDialogProps) {
  const handleSubmit = async (data: PatientSubmitPayload) => {
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
        initialAvatarUrl={initialAvatarUrl}
        lockedDoctorId={lockedDoctorId}
        onSubmit={handleSubmit}
        onCancel={() => onOpenChange(false)}
      />
    </Dialog>
  );
}
