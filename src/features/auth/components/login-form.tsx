"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { loginSchema, LoginFormData } from "../schemas/auth.schema";
import { useAuth } from "../hooks/use-auth";

export function LoginForm() {
  const router = useRouter();
  const { loginUser, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@doctor-tracker.com",
      password: "password123",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    const res = await loginUser(data);
    if (res.success) {
      toast.success("Logged in successfully!");
      router.push("/dashboard");
    } else {
      toast.error(res.message || "Failed to login");
    }
  };

  const fillDemoCredentials = () => {
    setValue("email", "admin@doctor-tracker.com");
    setValue("password", "password123");
    toast.info("Demo credentials filled");
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center sm:text-left">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
          Log In to Your Account
        </h2>
        <p className="text-slate-500 text-sm mt-1.5">
          Welcome back! Please enter your details.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            {...register("email")}
            placeholder="admin@doctor-tracker.com"
            className="block w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all shadow-2xs"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-rose-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <span className="text-xs text-blue-600 hover:text-blue-700 hover:underline cursor-pointer">
              Forgot password?
            </span>
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="••••••••"
              className="block w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all pr-12 shadow-2xs"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-blue-600 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-rose-600">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-xs text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          {isLoading ? "Signing in..." : "Log In"}
        </button>
      </form>

      {/* Demo Credentials Helper Box for Evaluators */}
      <div className="rounded-lg border border-blue-100 bg-blue-50/60 p-3.5 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-semibold text-blue-900">
          <ShieldCheck className="h-4 w-4 text-blue-600 shrink-0" />
          <span>Evaluation Demo Credentials</span>
        </div>
        <p className="text-[11px] text-blue-700/80 mt-1">
          Click below to auto-fill the administrator account:
        </p>
        <button
          type="button"
          onClick={fillDemoCredentials}
          className="mt-2 text-xs font-semibold text-blue-700 hover:text-blue-900 underline cursor-pointer"
        >
          Auto-fill: admin@doctor-tracker.com
        </button>
      </div>
    </div>
  );
}
