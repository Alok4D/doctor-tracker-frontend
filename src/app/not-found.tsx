import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-50 p-4 text-center">
      <h1 className="text-6xl font-extrabold text-blue-600">404</h1>
      <h2 className="mt-2 text-lg font-bold text-slate-800">Page not found</h2>
      <p className="mt-1 text-xs text-slate-500 max-w-sm mb-5">
        The requested administrative route does not exist or has been moved.
      </p>
      <Link href="/dashboard">
        <Button size="sm" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Return to Dashboard</span>
        </Button>
      </Link>
    </div>
  );
}
