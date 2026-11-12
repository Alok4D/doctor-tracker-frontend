import { LoginForm } from "@/features/auth/components/login-form";
import { BrandLogo } from "@/components/shared/brand-logo";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* Left Side - Image / Banner matching previous layout with Teal/Mint palette */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2400&auto=format&fit=crop"
            alt="Hospital Doctor Management"
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#3F97A5]/45 via-[#143B42]/75 to-[#143B42]/95" />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16 text-white">
          <div className="inline-flex items-center self-start rounded-xl bg-white px-4 py-2.5 shadow-md mb-7">
            <BrandLogo
              iconClassName="h-8 w-8"
              textClassName="text-xl font-bold text-[#1F4B53]"
            />
          </div>

          <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight mb-5 leading-tight">
            Hospital Doctor & Patient Management System
          </h1>
          <p className="text-base xl:text-lg text-[#DDF0F0] max-w-lg leading-relaxed font-normal">
            Manage your physicians, track patient assignments, and monitor health analytics all in one secure administrative platform.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-12 lg:p-20 bg-[#F7F9FA]">
        <div className="w-full max-w-md space-y-6">
          <div className="flex justify-center lg:hidden">
            <BrandLogo
              iconClassName="h-9 w-9"
              textClassName="text-xl font-bold text-[#1F4B53]"
            />
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
