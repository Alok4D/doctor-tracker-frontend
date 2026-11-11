"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { loginSchema, LoginFormData } from "../schemas/auth.schema";
import { useAuth } from "../hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const router = useRouter();
  const { loginUser, isLoading } = useAuth();

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
      toast.success("Welcome back! Signed in successfully");
      router.push("/dashboard");
    } else {
      toast.error(res.message || "Failed to log in");
    }
  };

  const fillDemoCredentials = () => {
    setValue("email", "admin@doctor-tracker.com");
    setValue("password", "password123");
    toast.info("Demo credentials filled");
  };

  return (
    <div className="w-full space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1.5">
            Email address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              {...register("email")}
              type="email"
              placeholder="name@hospital.com"
              className="pl-9"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-xs text-rose-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-medium text-slate-700">
              Password
            </label>
            <span className="text-xs text-blue-600 hover:underline cursor-pointer">
              Forgot password?
            </span>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              {...register("password")}
              type="password"
              placeholder="••••••••"
              className="pl-9"
            />
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-rose-600">{errors.password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full h-10 mt-2 bg-blue-600 hover:bg-blue-700"
          disabled={isLoading}
        >
          <span>{isLoading ? "Signing in..." : "Sign in to Dashboard"}</span>
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </form>

      {/* Quick Fill Demo Helper for Evaluators */}
      <div className="rounded-lg border border-blue-100 bg-blue-50/60 p-3.5 text-center">
        <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-blue-800">
          <ShieldCheck className="h-4 w-4 text-blue-600" />
          <span>Evaluation Demo Credentials</span>
        </div>
        <p className="text-[11px] text-blue-600/80 mt-1">
          Click below to auto-fill the verified admin account:
        </p>
        <button
          type="button"
          onClick={fillDemoCredentials}
          className="mt-2 text-xs font-semibold text-blue-700 hover:text-blue-900 underline"
        >
          Auto-fill admin@doctor-tracker.com
        </button>
      </div>
    </div>
  );
}

