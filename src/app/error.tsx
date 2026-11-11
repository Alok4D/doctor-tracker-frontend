"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-50 p-4 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-rose-600 mb-4">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h2 className="text-lg font-bold text-slate-900">An unexpected error occurred</h2>
      <p className="mt-1 text-xs text-slate-500 max-w-sm mb-5">
        We encountered a problem while processing your request. You can try refreshing or resetting the view.
      </p>
      <Button onClick={() => reset()} size="sm">
        Try again
      </Button>
    </div>
  );
}
