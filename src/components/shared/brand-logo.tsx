import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  showText?: boolean;
}

/**
 * Interlocking Healthcare Knot Logo matching the Figma brand mark,
 * paired with the Doctor Tracker title.
 */
export function BrandLogo({
  className,
  iconClassName,
  textClassName,
  showText = true,
}: BrandLogoProps) {
  return (
    <div className={cn("inline-flex items-center gap-2.5 select-none", className)}>
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("h-8 w-8 shrink-0", iconClassName)}
        aria-hidden="true"
      >
        {/* Top-Left Teal Loop */}
        <g transform="translate(24 24) rotate(-45)">
          <path
            d="M -6.8 -10.2 L -6.8 -11.5 A 6.8 6.8 0 0 1 6.8 -11.5 L 6.8 3.4"
            stroke="#4598A6"
            strokeWidth="4.4"
            strokeLinecap="butt"
          />
        </g>

        {/* Top-Right Dark Teal Loop */}
        <g transform="translate(24 24) rotate(45)">
          <path
            d="M -6.8 -10.2 L -6.8 -11.5 A 6.8 6.8 0 0 1 6.8 -11.5 L 6.8 3.4"
            stroke="#1A434B"
            strokeWidth="4.4"
            strokeLinecap="butt"
          />
        </g>

        {/* Bottom-Right Teal Loop */}
        <g transform="translate(24 24) rotate(135)">
          <path
            d="M -6.8 -10.2 L -6.8 -11.5 A 6.8 6.8 0 0 1 6.8 -11.5 L 6.8 3.4"
            stroke="#4598A6"
            strokeWidth="4.4"
            strokeLinecap="butt"
          />
        </g>

        {/* Bottom-Left Dark Teal Loop */}
        <g transform="translate(24 24) rotate(225)">
          <path
            d="M -6.8 -10.2 L -6.8 -11.5 A 6.8 6.8 0 0 1 6.8 -11.5 L 6.8 3.4"
            stroke="#1A434B"
            strokeWidth="4.4"
            strokeLinecap="butt"
          />
        </g>
      </svg>

      {showText && (
        <span
          className={cn(
            "text-lg font-bold tracking-tight text-[#143B42]",
            textClassName
          )}
        >
          Doctor Tracker
        </span>
      )}
    </div>
  );
}

