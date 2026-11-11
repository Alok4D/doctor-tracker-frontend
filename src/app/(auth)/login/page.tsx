import { LoginForm } from "@/features/auth/components/login-form";
import { Activity } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-white font-roboto">
      {/* Left Side - Image / Banner matching erp-inventory layout */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2400&auto=format&fit=crop"
            alt="Hospital Doctor Management"
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40"
          />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16 text-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-blue-600 shadow-md">
              <Activity className="h-7 w-7 stroke-[2.5]" />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              Doctor Tracker
            </span>
          </div>

          <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight mb-5 leading-tight">
            Hospital Doctor & Patient Management System
          </h1>
          <p className="text-base xl:text-lg text-blue-100 max-w-lg leading-relaxed font-normal">
            Manage your physicians, track patient assignments, and monitor health analytics all in one secure administrative platform.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-12 lg:p-20 bg-slate-50/60">
        <LoginForm />
      </div>
    </div>
  );
}
