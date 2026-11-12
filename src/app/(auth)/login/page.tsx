import { LoginForm } from "@/features/auth/components/login-form";
import { BrandLogo } from "@/components/shared/brand-logo";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen font-sans">
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <Image
          src="/images/premium_photo-1681843004557-f3128f91aeb7.avif"
          alt="Doctor Tracker Healthcare Management"
          draggable={false}
          fill
          priority
          className="object-cover object-top"
        />
      </div>

      {/* Right Side - Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-12 lg:p-20 bg-[#F7F9FA]">
        <div className="w-full max-w-md space-y-6">
          <div className="flex justify-center">
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
