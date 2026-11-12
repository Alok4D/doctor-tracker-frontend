import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { DoctorForm, DoctorSubmitPayload } from "./doctor-form";
import { DoctorFormData } from "../schemas/doctor.schema";

interface DoctorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: DoctorSubmitPayload) => Promise<boolean | void>;
  initialData?: Partial<DoctorFormData>;
  initialAvatarUrl?: string;
  title?: string;
  description?: string;
}

export function DoctorDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  initialAvatarUrl,
  title = "Add new doctor",
  description = "Fill in the details to register a doctor in the hospital network.",
}: DoctorDialogProps) {
  const handleSubmit = async (data: DoctorSubmitPayload) => {
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
      <DoctorForm
        initialData={initialData}
        initialAvatarUrl={initialAvatarUrl}
        onSubmit={handleSubmit}
        onCancel={() => onOpenChange(false)}
      />
    </Dialog>
  );
}
