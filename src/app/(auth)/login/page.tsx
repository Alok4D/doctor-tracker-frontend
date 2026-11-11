import { LoginForm } from "@/features/auth/components/login-form";
import { Activity } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-roboto">
      <div className="w-full max-w-md rounded-2xl border border-slate-200/90 bg-white p-8 shadow-xs">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs mb-3">
            <Activity className="h-6 w-6 stroke-[2.5]" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Doctor Tracker
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Hospital Administration Management Portal
          </p>
        </div>

        {/* Login Form */}
        <LoginForm />
      </div>
    </div>
  );
}
