import Link from "next/link";
import { ArrowLeft, Stethoscope } from "lucide-react";
import { BrandLogo } from "@/components/shared/brand-logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFoundPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#F7F9FA] flex flex-col items-center justify-center px-6 py-12 font-sans">
      {/* Decorative Soft Mint & Teal Glows */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#3F97A5]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#143B42]/10 blur-3xl" />

      <div className="relative z-10 text-center max-w-lg space-y-6">
        <div className="flex justify-center">
          <BrandLogo iconClassName="h-9 w-9" textClassName="text-xl font-bold" />
        </div>

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-[#EBF6F6] border border-[#CBE6E8] text-[#3F97A5] shadow-xs">
          <Stethoscope className="h-10 w-10" />
        </div>

        <div>
          <h1 className="text-7xl sm:text-8xl font-extrabold tracking-tight text-[#143B42]">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] mt-2">
            Page Not Found
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-3 leading-relaxed">
            The requested route could not be found. Let&apos;s get you back to the
            Doctor Tracker dashboard.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/dashboard"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-[#3F97A5] hover:bg-[#35818D] text-white rounded-full px-8 h-11 text-sm font-semibold shadow-xs group inline-flex items-center"
            )}
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </div>

      <p className="relative z-10 mt-12 text-xs text-slate-400">
        Doctor Tracker &bull; Hospital Administration Portal &bull; &copy; 2026
      </p>
    </div>
  );
}
