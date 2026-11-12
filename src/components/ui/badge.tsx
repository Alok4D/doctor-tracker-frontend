import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors gap-1.5",
  {
    variants: {
      variant: {
        default: "bg-[#EBF6F6] text-[#3F97A5] border border-[#CBE6E8]",
        secondary: "bg-slate-100 text-slate-600 border border-slate-200",
        success: "bg-[#3F97A5] text-white border border-[#3F97A5]",
        warning: "bg-amber-50 text-amber-700 border border-amber-200/70",
        destructive: "bg-rose-50 text-rose-600 border border-rose-200/70",
        outline: "text-[#143B42] border border-[#D4E6E8] bg-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
