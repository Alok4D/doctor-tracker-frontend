import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  showText?: boolean;
}

/**
 * Official Doctor Tracker Brand Logo using /public/logo/doctor-tracker-logo.svg.
 */
export function BrandLogo({
  className,
  iconClassName,
  textClassName,
  showText = true,
}: BrandLogoProps) {
  return (
    <div className={cn("inline-flex items-center gap-2.5 select-none", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo/doctor-tracker-logo.svg"
        alt="Doctor Tracker Logo"
        className={cn("h-8 w-8 object-contain shrink-0", iconClassName)}
      />

      {showText && (
        <span
          className={cn(
            "text-lg font-bold tracking-tight text-[#1F4B53]",
            textClassName
          )}
        >
          Doctor Tracker
        </span>
      )}
    </div>
  );
}
