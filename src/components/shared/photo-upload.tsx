"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, Upload, X } from "lucide-react";
import { toast } from "sonner";

interface PhotoUploadProps {
  initialUrl?: string;
  value?: File | null;
  onChange: (file: File | null) => void;
  label?: string;
}

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

/**
 * Reusable optional profile photo uploader with live preview and size/type validation.
 */
export function PhotoUpload({
  initialUrl,
  value,
  onChange,
  label = "Profile photo (Optional)",
}: PhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(initialUrl);

  useEffect(() => {
    if (!value) {
      setPreviewUrl(initialUrl);
      return;
    }

    const objectUrl = URL.createObjectURL(value);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [value, initialUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Please upload a JPG, PNG, or WEBP image");
      e.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      toast.error("Image size must be 5 MB or less");
      e.target.value = "";
      return;
    }

    onChange(file);
  };

  const handleClear = () => {
    onChange(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="flex items-center gap-4 rounded-xl border border-[#DCEAEB] bg-[#F7FAFA] p-3">
      {/* Avatar Preview */}
      <div className="relative h-14 w-14 rounded-full border border-[#CBE6E8] bg-[#EBF6F6] flex items-center justify-center overflow-hidden shrink-0">
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewUrl}
            alt="Profile preview"
            className="h-full w-full object-cover"
          />
        ) : (
          <Camera className="h-5 w-5 text-[#3F97A5]" />
        )}
      </div>

      {/* Controls */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-[#143B42]">{label}</p>
        <p className="text-[11px] text-slate-500 mt-0.5 truncate">
          {value ? value.name : "JPG, PNG, or WEBP up to 5 MB"}
        </p>

        <div className="flex items-center gap-2 mt-2">
          <input
            ref={inputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#CBE6E8] bg-white px-3 py-1 text-[11px] font-medium text-[#143B42] hover:bg-[#EBF6F6] transition-colors cursor-pointer"
          >
            <Upload className="h-3 w-3 text-[#3F97A5]" />
            <span>{previewUrl ? "Change photo" : "Choose photo"}</span>
          </button>

          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <X className="h-3 w-3" />
              <span>Remove</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

